// Data helpers for the Stats & Proof page.
// Images: place PNG/JPG screenshots into /public/proof (e.g. 1.png, 2.png ...).
// This keeps logic simple & no bundler import needed (served statically).

const IMAGE_DIR = '/proof'
const IMAGE_EXTS = ['png','jpg','jpeg','webp']

// If you want to explicitly register images with captions, add them here:
const explicit = [
  // { file: '1.png', caption: '5M+ organic views dashboard' }
]

export function getStatsProofImages(){
  // If explicit list present, build from that; else generate 1..12 attempt existing names.
  if(explicit.length){
    return explicit.map((e,i)=>({
      src: `${IMAGE_DIR}/${e.file}`,
      caption: e.caption || '',
      alt: e.alt || e.caption || `Proof ${i+1}`
    }))
  }
  // Heuristic: attempt sequential names until a gap of 3 in a row.
  const out = []
  let misses = 0
  for(let i=1;i<=50 && misses<3;i++){
    let found = false
    for(const ext of IMAGE_EXTS){
      const src = `${IMAGE_DIR}/${i}.${ext}`
      // We cannot synchronously know if it exists; still push optimistic entry.
      out.push({ src, alt: `Proof ${i}` })
      found = true
      break
    }
    if(!found){ misses++ } else { misses = 0 }
  }
  return out
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
