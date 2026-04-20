import { Link } from 'react-router-dom'

const realms = [
  {
    to: '/characters',
    className: 'characters-realm',
    title: 'Personajes',
    description: 'Conoce a heroes, sabios y villanos clave de la saga.',
  },
  {
    to: '/items',
    className: 'items-realm',
    title: 'Objetos sagrados',
    description: 'Explora reliquias, armas legendarias y artefactos unicos.',
  },
  {
    to: '/games',
    className: 'games-realm',
    title: 'Cronologia',
    description: 'Recorre los juegos principales y su lugar en Hyrule.',
  },
  {
    to: '/community',
    className: 'forum-realm',
    title: 'Consejo de sabios',
    description: 'Participa en el foro y comparte teoria, lore y estrategia.',
  },
]

const HomeRealmGrid = () => (
  <section className="realm-sections">
    {realms.map((realm) => (
      <Link key={realm.to} to={realm.to} className={`realm-card ${realm.className}`}>
        <div className="realm-overlay"></div>
        <h3>{realm.title}</h3>
        <p>{realm.description}</p>
      </Link>
    ))}
  </section>
)

export default HomeRealmGrid
