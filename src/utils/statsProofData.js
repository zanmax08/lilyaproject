// Data helpers for the Stats & Proof page.
// Preferred: Place images under src/assets/proof so Vite includes them.
// Alternative: Put static files in /public/proof (will be referenced directly).

const PUBLIC_DIR = '/proof'

// Explicit list of existing proof screenshots. Add new items here to show them (keeps grid clean).
const explicit = [
  { file: '1.png', caption: 'High engagement performance' },
  { file: '2.png', caption: 'Strong saves & shares' },
  { file: '3.png', caption: 'Growth dashboard snapshot' },
  { file: '4.png', caption: 'Monetization / key metrics' }
]

export function getStatsProofImages(){
  // 1. If explicit list defined, map directly (try src/assets/proof first, then public)
  if(explicit.length){
    return explicit.map((e,i)=>buildEntry(e.file, i, e))
  }

  // 2. Dynamic glob import (bundled assets). Vite returns an object: path -> module
  let globbed = {}
  try {
  globbed = import.meta.glob('../assets/proof/*.{png,PNG,jpg,jpeg,webp,avif,gif}', { eager: true, import: 'default' })
  } catch(e) {
    // ignore if glob fails (older tooling) and fall back
  }
  const entries = Object.entries(globbed).map(([path, src], i) => {
    const file = path.split('/').pop()
    return { src, alt: `Proof ${i+1}`, caption: '' }
  })
  if(entries.length){
    return entries
  }

  // 3. Fallback disabled since we use explicit list to avoid empty placeholders.
  return []
}

function buildEntry(file, i, meta={}){
  // Try asset import path pattern first
  const assetAttempt = tryResolveBundled(file)
  return {
    src: assetAttempt || `${PUBLIC_DIR}/${file}`,
    caption: meta.caption || '',
    alt: meta.alt || meta.caption || `Proof ${i+1}`
  }
}

function tryResolveBundled(file){
  try {
    const mods = import.meta.glob('../assets/proof/*', { eager:true, import: 'default' })
    const found = Object.entries(mods).find(([p]) => p.endsWith('/'+file))
    return found ? found[1] : null
  } catch(e){ return null }
}

export function getStatsMetrics(){
  return [
    '5M+ organic views',
    '1000+ saves / shares per top video',
    '150+ brand collaborations',
    'Hook + story scripts',
    'Family / kids creator niche'
  ]
}
