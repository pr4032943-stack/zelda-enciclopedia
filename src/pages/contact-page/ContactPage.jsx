import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './ContactPage.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

const granCanariaPosition = [28.1235, -15.4363]
const githubUrl = 'https://github.com/pr4032943-stack/zelda-enciclopedia'
const contactEmail = 'contacto@hyrule-archive.es'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Mensaje enviado. Gracias por contactar con Zelda Encyclopedia.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contacto</h1>
        <p className="subtitle">Escríbenos o localiza el proyecto en Gran Canaria.</p>

        <div className="contact-content">
          <div className="contact-form-section">
            <h2>Envía un mensaje</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="tu@correo.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-textarea"
                  placeholder="Tu mensaje aquí..."
                />
              </div>

              <button type="submit" className="submit-button">
                Enviar mensaje
              </button>
            </form>
          </div>

          <div className="contact-info-section">
            <h2>Ubicación en Gran Canaria</h2>

            <div className="map-wrapper">
              <MapContainer
                center={granCanariaPosition}
                zoom={10}
                scrollWheelZoom={false}
                style={{ height: '300px', width: '100%', borderRadius: '10px' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={granCanariaPosition}>
                  <Popup>
                    Zelda Encyclopedia Headquarters <br /> Gran Canaria, España 🗺️
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className="contact-details">
              <h3>Información de contacto</h3>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>
              <p>
                <strong>GitHub:</strong>{' '}
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  Ver repositorio
                </a>
              </p>
              <p className="note">
                Este es un proyecto fan educativo dedicado a la saga The Legend of Zelda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
