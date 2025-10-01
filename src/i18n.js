import { ref } from 'vue'
import en from './locales/en.json'
import ru from './locales/ru.json'
import es from './locales/es.json'

const messages = { en, ru, es }

// simple in-memory cache for resolved translation keys
let _cache = {}

// reactive language ref shared across the app
export const lang = ref(localStorage.getItem('site_lang') || 'en')

export function setLang(v) {
  lang.value = v
  localStorage.setItem('site_lang', v)
  document.documentElement.lang = v
  // clear translation cache on language change
  _cache = {}
  // set document title if provided in locales
  try {
    const title = messages[v] && messages[v].meta && messages[v].meta.title
    if (title) document.title = title
  } catch (e) {
    // ignore
  }
}

// Core translation lookup. Supports nested paths and returns primitive / object / array.
export function t(path, def) {
  const l = lang.value in messages ? lang.value : 'en'
  if (!path) return def || ''
  const cacheKey = l + '::' + path
  if (_cache[cacheKey] !== undefined) return _cache[cacheKey]
  const parts = path.split('.')
  let ctx = messages[l]
  for (const seg of parts) {
    if (ctx && Object.prototype.hasOwnProperty.call(ctx, seg)) {
      ctx = ctx[seg]
    } else {
      const miss = def !== undefined ? def : path
      _cache[cacheKey] = miss
      return miss
    }
  }
  _cache[cacheKey] = ctx
  return ctx
}

// Convenience: if value is array/object we don't stringify—component decides.
// For simple text with potential HTML tags allowed explicitly.
export function tHtml(path, def){
  const val = t(path, def)
  if (typeof val === 'string') return val
  return def || ''
}

export default messages
