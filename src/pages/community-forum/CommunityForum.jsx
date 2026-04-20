<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { db } from '../../services/firebase'
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import './CommunityForum.css'

const CommunityForum = () => {
    const [allDiscussions, setAllDiscussions] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All')

    // New Discussion Form state
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newCategory, setNewCategory] = useState('Lore')
    const [newMessage, setNewMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editCategory, setEditCategory] = useState('Lore')

    const categories = ['All', 'Lore', 'Speedrunning', 'Strategies', 'Fan Art', 'News', 'Cosplay/Fan Creations']
    const formCategories = ['Lore', 'Speedrunning', 'Strategies', 'Fan Art', 'News', 'Cosplay/Fan Creations']

    const MOCK_DISCUSSIONS = [
        { 
            id: 'm1', 
            title: 'Rutas de Speedrun: ¿Switch o Wii U?', 
            author: 'Link88', 
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Link88',
            category: 'Speedrunning', 
            date: '2023-10-15',
            lastMessageSummary: 'He encontrado un glitch consistente para saltarse el primer santuario.',
            likes: 42,
            replies: 15,
            featuredComments: [
                { user: 'Impa', text: 'El tiempo es la esencia de tu misión.', seed: 'Impa' },
                { user: 'Tingle', text: '¡Kooloo-Limpah! ¡Rápido como un globo!', seed: 'Tingle' }
            ]
        },
        { 
            id: 'm2', 
            title: 'Teoría: El origen de los Zonnan en el cielo', 
            author: 'ZeldaScholar', 
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ZeldaScholar',
            category: 'Lore', 
            date: '2023-11-02',
            lastMessageSummary: 'Analizando las inscripciones, creo que no vinieron del cielo, sino de otra dimensión.',
            likes: 128,
            replies: 45,
            featuredComments: [
                { user: 'Rauru', text: 'Interesante... aunque la verdad es mucho más antigua.', seed: 'Rauru' }
            ]
        },
        { 
            id: 'm3', 
            title: '¿Es Ganon realmente un villano incomprendido?', 
            author: 'DarkProphecy', 
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=DarkProphecy',
            category: 'Lore', 
            date: '2024-03-10',
            lastMessageSummary: 'Si miras la profecía de Gerudo de hace siglos, él era la víctima del destino.',
            likes: 5,
            replies: 150,
            featuredComments: [
                { user: 'Urbosa', text: 'Ten cuidado con lo que dices sobre el Rey de las Sombras.', seed: 'Urbosa' },
                { user: 'Ganondorf', text: 'Interesante insolencia...', seed: 'Ganon' }
            ]
        },
        { 
            id: 'm4', 
            title: 'Receta de Cocina: Arroz con Hongo de Fuego', 
            author: 'ChefLink', 
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ChefLink',
            category: 'Strategies', 
            date: '2024-03-01',
            lastMessageSummary: 'Te da resistencia al frío de nivel 3 y además recupera 12 corazones.',
            likes: 210,
            replies: 38,
            featuredComments: [
                { user: 'Sonia', text: 'Huele delicioso desde aquí.', seed: 'Sonia' }
            ]
        },
        { 
            id: 'm5', 
            title: 'Mi dibujo de Zelda al estilo Ghibli', 
            author: 'ArtisticDeku', 
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ArtisticDeku',
            category: 'Fan Art', 
            date: '2024-03-15',
            lastMessageSummary: 'He tardado semanas en terminar esta ilustración digital. ¡Espero que os guste!',
            likes: 85,
            replies: 12,
            featuredComments: [
                { user: 'Sidon', text: '¡Tu talento brilla tanto como tu espíritu!', seed: 'Sidon' }
            ]
        },
        { 
            id: 'm6', 
            title: '¿Alguien ha visto el Dragón Blanco cerca de Akkala?', 
            author: 'DragonWatcher', 
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=DragonWatcher',
            category: 'Lore', 
            date: '2024-03-12',
            lastMessageSummary: 'Parece que vuela más bajo a medianoche. ¿Alguien sabe por qué?',
            likes: 67,
            replies: 24,
            featuredComments: [
                { user: 'Rauru', text: 'Ese dragón guarda una tristeza inmensa...', seed: 'Rauru' }
            ]
        },
        { 
            id: 'm7', 
            title: 'Tutorial: Cómo domar un caballo gigante', 
            author: 'EponaMaster', 
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=EponaMaster',
            category: 'Strategies', 
            date: '2024-03-08',
            lastMessageSummary: 'Necesitarás al menos 3 círculos de estamina y mucha paciencia.',
            likes: 145,
            replies: 31,
            featuredComments: [
                { user: 'Beedle', text: '¡OHHH! ¡Qué ejemplar tan magnífico!', seed: 'Beedle' }
            ]
        },
        { 
            id: 'm8', 
            title: 'Rumor: ¿Echoes of Wisdom tendrá multijugador?', 
            author: 'HylianLeaker', 
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=HylianLeaker',
            category: 'News', 
            date: '2024-03-05',
            lastMessageSummary: 'He visto archivos que sugieren un modo cooperativo local...',
            likes: 300,
            replies: 89,
            featuredComments: [
                { user: 'Maestro Kogg', text: '¡Eso suena a una emboscada Yiga!', seed: 'Kogg' }
            ]
        },
        { 
            id: 'm9', 
            title: 'Ubicación de todas las Semillas Kolog en el Desierto', 
            author: 'KologHunter', 
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=KologHunter',
            category: 'Strategies', 
            date: '2024-02-28',
            lastMessageSummary: 'Hay 12 ocultas bajo las dunas. Aquí tenéis el mapa completo.',
            likes: 112,
            replies: 56,
            featuredComments: [
                { user: 'Obab', text: '¡Shalaka-lala! ¡Más semillas para mis maracas!', seed: 'Obab' }
            ]
        },
        { 
            id: 'm10', 
            title: 'Análisis: La arquitectura de la Ciudadela Gerudo', 
            author: 'HylianArchitect', 
            avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=HylianArchitect',
            category: 'Lore', 
            date: '2024-02-20',
            lastMessageSummary: 'El uso del agua para refrigerar los edificios es una obra maestra de ingeniería.',
            likes: 89,
            replies: 14,
            featuredComments: [
                { user: 'Urbosa', text: 'Nuestras antepasadas no solo eran guerreras.', seed: 'Urbosa' }
            ]
        }
    ]

    const fetchDiscussions = async () => {
        setLoading(true)
        try {
            const discussionsRef = collection(db, 'discussions')
            const querySnapshot = await getDocs(discussionsRef)
            const firebaseData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            // Merge Firebase data with Mock data, putting real data first
            setAllDiscussions([...firebaseData, ...MOCK_DISCUSSIONS])
        } catch (error) {
            console.error("Error fetching discussions:", error)
            setAllDiscussions(MOCK_DISCUSSIONS)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDiscussions()
    }, [])

    const handleAddDiscussion = async (e) => {
        e.preventDefault()
        if (!newTitle || !newAuthor) return
        
        setIsSubmitting(true)
        try {
            const docRef = await addDoc(collection(db, 'discussions'), {
                title: newTitle,
                author: newAuthor,
                avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${newAuthor}`,
                category: newCategory,
                lastMessageSummary: newMessage || 'Empezando una nueva discusión...',
                likes: 0,
                replies: 0,
                date: new Date().toISOString().split('T')[0],
                createdAt: serverTimestamp()
            })
            // Proactively adding a comment to the new discussion
            await addDoc(collection(db, 'comments'), {
                discussionId: docRef.id,
                user: 'Sabio Rauru',
                text: 'Bienvenido al foro, joven héroe.',
                seed: 'Rauru',
                createdAt: serverTimestamp()
            })

            setNewTitle('')
            setNewAuthor('')
            setNewMessage('')
            fetchDiscussions()
        } catch (error) {
            console.error("Error adding document: ", error)
            alert("Could not add discussion. Are you connected to Firebase?")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this discussion?')) {
            try {
                await deleteDoc(doc(db, 'discussions', id))
                fetchDiscussions()
            } catch(error) {
                console.error("Error deleting document:", error)
                alert("Could not delete discussion. Maybe it's a mock item?")
            }
        }
    }

    const handleEditStart = (discussion) => {
        if (discussion.id.startsWith('m')) {
            alert("No se pueden editar las discusiones de prueba (Mock).")
            return
        }
        setEditingId(discussion.id)
        setEditTitle(discussion.title)
        setEditCategory(discussion.category)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!editTitle) return
        
        setIsSubmitting(true)
        try {
            const docRef = doc(db, 'discussions', editingId)
            await updateDoc(docRef, {
                title: editTitle,
                category: editCategory,
                updatedAt: serverTimestamp()
            })
            setEditingId(null)
            fetchDiscussions()
        } catch (error) {
            console.error("Error updating document: ", error)
            alert("Could not update discussion.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const filteredDiscussions = allDiscussions.filter(d =>
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === 'All' || d.category === categoryFilter)
    )

    const getCategoryCount = (cat) => {
        if (cat === 'All') return allDiscussions.length
        return allDiscussions.filter(d => d.category === cat).length
    }

    return (
        <div className="community-forum">
            <div className="container">
                <h1>Consejo de Sabios</h1>
                <p className="subtitle">Discuss everything about The Legend of Zelda</p>

                <div className="forum-controls">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar en la sabiduría de Hyrule..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="forum-content">
                    {editingId && (
                        <div className="edit-discussion-form">
                            <h3>Editar Sabiduría</h3>
                            <form onSubmit={handleUpdate}>
                                <input 
                                    type="text" 
                                    placeholder="Discussion Title" 
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    required 
                                />
                                <select 
                                    value={editCategory} 
                                    onChange={(e) => setEditCategory(e.target.value)}
                                >
                                    {formCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <div className="edit-actions">
                                    <button type="submit" disabled={isSubmitting} className="submit-btn">
                                        {isSubmitting ? 'Actualizando...' : 'Guardar Cambios'}
                                    </button>
                                    <button type="button" onClick={() => setEditingId(null)} className="cancel-btn">
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="new-discussion-form">
                        <h3>Start a New Discussion</h3>
                        <form onSubmit={handleAddDiscussion}>
                            <input 
                                type="text" 
                                placeholder="Discussion Title" 
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required 
                            />
                            <input 
                                type="text" 
                                placeholder="Your Name (Hero)" 
                                value={newAuthor}
                                onChange={(e) => setNewAuthor(e.target.value)}
                                required 
                            />
                            <select 
                                value={newCategory} 
                                onChange={(e) => setNewCategory(e.target.value)}
                            >
                                {formCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Write your first message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                rows="3"
                                required
                            />
                            <button type="submit" disabled={isSubmitting} className="submit-btn">
                                {isSubmitting ? 'Posting...' : 'Post Discussion'}
                            </button>
                        </form>
                    </div>

                    {loading ? (
                        <div className="loading">Loading ancient wisdom...</div>
                    ) : (
                        <div className="discussions-list">
                            {filteredDiscussions.length > 0 ? (
                                filteredDiscussions.map(disc => (
                                    <div key={disc.id} className="discussion-card">
                                        
                                        <div className="discussion-header">
                                            <div className="author-details">
                                                <img 
                                                    src={disc.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${disc.author}`} 
                                                    alt={disc.author} 
                                                    className="user-avatar" 
                                                />
                                                <div className="discussion-info">
                                                    <h3>{disc.title}</h3>
                                                    <p>Posted by <span className="author-name">{disc.author}</span> on {disc.date || 'Unknown'}</p>
                                                </div>
                                            </div>
                                            <span className={`category-tag ${disc.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                                                {disc.category}
                                            </span>
                                        </div>

                                        <div className="discussion-body">
                                            <p className="message-summary">"{disc.lastMessageSummary || 'No recent messages...'}"</p>
                                        </div>

                                        <div className="discussion-footer">
                                            <div className="action-buttons">
                                                <button className="action-btn like-btn">
                                                    ❤ {disc.likes || 0}
                                                </button>
                                                <button className="action-btn reply-btn">
                                                    💬 {disc.replies || 0}
                                                </button>
                                            </div>
                                            <div className="admin-actions">
                                                <button onClick={() => handleEditStart(disc)} className="edit-btn-ghost">Editar</button>
                                                <button onClick={() => handleDelete(disc.id)} className="delete-btn-ghost">Eliminar</button>
                                            </div>
                                        </div>

                                        <div className="featured-comments">
                                            {(disc.featuredComments || [
                                                { user: 'Sonia', text: 'Interesante punto de vista.', seed: 'Sonia' },
                                                { user: 'Ganondorf', text: 'Tanta charla no servirá de nada...', seed: 'Ganon' }
                                            ]).map((comment, idx) => (
                                                <div key={idx} className="comment-line">
                                                    <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${comment.seed}`} alt="user" className="mini-avatar" />
                                                    <p><strong>{comment.user}:</strong> {comment.text}</p>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <p className="no-results">No discussions found matching your criteria.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
=======
import { useEffect, useState } from 'react'
import {
  createDiscussion,
  editDiscussion,
  fetchDiscussions,
  removeDiscussion,
  subscribeToDiscussions,
} from '../../services/discussionsService'
import './CommunityForum.css'

const categories = ['All', 'Lore', 'Speedrunning', 'Strategies', 'Fan Art', 'News', 'Cosplay/Fan Creations']
const formCategories = ['Lore', 'Speedrunning', 'Strategies', 'Fan Art', 'News', 'Cosplay/Fan Creations']

const MOCK_DISCUSSIONS = [
  {
    id: 'm1',
    title: 'Rutas de speedrun: Switch o Wii U?',
    author: 'Link88',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Link88',
    category: 'Speedrunning',
    date: '2024-10-15',
    lastMessageSummary: 'He encontrado un glitch consistente para saltarme el primer santuario.',
    likes: 42,
    replies: 15,
    featuredComments: [{ user: 'Impa', text: 'El tiempo es la esencia de tu mision.', seed: 'Impa' }],
  },
  {
    id: 'm2',
    title: 'Teoria: el origen de los zonnan en el cielo',
    author: 'ZeldaScholar',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ZeldaScholar',
    category: 'Lore',
    date: '2024-11-02',
    lastMessageSummary: 'Analizando las inscripciones, creo que no vinieron del cielo.',
    likes: 128,
    replies: 45,
    featuredComments: [{ user: 'Rauru', text: 'La verdad es mas antigua de lo que parece.', seed: 'Rauru' }],
  },
  {
    id: 'm3',
    title: 'Mi dibujo de Zelda al estilo Ghibli',
    author: 'ArtisticDeku',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ArtisticDeku',
    category: 'Fan Art',
    date: '2025-03-15',
    lastMessageSummary: 'He tardado semanas en terminar esta ilustracion digital.',
    likes: 85,
    replies: 12,
    featuredComments: [{ user: 'Sidon', text: 'Tu talento brilla tanto como tu espiritu.', seed: 'Sidon' }],
  },
  {
    id: 'm4',
    title: 'Rumor: Echoes of Wisdom tendra multijugador?',
    author: 'HylianLeaker',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=HylianLeaker',
    category: 'News',
    date: '2025-03-05',
    lastMessageSummary: 'He visto archivos que sugieren un modo cooperativo local.',
    likes: 300,
    replies: 89,
    featuredComments: [{ user: 'Maestro Kogg', text: 'Eso suena a una emboscada Yiga.', seed: 'Kogg' }],
  },
]

const CommunityForum = () => {
  const [remoteDiscussions, setRemoteDiscussions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusMessage, setStatusMessage] = useState('Sincronizando con Firebase...')

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newCategory, setNewCategory] = useState('Lore')
  const [newMessage, setNewMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editCategory, setEditCategory] = useState('Lore')

  useEffect(() => {
    let isMounted = true

    const loadDiscussions = async () => {
      try {
        const discussions = await fetchDiscussions()

        if (isMounted) {
          setRemoteDiscussions(discussions)
          setStatusMessage('Foro conectado con Firebase.')
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching discussions:', error)
          setStatusMessage('Firebase no ha respondido. Se muestran discusiones de ejemplo.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadDiscussions()

    const unsubscribe = subscribeToDiscussions(
      (discussions) => {
        setRemoteDiscussions(discussions)
        setLoading(false)
        setStatusMessage('Cambios guardados y sincronizados en tiempo real.')
      },
      (error) => {
        console.error('Error subscribing to discussions:', error)
        setLoading(false)
        setStatusMessage('No ha sido posible sincronizar en tiempo real. Se mantiene el modo local.')
      }
    )

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  const discussions = [...remoteDiscussions, ...MOCK_DISCUSSIONS]

  const filteredDiscussions = discussions.filter(
    (discussion) =>
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'All' || discussion.category === categoryFilter)
  )

  const handleAddDiscussion = async (event) => {
    event.preventDefault()

    if (!newTitle.trim() || !newAuthor.trim() || !newMessage.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      await createDiscussion({
        title: newTitle.trim(),
        author: newAuthor.trim(),
        category: newCategory,
        message: newMessage.trim(),
      })

      setNewTitle('')
      setNewAuthor('')
      setNewMessage('')
      setNewCategory('Lore')
      setStatusMessage('Discusion creada correctamente.')
    } catch (error) {
      console.error('Error adding discussion:', error)
      alert('No se ha podido crear la discusion en Firebase.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (id.startsWith('m')) {
      alert('Las discusiones de ejemplo no se pueden eliminar.')
      return
    }

    if (!window.confirm('Quieres eliminar esta discusion?')) {
      return
    }

    try {
      await removeDiscussion(id)
      setStatusMessage('Discusion eliminada correctamente.')
    } catch (error) {
      console.error('Error deleting discussion:', error)
      alert('No se ha podido eliminar la discusion.')
    }
  }

  const handleEditStart = (discussion) => {
    if (discussion.id.startsWith('m')) {
      alert('Las discusiones de ejemplo no se pueden editar.')
      return
    }

    setEditingId(discussion.id)
    setEditTitle(discussion.title)
    setEditCategory(discussion.category)
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    if (!editTitle.trim() || !editingId) {
      return
    }

    setIsSubmitting(true)

    try {
      await editDiscussion(editingId, {
        title: editTitle.trim(),
        category: editCategory,
      })

      setEditingId(null)
      setStatusMessage('Discusion actualizada correctamente.')
    } catch (error) {
      console.error('Error updating discussion:', error)
      alert('No se ha podido actualizar la discusion.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="community-forum">
      <div className="container">
        <h1>Consejo de Sabios</h1>
        <p className="subtitle">CRUD conectado a Firebase para crear, editar y eliminar discusiones.</p>
        <p className="forum-status">{statusMessage}</p>

        <div className="forum-controls">
          <div className="search-box">
            <span className="search-icon">Buscar</span>
            <input
              type="text"
              placeholder="Busca una discusion..."
              className="search-input"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="filter-row">
            <label className="filter-label" htmlFor="category-filter">
              Filtrar por categoria
            </label>
            <select
              id="category-filter"
              className="category-filter"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="forum-content">
          <div className="forum-sidebar">
            {editingId && (
              <div className="edit-discussion-form">
                <h3>Editar discusion</h3>
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    placeholder="Titulo"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                    required
                  />
                  <select value={editCategory} onChange={(event) => setEditCategory(event.target.value)}>
                    {formCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="edit-actions">
                    <button type="submit" disabled={isSubmitting} className="submit-btn">
                      {isSubmitting ? 'Actualizando...' : 'Guardar cambios'}
                    </button>
                    <button type="button" onClick={() => setEditingId(null)} className="cancel-btn">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="new-discussion-form">
              <h3>Nueva discusion</h3>
              <form onSubmit={handleAddDiscussion}>
                <input
                  type="text"
                  placeholder="Titulo"
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Autor"
                  value={newAuthor}
                  onChange={(event) => setNewAuthor(event.target.value)}
                  required
                />
                <select value={newCategory} onChange={(event) => setNewCategory(event.target.value)}>
                  {formCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Primer mensaje"
                  value={newMessage}
                  onChange={(event) => setNewMessage(event.target.value)}
                  rows="4"
                  required
                />
                <button type="submit" disabled={isSubmitting} className="submit-btn">
                  {isSubmitting ? 'Guardando...' : 'Publicar en Firebase'}
                </button>
              </form>
            </div>
          </div>

          {loading ? (
            <div className="loading">Cargando sabiduria antigua...</div>
          ) : (
            <div className="discussions-list">
              {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((discussion) => (
                  <article key={discussion.id} className="discussion-card">
                    <div className="discussion-header">
                      <div className="author-details">
                        <img
                          src={discussion.avatar}
                          alt={discussion.author}
                          className="user-avatar"
                        />
                        <div className="discussion-info">
                          <h3>{discussion.title}</h3>
                          <p>
                            Publicado por <span className="author-name">{discussion.author}</span> el{' '}
                            {discussion.date}
                          </p>
                        </div>
                      </div>
                      <span className={`category-tag ${discussion.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                        {discussion.category}
                      </span>
                    </div>

                    <div className="discussion-body">
                      <p className="message-summary">"{discussion.lastMessageSummary || 'Sin mensajes aun.'}"</p>
                    </div>

                    <div className="discussion-footer">
                      <div className="action-buttons">
                        <button type="button" className="action-btn like-btn">
                          {discussion.likes || 0} apoyos
                        </button>
                        <button type="button" className="action-btn reply-btn">
                          {discussion.replies || 0} respuestas
                        </button>
                      </div>

                      <div className="admin-actions">
                        <button type="button" onClick={() => handleEditStart(discussion)} className="edit-btn-ghost">
                          Editar
                        </button>
                        <button type="button" onClick={() => handleDelete(discussion.id)} className="delete-btn-ghost">
                          Eliminar
                        </button>
                      </div>
                    </div>

                    <div className="featured-comments">
                      {(discussion.featuredComments || [
                        { user: 'Sonia', text: 'Interesante punto de vista.', seed: 'Sonia' },
                      ]).map((comment, index) => (
                        <div key={`${discussion.id}-${index}`} className="comment-line">
                          <img
                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${comment.seed}`}
                            alt={comment.user}
                            className="mini-avatar"
                          />
                          <p>
                            <strong>{comment.user}:</strong> {comment.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))
              ) : (
                <p className="no-results">No hay discusiones que coincidan con el filtro actual.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
>>>>>>> ca7a0c4 (Añado .env al gitignore)
}

export default CommunityForum
