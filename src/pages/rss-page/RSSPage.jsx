import './RSSPage.css'

const RSSPage = () => {
  const rssFeeds = [
    {
      title: 'Zelda Dungeon',
      url: 'https://www.zeldadungeon.net/',
      description: 'Noticias detalladas y guías de Zelda',
      feedUrl: 'https://www.zeldadungeon.net/feed/'
    },
    {
      title: 'Zelda Universe',
      url: 'https://zeldauniverse.net/',
      description: 'Comunidad de Zelda y proyectos fan',
      feedUrl: 'https://zeldauniverse.net/feed/'
    },
    {
      title: 'Nintendo News',
      url: 'https://nintendonews.com/',
      description: 'Noticias oficiales de Nintendo',
      feedUrl: 'https://nintendonews.com/feed/'
    }
  ]

  const xmlExample = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Zelda Encyclopedia News</title>
    <link>https://zelda-encyclopedia.com</link>
    <description>Stay updated with the latest Zelda news</description>
    <lastBuildDate>Mon, 20 Apr 2026 12:00:00 GMT</lastBuildDate>
    
    <item>
      <title>New Zelda Game Announced</title>
      <link>https://zelda-encyclopedia.com/news/new-game</link>
      <description>A new adventure awaits...</description>
      <pubDate>Mon, 20 Apr 2026 10:30:00 GMT</pubDate>
    </item>
    
    <item>
      <title>Tears of the Kingdom Updates</title>
      <link>https://zelda-encyclopedia.com/news/totk-updates</link>
      <description>Latest patches and features</description>
      <pubDate>Sun, 19 Apr 2026 15:20:00 GMT</pubDate>
    </item>
  </channel>
</rss>`

  return (
    <div className="rss-page">
      <div className="container">
        <h1>Información RSS</h1>
        <p className="subtitle">Mantente actualizado con las últimas noticias de Zelda mediante feeds RSS</p>

        <section className="rss-intro">
          <h2>¿Qué es RSS?</h2>
          <p>
            RSS (Really Simple Syndication) te permite estar al tanto de tus sitios web favoritos sin tener que visitarlos 
            constantemente. Con un lector RSS puedes suscribirte a los feeds y recibir las actualizaciones automáticamente.
          </p>
        </section>

        <div className="feeds-grid">
          {rssFeeds.map((feed, index) => (
            <div key={index} className="feed-card">
              <h3>{feed.title}</h3>
              <p className="feed-description">{feed.description}</p>
              <div className="feed-links">
                <a href={feed.url} className="rss-link" target="_blank" rel="noopener noreferrer">
                  Sitio web 🌐
                </a>
                <a href={feed.feedUrl} className="rss-link feed-icon" target="_blank" rel="noopener noreferrer">
                  RSS Feed 📡
                </a>
              </div>
            </div>
          ))}
        </div>

        <section className="xml-example">
          <h2>Estructura XML de un Feed RSS</h2>
          <p>Los feeds RSS utilizan el formato XML para distribuir el contenido. Este es un ejemplo básico:</p>
          <pre className="xml-code">
            <code>{xmlExample}</code>
          </pre>
        </section>

        <section className="how-to-use">
          <h2>¿Cómo usar RSS?</h2>
          <ol>
            <li>Descarga un lector RSS recomendado (Feedly, The Old Reader, Inoreader, etc.)</li>
            <li>Copia las URLs de los feeds RSS anteriores</li>
            <li>Pégalas en tu lector para comenzar a recibir actualizaciones automáticamente</li>
            <li>Personaliza tus preferencias de notificación según tus necesidades</li>
          </ol>
        </section>

        <section className="readers-recommendation">
          <h2>Lectores RSS Recomendados</h2>
          <ul>
            <li><a href="https://feedly.com" target="_blank" rel="noopener noreferrer">Feedly</a> - Gratuito y potente</li>
            <li><a href="https://theoldreader.com" target="_blank" rel="noopener noreferrer">The Old Reader</a> - Similar a Google Reader</li>
            <li><a href="https://www.inoreader.com" target="_blank" rel="noopener noreferrer">Inoreader</a> - Inteligencia artificial integrada</li>
            <li><a href="https://miniflux.app" target="_blank" rel="noopener noreferrer">Miniflux</a> - Minimalista y self-hosted</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default RSSPage;