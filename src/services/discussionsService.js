import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from './firebase'

const discussionsCollection = collection(db, 'discussions')
const commentsCollection = collection(db, 'comments')

const toIsoDate = (value) => {
  if (!value) {
    return new Date().toISOString().slice(0, 10)
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value?.toDate === 'function') {
    return value.toDate().toISOString().slice(0, 10)
  }

  return new Date(value).toISOString().slice(0, 10)
}

const normalizeDiscussion = (snapshot) => {
  const data = snapshot.data()

  return {
    id: snapshot.id,
    ...data,
    date: toIsoDate(data.date || data.createdAt),
    likes: Number(data.likes || 0),
    replies: Number(data.replies || 0),
  }
}

const sortDiscussions = (discussions) =>
  [...discussions].sort((left, right) => new Date(right.date) - new Date(left.date))

export const fetchDiscussions = async () => {
  const snapshot = await getDocs(discussionsCollection)
  return sortDiscussions(snapshot.docs.map(normalizeDiscussion))
}

export const subscribeToDiscussions = (onData, onError) =>
  onSnapshot(
    discussionsCollection,
    (snapshot) => {
      onData(sortDiscussions(snapshot.docs.map(normalizeDiscussion)))
    },
    onError
  )

export const createDiscussion = async ({ title, author, category, message }) => {
  const discussionRef = await addDoc(discussionsCollection, {
    title,
    author,
    avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(author)}`,
    category,
    lastMessageSummary: message,
    likes: 0,
    replies: 0,
    date: new Date().toISOString().slice(0, 10),
    createdAt: serverTimestamp(),
  })

  await addDoc(commentsCollection, {
    discussionId: discussionRef.id,
    user: 'Sabio Rauru',
    text: 'Bienvenido al foro. Que tu aporte ilumine a Hyrule.',
    seed: 'Rauru',
    createdAt: serverTimestamp(),
  })

  return discussionRef.id
}

export const editDiscussion = async (id, { title, category }) => {
  await updateDoc(doc(db, 'discussions', id), {
    title,
    category,
    updatedAt: serverTimestamp(),
  })
}

export const removeDiscussion = async (id) => {
  await deleteDoc(doc(db, 'discussions', id))
}
