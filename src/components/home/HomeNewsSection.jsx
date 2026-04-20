import { Link } from 'react-router-dom'

const HomeNewsSection = ({ news }) => (
  <section className="featured-news">
    <div className="section-title">
      <h2>Ultimas noticias de Hyrule</h2>
      <div className="title-underline"></div>
    </div>

    <div className="news-grid">
      {news.map((item) => (
        <article key={item.id} className="news-card">
          <div className="news-date">{item.date}</div>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <Link to="/rss-info" className="news-link">
            Ver lector RSS
          </Link>
        </article>
      ))}
    </div>

    <aside className="rss-highlight">
      <div>
        <p className="rss-highlight-kicker">RSS integrado</p>
        <h3>Consulta feeds y documenta la entrega desde la propia app</h3>
        <p>
          La aplicacion incluye una vista dedicada para seguir noticias de Zelda con fuentes RSS y
          una captura incluida en el README.
        </p>
      </div>

      <Link to="/rss-info" className="cta-button rss-highlight-link">
        Abrir lector RSS
      </Link>
    </aside>
  </section>
)

export default HomeNewsSection
