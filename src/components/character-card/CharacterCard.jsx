import './CharacterCard.css'

const CharacterCard = ({ character }) => {
  const { name, image, description, game, race } = character

  return (
    <div className="character-card">
      <div className="character-image">
        <img 
          src={image || "/images/default.png"} 
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="character-info">
        <h3 className="character-name">{name}</h3>
        <p className="character-race">{race}</p>
        <p className="character-game">Game: {game}</p>
        <p className="character-description">{description}</p>
      </div>
    </div>
  )
}

export default CharacterCard
