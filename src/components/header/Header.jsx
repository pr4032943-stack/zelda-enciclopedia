import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="logo-link" onClick={closeMenu}>
              <div className="triforce-icon">
                <div className="triforce-triangle triforce-top"></div>
                <div className="triforce-bottom">
                  <div className="triforce-triangle"></div>
                  <div className="triforce-triangle"></div>
                </div>
              </div>
              <span className="logo-text">Zelda Encyclopedia</span>
            </Link>
          </div>

          <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
            <span className="hamburger"></span>
          </button>

          <nav className={`navigation ${isMenuOpen ? 'mobile-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/games" className={`nav-link ${isActive('/games')}`} onClick={closeMenu}>
                  Juegos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/characters" className={`nav-link ${isActive('/characters')}`} onClick={closeMenu}>
                  Personajes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/items" className={`nav-link ${isActive('/items')}`} onClick={closeMenu}>
                  Objetos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/community" className={`nav-link ${isActive('/community')}`} onClick={closeMenu}>
                  Foro
                </Link>
              </li>


              <li className="nav-item">
                <Link to="/rss-info" className={`nav-link ${isActive('/rss-info')}`} onClick={closeMenu}>
                  RSS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/import-export" className={`nav-link ${isActive('/import-export')}`} onClick={closeMenu}>
                  Import / Export
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeMenu}>
                  Contacto
                </Link>
              </li>
)
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
