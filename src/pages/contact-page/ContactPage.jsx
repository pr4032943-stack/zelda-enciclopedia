<<<<<<< HEAD
import { useState, useEffect } from 'react'
=======
import { useState } from 'react'
>>>>>>> ca7a0c4 (Añado .env al gitignore)
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './ContactPage.css'

// Fix for default marker icons in React Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

<<<<<<< HEAD
=======
const granCanariaPosition = [28.1235, -15.4363]
const githubUrl = 'https://github.com/pr4032943-stack/zelda-enciclopedia'
const contactEmail = 'contacto@hyrule-archive.es'

>>>>>>> ca7a0c4 (Añado .env al gitignore)
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

<<<<<<< HEAD
  // Hyrule Castle approximate coordinates for thematic map
  const position = [37.7749, -122.4194] // Default to somewhere, but let's pretend it's Hyrule

=======
>>>>>>> ca7a0c4 (Añado .env al gitignore)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
<<<<<<< HEAD
    alert('Thank you for your message!')
=======
    alert('Mensaje enviado. Gracias por contactar con Zelda Encyclopedia.')
>>>>>>> ca7a0c4 (Añado .env al gitignore)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="contact-page">
      <div className="container">
<<<<<<< HEAD
        <h1>Contact Us</h1>
        <p className="subtitle">Get in touch with our team</p>

        <div className="contact-content">
          <div className="contact-form-section">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
=======
        <h1>Contacto</h1>
        <p className="subtitle">Escribenos o localiza el proyecto en Gran Canaria.</p>

        <div className="contact-content">
          <div className="contact-form-section">
            <h2>Envia un mensaje</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
>>>>>>> ca7a0c4 (Añado .env al gitignore)
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
<<<<<<< HEAD
                <label htmlFor="email">Email</label>
=======
                <label htmlFor="email">Correo</label>
>>>>>>> ca7a0c4 (Añado .env al gitignore)
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
<<<<<<< HEAD
                <label htmlFor="message">Message</label>
=======
                <label htmlFor="message">Mensaje</label>
>>>>>>> ca7a0c4 (Añado .env al gitignore)
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="submit-button">
<<<<<<< HEAD
                Send Message
=======
                Enviar mensaje
>>>>>>> ca7a0c4 (Añado .env al gitignore)
              </button>
            </form>
          </div>

          <div className="contact-info-section">
<<<<<<< HEAD
            <h2>Our Location</h2>
            
            <div className="map-wrapper">
              <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '300px', width: '100%', borderRadius: '10px' }}>
=======
            <h2>Ubicacion del proyecto</h2>
            
            <div className="map-wrapper">
              <MapContainer
                center={granCanariaPosition}
                zoom={10}
                scrollWheelZoom={false}
                style={{ height: '300px', width: '100%', borderRadius: '10px' }}
              >
>>>>>>> ca7a0c4 (Añado .env al gitignore)
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
<<<<<<< HEAD
                <Marker position={position}>
                  <Popup>
                    Hyrule Castle HQ <br /> Rebuilding the Future.
=======
                <Marker position={granCanariaPosition}>
                  <Popup>
                    Gran Canaria <br /> Base creativa del proyecto Zelda Encyclopedia.
>>>>>>> ca7a0c4 (Añado .env al gitignore)
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className="contact-details">
<<<<<<< HEAD
              <h3>Contact Information</h3>
              <p>Email: contact@zeldaproject.com</p>
              <p>GitHub: github.com/zeldaproject</p>
              <p>This is a fan project for educational purposes.</p>
=======
              <h3>Informacion de contacto</h3>
              <p>Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
              <p>
                GitHub:{' '}
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  {githubUrl}
                </a>
              </p>
              <p>Ubicacion de referencia: Las Palmas de Gran Canaria, Canarias, Espana.</p>
              <p>Proyecto fan con fines educativos y de desarrollo frontend.</p>
>>>>>>> ca7a0c4 (Añado .env al gitignore)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
