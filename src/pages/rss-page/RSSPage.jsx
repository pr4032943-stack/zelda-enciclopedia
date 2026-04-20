<<<<<<< HEAD
import './RSSPage.css'

const RSSPage = () => {
    const rssFeeds = [
        { title: 'Zelda Dungeon', url: 'https://www.zeldadungeon.net/', description: 'Detailed Zelda news and guides' },
        { title: 'Zelda Universe', url: 'https://zeldauniverse.net/', description: 'Zelda community and fan projects' },
        { title: 'Nintendo News', url: 'https://nintendonews.com/', description: 'Official news from Nintendo' }
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
=======
import data from '../../assets/data.json'
import './RSSPage.css'

const RSSPage = () => {
  const feedUrl = '/feeds/zelda-news.xml'

  return (
    <div className="rss-page">
      <div className="container">
        <header className="rss-hero">
          <p className="rss-kicker">RSS 2.0</p>
          <h1>Feed RSS de Zelda Encyclopedia</h1>
          <p className="subtitle">
            Esta pagina incluye un RSS real en formato XML para que puedas abrirlo en un lector de
            feeds o directamente en el navegador.
          </p>

          <div className="rss-actions">
            <a href={feedUrl} className="rss-link" target="_blank" rel="noreferrer">
              Abrir archivo RSS XML
            </a>
            <a
              href="https://www.feedly.com/i/welcome"
              className="rss-link secondary-rss-link"
              target="_blank"
              rel="noreferrer"
            >
              Probarlo en un lector RSS
            </a>
          </div>
        </header>

        <section className="rss-intro">
          <h2>Que contiene el feed</h2>
          <p>
            El fichero publica las noticias destacadas del proyecto. Cada item del RSS tiene titulo,
            descripcion, fecha y enlace asociado a esta aplicacion.
          </p>
          <code className="rss-code">{feedUrl}</code>
        </section>

        <section className="feeds-grid">
          {data.news.map((item) => (
            <article key={item.id} id={`news-${item.id}`} className="feed-card">
              <p className="feed-date">{item.date}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <a href={feedUrl} className="rss-link" target="_blank" rel="noreferrer">
                Ver item en el RSS
              </a>
            </article>
          ))}
        </section>

        <section className="how-to-use">
          <h2>Como usarlo</h2>
          <p>
            1. Copia la URL del feed XML.
            <br />
            2. Pegala en un lector como Feedly.
            <br />
            3. Recibiras las novedades del proyecto en formato RSS real.
          </p>
        </section>
      </div>
    </div>
  )
>>>>>>> ca7a0c4 (Añado .env al gitignore)
}

export default RSSPage
