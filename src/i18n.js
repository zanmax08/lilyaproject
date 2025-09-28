import { ref } from 'vue'
import en from './locales/en.json'
import ru from './locales/ru.json'
import es from './locales/es.json'

const messages = { en, ru, es }

// reactive language ref shared across the app
export const lang = ref(localStorage.getItem('site_lang') || 'en')

export function setLang(v) {
  lang.value = v
  localStorage.setItem('site_lang', v)
  document.documentElement.lang = v
  // set document title if provided in locales
  try {
    const title = messages[v] && messages[v].meta && messages[v].meta.title
    if (title) document.title = title
  } catch (e) {
    // ignore
  }
}

export function t(path) {
  const l = lang.value || 'en'
  const parts = path.split('.')
  let out = messages[l]
  for (const p of parts) {
    if (!out) return path
    out = out[p]
  }
  return out || path
}

export default messages
