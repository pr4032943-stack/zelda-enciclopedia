import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomePage from './pages/home-page/HomePage'
import GamesPage from './pages/games-page/GamesPage'
import CharactersPage from './pages/characters-page/CharactersPage'
import ItemsPage from './pages/items-page/ItemsPage'
import ContactPage from './pages/contact-page/ContactPage'
import CommunityForum from './pages/community-forum/CommunityForum'
import ImportExportPage from './pages/import-export-page/ImportExportPage'
import LegalPage from './pages/legal-page/LegalPage'
import RSSPage from './pages/rss-page/RSSPage'
import MagicalBackground from './components/magical-background/MagicalBackground'
import CustomCursor from './components/custom-cursor/CustomCursor'
import './App.css'



const privacySections = [
  {
    heading: 'Datos basicos',
    body: 'Esta aplicacion solo utiliza los datos que el usuario introduce en formularios o importa manualmente. La informacion guardada en Firebase se usa exclusivamente para mostrar contenido dentro del proyecto.',
  },
  {
    heading: 'Uso de Firebase',
    body: 'Firebase se utiliza para almacenar discusiones del foro y registros importados o creados desde la pagina de importacion y exportacion. No se venden datos a terceros ni se usan para publicidad.',
  },
  {
    heading: 'Derechos del usuario',
    body: 'El usuario puede modificar o eliminar el contenido que haya creado desde la propia interfaz si el modulo correspondiente lo permite. Esta politica se aplica a este proyecto academico y demostrativo.',
  },
]

const cookiesSections = [
  {
    heading: 'Que son las cookies',
    body: 'Las cookies son pequenos archivos que algunos servicios pueden usar para recordar preferencias o mantener sesiones. Este proyecto no depende de un sistema de analitica propio ni de publicidad basada en cookies.',
  },
  {
    heading: 'Servicios externos',
    body: 'Algunos recursos de terceros, como mapas o iconos enlazados externamente, pueden aplicar sus propias politicas tecnicas. Por eso conviene revisar tambien las condiciones de esos servicios cuando los abras.',
  },
  {
    heading: 'Gestion',
    body: 'Puedes limitar el uso de cookies desde la configuracion de tu navegador. Si bloqueas ciertos recursos externos, algunas funciones visuales o integraciones pueden mostrarse de forma reducida.',
  },
]

const termsSections = [
  {
    heading: 'Uso permitido',
    body: 'Zelda Encyclopedia es un proyecto educativo y de practica. El contenido se ofrece con fines academicos y de demostracion tecnica sobre React, Firebase, RSS e importacion y exportacion de datos.',
  },
  {
    heading: 'Responsabilidades',
    body: 'Las aportaciones del usuario dentro del foro o los datos que importe deben ser adecuados y no vulnerar derechos de terceros. El proyecto puede eliminar registros de prueba o reiniciar colecciones cuando sea necesario.',
  },
  {
    heading: 'Propiedad y referencias',
    body: 'La ambientacion, nombres e imagenes relacionadas con The Legend of Zelda se utilizan como referencia fan y docente. Los derechos de la franquicia pertenecen a sus propietarios originales.',
  },
]


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
            <Route path="/import-export" element={<ImportExportPage />} />
            <Route path="/rss-info" element={<RSSPage />} />
            <Route
              path="/privacy-policy"
              element={
                <LegalPage
                  title="Privacy Policy"
                  description="Explicacion sencilla sobre que datos usa la app y para que se guardan."
                  sections={privacySections}
                />
              }
            />
            <Route
              path="/cookies-policy"
              element={
                <LegalPage
                  title="Cookies Policy"
                  description="Informacion basica sobre cookies y recursos externos utilizados en el proyecto."
                  sections={cookiesSections}
                />
              }
            />
            <Route
              path="/terms-of-service"
              element={
                <LegalPage
                  title="Terms of Service"
                  description="Condiciones de uso para este proyecto academico basado en Zelda."
                  sections={termsSections}
                />
              }
            />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
