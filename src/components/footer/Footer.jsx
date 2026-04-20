<<<<<<< HEAD
import { FaGithub, FaTwitter, FaYoutube, FaHeart } from 'react-icons/fa'
=======
import { FaGithub, FaHeart, FaTwitter, FaYoutube } from 'react-icons/fa'
>>>>>>> ca7a0c4 (Añado .env al gitignore)
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
<<<<<<< HEAD
            <p>A React project showcasing The Legend of Zelda universe.</p>
=======
            <p>Proyecto React inspirado en The Legend of Zelda con Firebase, RSS e importacion de datos.</p>
>>>>>>> ca7a0c4 (Añado .env al gitignore)
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
<<<<<<< HEAD
              <li><Link to="/">Home</Link></li>
              <li><Link to="/games">Games</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="https://github.com">GitHub</a></li>
=======
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/games">Games</Link>
              </li>
              <li>
                <Link to="/rss-info">RSS</Link>
              </li>
              <li>
                <Link to="/import-export">Import / Export</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
>>>>>>> ca7a0c4 (Añado .env al gitignore)
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul className="footer-links">
<<<<<<< HEAD
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/cookies">Cookies Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
=======
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies-policy">Cookies Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service">Terms of Service</Link>
              </li>
>>>>>>> ca7a0c4 (Añado .env al gitignore)
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
<<<<<<< HEAD
            © 2026 Zelda Encyclopedia Todos los derechos reservados | Política de Privacidad y Cookies | Condiciones de Venta
          </p>
          <div className="footer-project-links">
            <a href="https://github.com/pr403/definitivo" target="_blank" rel="noopener noreferrer">Repositorio de GitHub</a>
          </div>
          <p className="made-with">
            Forjado con <FaHeart className="heart-icon" /> y 💎 (rupias) por fans
=======
            © {currentYear} Zelda Encyclopedia Todos los derechos reservados | Politica de Privacidad y
            Cookies | Condiciones de Venta
          </p>
          <div className="footer-project-links">
            <a href="https://github.com/pr403/definitivo" target="_blank" rel="noopener noreferrer">
              Repositorio de GitHub
            </a>
            <a href="https://www.figma.com/community/file/1094391632314545564" target="_blank" rel="noopener noreferrer">
              Inspiracion en Figma
            </a>
          </div>
          <p className="made-with">
            Forjado con <FaHeart className="heart-icon" /> y rupias por fans
>>>>>>> ca7a0c4 (Añado .env al gitignore)
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
