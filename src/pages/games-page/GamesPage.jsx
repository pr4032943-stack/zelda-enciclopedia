import { useState, useEffect } from 'react'
import data from '../../assets/data.json'
import InfoModal from '../../components/info-modal/InfoModal'
import useTilt from '../../hooks/useTilt'
import './GamesPage.css'

const GameCard = ({ game, onClick }) => {
  const { cardRef, style, glare, handleMouseMove, handleMouseLeave } = useTilt()

  return (
    <div 
      className="game-card-perspective"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      onClick={() => onClick(game)}
    >
      <div className="fantasy-card game-card">
        <div className="game-year-bg">{game.year}</div>

        <div 
          className="card-glare" 
          style={{ 
            '--x': `${glare.x}%`, 
            '--y': `${glare.y}%`, 
            opacity: glare.opacity 
          }}
        />

        <div className="game-card-layout">
          <div className="game-image-col">
            <img src={game.image} alt={game.title} loading="lazy" />
          </div>

          <div className="game-info-col">
            <div className="game-year-tag">{game.year}</div>
            <h2>{game.title}</h2>
            <p className="game-description">{game.description}</p>

            <div className="game-meta">
              <span className="platform-name">{game.originalConsole}</span>
              <span className="score">{game.rating}/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const GamesPage = () => {
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)

  useEffect(() => {
    const sortedGames = [...data.games].sort((a, b) => a.year - b.year)
    setGames(sortedGames)
  }, [])

  return (
    <div className="games-page">
      <div className="container">

        <div className="page-header">
          <h1>La Cronología de Hyrule</h1>
          <p className="subtitle">
            Descubre la historia de The Legend of Zelda desde sus humildes comienzos en 1986.
          </p>
        </div>

        <div className="timeline-container">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onClick={setSelectedGame} />
          ))}
        </div>

      </div>

      <InfoModal 
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        data={selectedGame}
        type="game"
      />
    </div>
  )
}

export default GamesPage