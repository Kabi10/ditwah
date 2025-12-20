/**
 * ReliefWeb API integration for humanitarian disaster updates
 * ReliefWeb is a service of the UN OCHA
 */

const RELIEFWEB_API = 'https://api.reliefweb.int/v1'

export interface ReliefWebReport {
    id: string
    title: string
    url: string
    source: string
    published: string
    content?: string
}

/**
 * Fetches latest disaster reports and situation updates for Sri Lanka
 */
export async function getLatestReliefReports(limit = 10): Promise<ReliefWebReport[]> {
    const params = new URLSearchParams({
        'appname': 'ditwah-relief',
        'filter[field]': 'country.name',
        'filter[value]': 'Sri Lanka',
        'sort[]': 'date:desc',
        'limit': limit.toString(),
        'profile': 'full'
    })

    try {
        const response = await fetch(`${RELIEFWEB_API}/reports?${params.toString()}`)

        if (!response.ok) {
            console.error('ReliefWeb API error:', response.statusText)
            return []
        }

        const data = await response.json()

        return data.data.map((item: any) => ({
            id: item.id,
            title: item.fields.title,
            url: item.fields.url,
            source: item.fields.source?.[0]?.name || 'Unknown Source',
            published: item.fields.date.created,
            content: item.fields.body || ''
        }))
    } catch (error) {
        console.error('Failed to fetch from ReliefWeb:', error)
        return []
    }
}

/**
 * Fetches specific alerts or warnings for landslides/floods if tagged
 */
export async function getSevereAlerts(): Promise<ReliefWebReport[]> {
    const params = new URLSearchParams({
        'appname': 'ditwah-relief',
        'filter[operator]': 'AND',
        'filter[conditions][0][field]': 'country.name',
        'filter[conditions][0][value]': 'Sri Lanka',
        'filter[conditions][1][field]': 'disaster.type.name',
        'filter[conditions][1][value]': 'Flood', // Or 'Cyclone', etc.
        'sort[]': 'date:desc',
        'limit': '5'
    })

    try {
        const response = await fetch(`${RELIEFWEB_API}/reports?${params.toString()}`)
        if (!response.ok) return []
        const data = await response.json()

        return data.data.map((item: any) => ({
            id: item.id,
            title: item.fields.title,
            url: item.fields.url,
            source: item.fields.source?.[0]?.name || 'ReliefWeb',
            published: item.fields.date.created
        }))
    } catch (error) {
        return []
    }
}
