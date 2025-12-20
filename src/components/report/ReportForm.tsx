'use client'

import { useState, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Upload, User, MapPin, Phone, CheckCircle, AlertCircle, Camera, X, Image as ImageIcon } from 'lucide-react'
import { DISTRICTS } from '@/lib/supabase/types'
import { reportMissingPerson } from '@/lib/actions/missing-persons'

export function ReportForm() {
  const t = useTranslations('report')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const processImageFile = useCallback((file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return
    }

    // Compress image for low-bandwidth uploads (max 1MB)
    const maxSize = 1024 * 1024 // 1MB
    if (file.size > maxSize) {
      // For now, just use the file as-is - could add compression library later
      console.log('Large image, consider compression')
    }

    // Revoke previous URL to prevent memory leaks
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview)
    }

    const objectUrl = URL.createObjectURL(file)
    setPhotoPreview(objectUrl)
    setPhotoFile(file)
  }, [photoPreview])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImageFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processImageFile(file)
    }
  }

  const removePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview)
    }
    setPhotoPreview(null)
    setPhotoFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)

    // Add the photo file if exists
    if (photoFile) {
      formData.set('photo', photoFile)
    }

    try {
      const response = await reportMissingPerson(formData)
      setResult(response)
      if (response.success) {
        (e.target as HTMLFormElement).reset()
        removePhoto()
      }
    } catch {
      setResult({ success: false, message: t('error') })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Result Message */}
      {result && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
          {result.success ? (
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          )}
          <p>{result.message}</p>
        </div>
      )}

      {/* PHOTO FIRST - Based on research: "Visual identification is faster than text descriptions" */}
      <section className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Camera className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">{t('photoFirst')}</h2>
          <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">{t('recommended')}</span>
        </div>
        <p className="text-sm text-blue-800 mb-4">{t('photoFirstHint')}</p>

        {!photoPreview ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition ${isDragging
              ? 'border-blue-500 bg-blue-100'
              : 'border-blue-300 hover:border-blue-400 hover:bg-blue-100/50'
              }`}
          >
            <ImageIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <p className="text-blue-800 font-medium mb-2">{t('dragDropPhoto')}</p>
            <p className="text-sm text-blue-600 mb-4">{t('orChooseOption')}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {/* Camera capture - mobile-friendly */}
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium min-h-[48px]"
              >
                <Camera className="w-5 h-5" />
                {t('takePhoto')}
              </button>

              {/* File upload */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-3 bg-white text-blue-600 border-2 border-blue-300 rounded-lg hover:bg-blue-50 transition font-medium min-h-[48px]"
              >
                <Upload className="w-5 h-5" />
                {t('uploadPhoto')}
              </button>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <input
              ref={fileInputRef}
              type="file"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden bg-gray-100 border-2 border-blue-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoPreview}
                alt="Photo preview"
                className="w-full h-64 object-contain bg-gray-900"
              />
            </div>
            <button
              type="button"
              onClick={removePhoto}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg"
              aria-label={t('removePhoto')}
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-center text-sm text-green-600 mt-2 flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" />
              {t('photoAdded')}
            </p>
          </div>
        )}
      </section>

      {/* Person Details Section - Simplified */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">{t('personDetails')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name - Required */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('fullName')} <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="full_name"
              required
              placeholder={t('fullNamePlaceholder')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
            />
          </div>

          {/* Age and Gender - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('age')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <input
              type="number"
              name="age"
              min="0"
              max="120"
              placeholder="e.g., 45"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('gender')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <select
              name="gender"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">{t('selectGender')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
              <option value="other">{t('other')}</option>
            </select>
          </div>

          {/* NIC Number - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('nicNumber')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <input
              type="text"
              name="nic_number"
              placeholder={t('nicNumberPlaceholder')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Clothing Description - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('clothingDescription')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <input
              type="text"
              name="clothing_description"
              placeholder={t('clothingDescriptionHint')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Distinctive Marks - Optional */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('distinctiveMarks')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <input
              type="text"
              name="distinctive_marks"
              placeholder={t('distinctiveMarksHint')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Physical Description - Optional, collapsed by default */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('physicalDescription')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <textarea
              name="physical_description"
              rows={2}
              placeholder={t('physicalDescriptionHint')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </section>

      {/* Location Section - Simplified */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">{t('lastKnownLocation')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Home Address - Optional */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('homeAddress')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <input
              type="text"
              name="home_address"
              placeholder={t('homeAddressPlaceholder')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* District - Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('district')} <span className="text-red-600">*</span>
            </label>
            <select
              name="district"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-base"
            >
              <option value="">{t('selectDistrict')}</option>
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Date Last Seen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('lastSeenDate')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <input
              type="date"
              name="last_seen_date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Location Details - Optional */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('location')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <input
              type="text"
              name="last_seen_location"
              placeholder={t('locationPlaceholder')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </section>

      {/* Contact Section - Streamlined */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">{t('contactInfo')}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">{t('contactInfoHint')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reporter Name - Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('yourName')} <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="reporter_name"
              required
              placeholder={t('yourNamePlaceholder')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Reporter Phone - Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('yourPhone')} <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="reporter_phone"
              required
              placeholder="+94 7X XXX XXXX"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('yourEmail')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <input
              type="email"
              name="reporter_email"
              placeholder="email@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Relationship - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('relationship')} <span className="text-gray-400 text-xs">({t('optional')})</span>
            </label>
            <input
              type="text"
              name="reporter_relationship"
              placeholder={t('relationshipPlaceholder')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </section>

      {/* Summary of required fields */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">{t('requiredFieldsNote')}:</span> {t('requiredFieldsList')}
        </p>
      </div>

      {/* Submit Button - 48px min height for good touch target */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 min-h-[56px] bg-red-600 text-white text-lg font-bold rounded-xl hover:bg-red-700 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition touch-manipulation shadow-lg"
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>
    </form>
  )
}

