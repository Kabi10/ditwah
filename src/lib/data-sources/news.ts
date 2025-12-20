/**
 * Simple RSS fetcher and parser for news updates
 */

export interface NewsItem {
    title: string
    link: string
    pubDate: string
    source: string
    description?: string
}

/**
 * Fetches news from Google News RSS for a specific query
 */
export async function fetchDisasterNews(query = 'Sri Lanka Cyclone Ditwah'): Promise<NewsItem[]> {
    const encodedQuery = encodeURIComponent(query)
    const rssUrl = `https://news.google.com/rss/search?q=${encodedQuery}&hl=en-LK&gl=LK&ceid=LK:en`

    try {
        const response = await fetch(rssUrl)
        if (!response.ok) return []

        const text = await response.text()

        // Very basic XML parser using Regex (since we don't want to add big dependencies)
        // In a production app, use 'rss-parser'
        const items: NewsItem[] = []
        const itemRegex = /<item>([\s\S]*?)<\/item>/g
        let match

        while ((match = itemRegex.exec(text)) !== null) {
            const content = match[1]

            const title = content.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ''
            const link = content.match(/<link>([\s\S]*?)<\/link>/)?.[1] || ''
            const pubDate = content.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || ''
            const source = content.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] || 'News'

            items.push({
                title: title.replace(' - ' + source, '').trim(),
                link,
                pubDate,
                source
            })

            if (items.length >= 10) break
        }

        return items
    } catch (error) {
        console.error('Failed to fetch news RSS:', error)
        return []
    }
}
