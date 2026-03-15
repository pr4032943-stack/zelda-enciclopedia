import './RSSPage.css'

const RSSPage = () => {
    const rssFeeds = [
        { title: 'Nintendo News', url: 'https://www.nintendo.com/feed', description: 'Official news from Nintendo' },
        { title: 'Zelda Dungeon', url: 'https://www.zeldadungeon.net/feed', description: 'Detailed Zelda news and guides' },
        { title: 'Zelda Universe', url: 'https://zeldauniverse.net/feed', description: 'Zelda community and fan projects' }
    ]

    return (
        <div className="rss-page">
            <div className="container">
                <h1>RSS Information</h1>
                <p className="subtitle">Stay updated with the latest Zelda news via RSS feeds</p>

                <section className="rss-intro">
                    <h2>What is RSS?</h2>
                    <p>
                        RSS (Really Simple Syndication) allows you to stay up to date with your favorite websites
                        without having to check each one individually. Use an RSS reader to subscribe to the feeds below.
                    </p>
                </section>

                <div className="feeds-grid">
                    {rssFeeds.map((feed, index) => (
                        <div key={index} className="feed-card">
                            <h3>{feed.title}</h3>
                            <p>{feed.description}</p>
                            <a href={feed.url} className="rss-link" target="_blank" rel="noopener noreferrer">
                                View RSS Feed 🔗
                            </a>
                        </div>
                    ))}
                </div>

                <section className="how-to-use">
                    <h2>How to use?</h2>
                    <p>
                        1. Download an RSS Reader (like Feedly or The Old Reader).<br />
                        2. Copy the URLs above.<br />
                        3. Paste them into your reader to start receiving updates!
                    </p>
                </section>
            </div>
        </div>
    )
}

export default RSSPage
