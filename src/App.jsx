import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomePage from './pages/home-page/HomePage'
import GamesPage from './pages/games-page/GamesPage'
import CharactersPage from './pages/characters-page/CharactersPage'
import ItemsPage from './pages/items-page/ItemsPage'
import ContactPage from './pages/contact-page/ContactPage'
import CommunityForum from './pages/community-forum/CommunityForum'
import RSSPage from './pages/rss-page/RSSPage'
import MagicalBackground from './components/magical-background/MagicalBackground'
import CustomCursor from './components/custom-cursor/CustomCursor'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <CustomCursor />
        <MagicalBackground />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/community" element={<CommunityForum />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/characters" element={<CharactersPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/rss-info" element={<RSSPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
