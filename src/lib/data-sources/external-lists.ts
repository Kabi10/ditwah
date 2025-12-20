export interface ExternalResource {
    id: string
    source: 'DMC' | 'ICRC' | 'ReliefWeb' | 'GovSL'
    title: string
    url: string
    description: string
    publishedAt: string
}

export async function getExternalRecoveryResources(): Promise<ExternalResource[]> {
    // In a real environment, this would be a combination of RSS feeds, 
    // API calls, and potentially specialized scrapers for government PDFs.

    // Simulated aggregation from various sources
    return [
        {
            id: 'ext-1',
            source: 'DMC',
            title: 'National Post-Disaster Recovery Plan 2025',
            url: 'https://dmc.gov.lk',
            description: 'Official framework for housing and infrastructure rehabilitation following Cyclone Ditwah.',
            publishedAt: new Date().toISOString()
        },
        {
            id: 'ext-2',
            source: 'ReliefWeb',
            title: 'Sri Lanka: Cyclone Ditwah Situation Report #14',
            url: 'https://reliefweb.int',
            description: 'Detailed breakdown of affected populations and remaining resource gaps by district.',
            publishedAt: new Date().toISOString()
        },
        {
            id: 'ext-3',
            source: 'ICRC',
            title: 'Trace Your Family Members - Sri Lanka',
            url: 'https://familylinks.icrc.org',
            description: 'The International Committee of the Red Cross official tracing service for missing persons.',
            publishedAt: new Date().toISOString()
        }
    ]
}
