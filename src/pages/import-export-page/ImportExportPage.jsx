import { useEffect, useMemo, useState } from 'react'
import appData from '../../assets/data.json'
import {
  createArchiveEntry,
  fetchArchiveEntries,
  replaceArchiveEntries,
  subscribeToArchiveEntries,
} from '../../services/catalogService'
import {
  buildEntriesFromAppData,
  downloadTextFile,
  parseCsvEntries,
  parseJsonEntries,
  parseXlsEntries,
  parseXmlEntries,
  toCsvEntries,
  toJsonEntries,
  toXlsEntries,
  toXmlEntries,
} from '../../utils/dataFormats'
import './ImportExportPage.css'

const exportFormats = [
  { key: 'json', label: 'Descargar datos.json', mimeType: 'application/json', fileName: 'datos.json' },
  { key: 'csv', label: 'Descargar datos.csv', mimeType: 'text/csv;charset=utf-8', fileName: 'datos.csv' },
  { key: 'xml', label: 'Descargar datos.xml', mimeType: 'application/xml', fileName: 'datos.xml' },
  { key: 'xls', label: 'Descargar datos.xls', mimeType: 'application/vnd.ms-excel', fileName: 'datos.xls' },
]

const serializers = {
  json: toJsonEntries,
  csv: toCsvEntries,
  xml: toXmlEntries,
  xls: toXlsEntries,
}

const parseFileByExtension = async (file) => {
  const content = await file.text()
  const extension = file.name.split('.').pop()?.toLowerCase()

  if (extension === 'json') {
    return parseJsonEntries(content)
  }

  if (extension === 'csv') {
    return parseCsvEntries(content)
  }

  if (extension === 'xml') {
    return parseXmlEntries(content)
  }

  if (extension === 'xls') {
    return parseXlsEntries(content)
  }

  throw new Error('Formato no soportado. Usa JSON, CSV, XML o XLS.')
}

const defaultSelection = {
  personaje: true,
  juego: true,
  objeto: true,
  importado: true,
}

const ImportExportPage = () => {
  const [customEntries, setCustomEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)
  const [importStatus, setImportStatus] = useState(
    'Puedes importar cualquier archivo compatible y la app lo convierte a JSON, XML, CSV y XLS.'
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState(defaultSelection)
  const [formData, setFormData] = useState({
    title: '',
    type: 'importado',
    era: '',
    source: 'manual',
    description: '',
    image: '',
  })

  useEffect(() => {
    let isMounted = true

    const loadEntries = async () => {
      try {
        const entries = await fetchArchiveEntries()

        if (isMounted) {
          setCustomEntries(entries)
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching archive entries:', error)
          setImportStatus('No se han podido leer los datos guardados en Firebase.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadEntries()

    const unsubscribe = subscribeToArchiveEntries(
      (entries) => {
        setCustomEntries(entries)
        setLoading(false)
      },
      (error) => {
        console.error('Error subscribing archive entries:', error)
        setLoading(false)
      }
    )

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  const allEntries = useMemo(() => buildEntriesFromAppData(appData, customEntries), [customEntries])

  const exportEntries = useMemo(
    () =>
      allEntries.filter((entry) => {
        if (entry.type === 'personaje') {
          return selectedGroups.personaje
        }

        if (entry.type === 'juego') {
          return selectedGroups.juego
        }

        if (entry.type === 'objeto') {
          return selectedGroups.objeto
        }

        return selectedGroups.importado
      }),
    [allEntries, selectedGroups]
  )

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSelectionChange = (event) => {
    const { name, checked } = event.target

    setSelectedGroups((current) => ({
      ...current,
      [name]: checked,
    }))
  }

  const handleCreateEntry = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await createArchiveEntry(formData)
      setFormData({
        title: '',
        type: 'importado',
        era: '',
        source: 'manual',
        description: '',
        image: '',
      })
      setImportStatus('Entrada personalizada guardada en Firebase.')
    } catch (error) {
      console.error('Error creating archive entry:', error)
      setImportStatus('No se ha podido guardar la entrada personalizada.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImport = async () => {
    if (!file) {
      setImportStatus('Selecciona un archivo antes de importar.')
      return
    }

    setIsSubmitting(true)

    try {
      const parsedEntries = await parseFileByExtension(file)

      if (!parsedEntries.length) {
        throw new Error('El archivo no contiene datos compatibles.')
      }

      await replaceArchiveEntries(parsedEntries, file.name)
      setFile(null)
      setImportStatus(`Importacion completada. ${parsedEntries.length} registros convertidos y guardados en Firebase.`)
    } catch (error) {
      console.error('Error importing file:', error)
      setImportStatus(error.message || 'No se ha podido importar el archivo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExport = (format) => {
    const serializer = serializers[format.key]
    const payload = serializer(exportEntries)

    downloadTextFile(format.fileName, payload, format.mimeType)
  }

  return (
    <div className="import-export-page">
      <div className="container">
        <h1>Importar y exportar datos</h1>
        <p className="subtitle">
          Descarga personajes, juegos y objetos de la app en JSON, XML, CSV y XLS, o importa
          nuevos registros y conviertelos automaticamente.
        </p>

        <div className="import-export-layout">
          <section className="data-panel">
            <h2>Nuevo registro en Firebase</h2>
            <form className="data-form" onSubmit={handleCreateEntry}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Titulo"
                required
              />

              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="importado">Importado</option>
                <option value="personaje">Personaje</option>
                <option value="juego">Juego</option>
                <option value="objeto">Objeto</option>
              </select>

              <input
                type="text"
                name="era"
                value={formData.era}
                onChange={handleChange}
                placeholder="Juego, era o contexto"
                required
              />

              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="Fuente"
                required
              />

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="URL de imagen opcional"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripcion"
                rows="5"
                required
              />

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar en Firebase'}
              </button>
            </form>
          </section>

          <section className="data-panel">
            <h2>Importacion y conversion</h2>
            <p className="panel-note">{importStatus}</p>

            <div className="import-box">
              <label htmlFor="import-file">Archivo de entrada</label>
              <input
                id="import-file"
                type="file"
                accept=".json,.csv,.xml,.xls"
                onChange={(event) => setFile(event.target.files?.[0] || null)}
              />
              <button type="button" className="submit-btn" onClick={handleImport} disabled={isSubmitting}>
                {isSubmitting ? 'Procesando...' : 'Importar a Firebase'}
              </button>
            </div>

            <div className="selection-grid">
              <label className="selection-item">
                <input
                  type="checkbox"
                  name="personaje"
                  checked={selectedGroups.personaje}
                  onChange={handleSelectionChange}
                />
                <span>Personajes</span>
              </label>
              <label className="selection-item">
                <input
                  type="checkbox"
                  name="juego"
                  checked={selectedGroups.juego}
                  onChange={handleSelectionChange}
                />
                <span>Juegos</span>
              </label>
              <label className="selection-item">
                <input
                  type="checkbox"
                  name="objeto"
                  checked={selectedGroups.objeto}
                  onChange={handleSelectionChange}
                />
                <span>Objetos</span>
              </label>
              <label className="selection-item">
                <input
                  type="checkbox"
                  name="importado"
                  checked={selectedGroups.importado}
                  onChange={handleSelectionChange}
                />
                <span>Datos importados</span>
              </label>
            </div>

            <div className="export-grid">
              {exportFormats.map((format) => (
                <button
                  key={format.key}
                  type="button"
                  className="secondary-btn"
                  onClick={() => handleExport(format)}
                  disabled={!exportEntries.length}
                >
                  {format.label}
                </button>
              ))}
            </div>

            <div className="sample-links">
              <a href="/sample-data/datos.json" target="_blank" rel="noreferrer">
                Ejemplo JSON
              </a>
              <a href="/sample-data/datos.csv" target="_blank" rel="noreferrer">
                Ejemplo CSV
              </a>
              <a href="/sample-data/datos.xml" target="_blank" rel="noreferrer">
                Ejemplo XML
              </a>
              <a href="/sample-data/datos.xls" target="_blank" rel="noreferrer">
                Ejemplo XLS
              </a>
            </div>
          </section>
        </div>

        <section className="data-panel entries-panel">
          <div className="entries-header">
            <h2>Contenido listo para exportar</h2>
            <span>{loading ? 'Cargando...' : `${exportEntries.length} registros seleccionados`}</span>
          </div>

          {loading ? (
            <p className="panel-note">Cargando datos desde Firebase y desde data.json...</p>
          ) : (
            <div className="entries-grid">
              {exportEntries.map((entry, index) => (
                <article key={`${entry.title}-${index}`} className="entry-card">
                  <p className="entry-type">{entry.type}</p>
                  <h3>{entry.title}</h3>
                  <p className="entry-era">{entry.era}</p>
                  <p>{entry.description}</p>
                  <p className="entry-source">Fuente: {entry.source}</p>
                  {entry.image ? (
                    <a href={entry.image} className="entry-link" target="_blank" rel="noreferrer">
                      Ver imagen
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default ImportExportPage
