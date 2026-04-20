import { Link } from 'react-router-dom'

const HomeHero = () => (
  <section className="hero-banner">
    <div className="hero-content">
      <div className="triforce-crest-mini"></div>
      <h1>The Legend of Zelda</h1>
      <p className="hero-subtitle">Bienvenido a Hyrule</p>
      <Link to="/games" className="cta-button">
        Comenzar aventura
      </Link>
    </div>
  </section>
)

export default HomeHero
