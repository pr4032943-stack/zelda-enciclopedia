import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { db } from './firebase'

const archiveCollection = collection(db, 'archiveEntries')

const toIsoDate = (value) => {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value?.toDate === 'function') {
    return value.toDate().toISOString().slice(0, 10)
  }

  return new Date(value).toISOString().slice(0, 10)
}

const normalizeEntry = (snapshot) => {
  const data = snapshot.data()

  return {
    id: snapshot.id,
    title: data.title || '',
    type: data.type || 'personaje',
    era: data.era || '',
    source: data.source || 'manual',
    description: data.description || '',
    image: data.image || '',
    createdAt: toIsoDate(data.createdAt),
  }
}

const sortEntries = (entries) =>
  [...entries].sort((left, right) => left.title.localeCompare(right.title, 'es'))

export const subscribeToArchiveEntries = (onData, onError) =>
  onSnapshot(
    archiveCollection,
    (snapshot) => {
      onData(sortEntries(snapshot.docs.map(normalizeEntry)))
    },
    onError
  )

export const fetchArchiveEntries = async () => {
  const snapshot = await getDocs(archiveCollection)
  return sortEntries(snapshot.docs.map(normalizeEntry))
}

export const createArchiveEntry = async ({ title, type, era, source, description, image }) => {
  await addDoc(archiveCollection, {
    title,
    type,
    era,
    source,
    description,
    image: image || '',
    createdAt: serverTimestamp(),
  })
}

export const replaceArchiveEntries = async (entries, sourceLabel) => {
  const snapshot = await getDocs(archiveCollection)
  const batch = writeBatch(db)

  snapshot.forEach((entrySnapshot) => {
    batch.delete(entrySnapshot.ref)
  })

  entries.forEach((entry) => {
    const archiveDoc = doc(archiveCollection)

    batch.set(archiveDoc, {
      title: entry.title,
      type: entry.type,
      era: entry.era,
      source: sourceLabel || entry.source || 'importado',
      description: entry.description,
      image: entry.image || '',
      createdAt: serverTimestamp(),
      importedAt: serverTimestamp(),
    })
  })

  await batch.commit()
}
