import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="logo-link">
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

          <nav className="navigation">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${isActive('/')}`}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/games" className={`nav-link ${isActive('/games')}`}>
                  Juegos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/characters" className={`nav-link ${isActive('/characters')}`}>
                  Personajes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/items" className={`nav-link ${isActive('/items')}`}>
                  Objetos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/community" className={`nav-link ${isActive('/community')}`}>
                  Foro
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
