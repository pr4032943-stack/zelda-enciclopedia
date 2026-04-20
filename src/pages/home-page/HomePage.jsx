import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../../assets/data.json'
import ImportExport from '../../components/import-export/ImportExport'

import './HomePage.css'

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="home-page">
      {/* Global Cinematic Parallax */}
      <div className="global-parallax-system">
        <div 
          className="p-layer p-layer-1"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        ></div>
        <div 
          className="p-layer p-layer-2"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        ></div>
        <div 
          className="p-layer p-layer-3"
          style={{ transform: `translateY(${scrollY * 0.55}px)` }}
        ></div>
        <div className="p-overlay-gradient"></div>
      </div>

      <div className="container relative-content">
        <section className="hero-banner">
          <div className="hero-content">
            <div className="triforce-crest-mini"></div>
            <h1>The Legend of Zelda</h1>
            <p className="hero-subtitle">Bienvenido a Hyrule</p>
            <Link to="/games" className="cta-button">Comenzar Aventura</Link>
          </div>
        </section>

        <section className="realm-sections">
          <Link to="/characters" className="realm-card characters-realm">
            <div className="realm-overlay"></div>
            <h3>Personajes</h3>
            <p>Conoce a los héroes, sabios y villanos.</p>
          </Link>

          <Link to="/items" className="realm-card items-realm">
            <div className="realm-overlay"></div>
            <h3>Objetos Sagrados</h3>
            <p>Reliquias y herramientas de poder.</p>
          </Link>

          <Link to="/games" className="realm-card games-realm">
            <div className="realm-overlay"></div>
            <h3>La Cronología</h3>
            <p>Explora todos los juegos de la saga.</p>
          </Link>

          <Link to="/community" className="realm-card forum-realm">
            <div className="realm-overlay"></div>
            <h3>Consejo de Sabios</h3>
            <p>Únete al debate y comparte teorías.</p>
          </Link>
        </section>

        <ImportExport />
        <section className="featured-news">
          <div className="section-title">
            <h2>Últimas Noticias de Hyrule</h2>
            <div className="title-underline"></div>
          </div>
          <div className="news-grid">
            {/* Displaying first 3 news items from JSON to fulfill requirement */}
            {data.news?.slice(0, 3).map((item) => (
              <div key={item.id} className="news-card">
                <div className="news-date">{item.date}</div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <Link to="/rss-info" className="news-link">Leer más →</Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
