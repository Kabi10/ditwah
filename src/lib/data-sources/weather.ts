/**
 * Weather data source using Open-Meteo API (Free, no API key required)
 */

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1'
const OPEN_METEO_FLOOD_BASE = 'https://flood-api.open-meteo.com/v1'

export interface WeatherData {
    current: {
        temperature_2m: number
        precipitation: number
        weather_code: number
        wind_speed_10m: number
    }
    daily: {
        time: string[]
        weather_code: number[]
        precipitation_sum: number[]
    }
}

/**
 * Fetches current weather and 7-day forecast for a given location
 */
export async function getWeatherForecast(lat: number, lng: number): Promise<WeatherData> {
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lng.toString(),
        current: 'temperature_2m,precipitation,weather_code,wind_speed_10m',
        daily: 'weather_code,precipitation_sum',
        timezone: 'Asia/Colombo',
        forecast_days: '7',
    })

    const response = await fetch(`${OPEN_METEO_BASE}/forecast?${params.toString()}`)

    if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`)
    }

    return response.json()
}

/**
 * Fetches flood risk data - specifically river discharge for disaster tracking
 */
export async function getFloodRisk(lat: number, lng: number) {
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lng.toString(),
        daily: 'river_discharge',
        timezone: 'Asia/Colombo',
        forecast_days: '7',
    })

    const response = await fetch(`${OPEN_METEO_FLOOD_BASE}/flood?${params.toString()}`)

    if (!response.ok) {
        // Some locations might not have flood data
        return null
    }

    return response.json()
}

/**
 * Maps Open-Meteo WMO Weather codes to human readable descriptions and icons
 * https://open-meteo.com/en/docs
 */
export function getWeatherDescription(code: number): { label: string; icon: string; severity: 'low' | 'medium' | 'high' } {
    switch (code) {
        case 0: return { label: 'Clear sky', icon: 'Sun', severity: 'low' }
        case 1: case 2: case 3: return { label: 'Partly cloudy', icon: 'CloudSun', severity: 'low' }
        case 45: case 48: return { label: 'Fog', icon: 'CloudFog', severity: 'low' }
        case 51: case 53: case 55: return { label: 'Drizzle', icon: 'CloudDrizzle', severity: 'low' }
        case 61: case 63: case 65: return { label: 'Rain', icon: 'CloudRain', severity: 'medium' }
        case 71: case 73: case 75: return { label: 'Snow', icon: 'Snowflake', severity: 'medium' }
        case 80: case 81: case 82: return { label: 'Rain showers', icon: 'CloudRainWind', severity: 'medium' }
        case 95: case 96: case 99: return { label: 'Thunderstorm', icon: 'CloudLightning', severity: 'high' }
        default: return { label: 'Unknown', icon: 'Cloud', severity: 'low' }
    }
}
