<<<<<<< HEAD
import { useState, useEffect } from 'react'
=======
import { useState } from 'react'
>>>>>>> ca7a0c4 (Añado .env al gitignore)
import data from '../../assets/data.json'
import InfoModal from '../../components/info-modal/InfoModal'
import useTilt from '../../hooks/useTilt'
import './CharactersPage.css'

const CharacterCard = ({ character, onClick }) => {
  const { cardRef, style, glare, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <div
      className="item-card-perspective"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, cursor: 'pointer' }}
      onClick={() => onClick(character)}
    >
      <div className="fantasy-card item-card">
        <div
          className="card-glare"
          style={{
            '--x': `${glare.x}%`,
            '--y': `${glare.y}%`,
            opacity: glare.opacity
          }}
        ></div>
        <div className="item-image">
          <img src={character.image} alt={character.name} loading="lazy" />
          <div className="museum-overlay"></div>
        </div>
        <div className="card-content">
          <h2>{character.name}</h2>
          <div className="tags">
            <span className="tag race-tag">{character.race}</span>
            <span className="tag role-tag">{character.role}</span>
          </div>
          <p className="description">{character.description}</p>
          <p className="game-reference">Haz clic para saber más...</p>
        </div>
      </div>
    </div>
  )
}

const CharactersPage = () => {
<<<<<<< HEAD
  const [characters, setCharacters] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChar, setSelectedChar] = useState(null)

  useEffect(() => {
    setCharacters(data.characters)
  }, [])

=======
  const [characters] = useState(data.characters)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChar, setSelectedChar] = useState(null)

>>>>>>> ca7a0c4 (Añado .env al gitignore)
  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    char.race.toLowerCase().includes(searchTerm.toLowerCase()) ||
    char.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="characters-page">
      <div className="container">
        <div className="page-header">
          <h1>Personajes de Hyrule</h1>
          <p className="subtitle">Una enciclopedia de los héroes, villanos y aliados a lo largo del tiempo.</p>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nombre, raza o rol..."
            className="magic-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="characters-grid">
          {filteredCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} onClick={setSelectedChar} />
          ))}
          {filteredCharacters.length === 0 && (
            <p className="no-results">Ningún erudito Sheikah ha documentado a este personaje.</p>
          )}
        </div>
      </div>

      <InfoModal 
        isOpen={!!selectedChar} 
        onClose={() => setSelectedChar(null)} 
        data={selectedChar} 
        type="character" 
      />
    </div>
  )
}

export default CharactersPage
