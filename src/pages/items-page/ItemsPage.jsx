import { useState, useEffect } from 'react'
import data from '../../assets/data.json'
import InfoModal from '../../components/InfoModal/InfoModal'
import useTilt from '../../hooks/useTilt'
import './ItemsPage.css'

const ItemCard = ({ item, onClick }) => {
  const { cardRef, style, glare, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <div 
      className="item-card-perspective"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, cursor: 'pointer' }}
      onClick={() => onClick(item)}
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
          <img src={item.image} alt={item.name} loading="lazy" />
        </div>
        <div className="card-content">
          <h2>{item.name}</h2>
          <div className="item-function">
            <span className="gold-text">Reliquia Sagrada</span>
          </div>
          <p className="description">Toca para descubrir su leyenda...</p>
        </div>
      </div>
    </div>
  )
}

const ItemsPage = () => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    setItems(data.items)
  }, [])

  return (
    <div className="items-page">
      <div className="container">
        <div className="page-header">
          <h1>Objetos Sagrados</h1>
          <p className="subtitle">Reliquias, armas y herramientas icónicas vitales para la aventura.</p>
        </div>

        <div className="items-grid">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} onClick={setSelectedItem} />
          ))}
        </div>
      </div>

      <InfoModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        data={selectedItem} 
        type="item" 
      />
    </div>
  )
}

export default ItemsPage
