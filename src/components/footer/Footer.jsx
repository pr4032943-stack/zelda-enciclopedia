import { FaGithub, FaTwitter, FaYoutube, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Zelda Project</h3>
            <p>A React project showcasing The Legend of Zelda universe.</p>
            <div className="social-links">
              <a href="https://github.com" className="social-link" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://youtube.com" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/games">Games</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="https://github.com">GitHub</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/cookies">Cookies Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 Zelda Encyclopedia Todos los derechos reservados | Política de Privacidad y Cookies | Condiciones de Venta
          </p>
          <div className="footer-project-links">
            <a href="https://github.com/pr403/definitivo" target="_blank" rel="noopener noreferrer">Repositorio de GitHub</a>
          </div>
          <p className="made-with">
            Forjado con <FaHeart className="heart-icon" /> y 💎 (rupias) por fans
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
