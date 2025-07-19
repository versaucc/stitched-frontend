import { CustomPairSession } from '../types/customPairSession'

const STORAGE_KEY = 'custom_session'

export function getStoredSession(): CustomPairSession | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

export function setStoredSession(data: CustomPairSession) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function clearStoredSession() {
  localStorage.removeItem(STORAGE_KEY)
}
