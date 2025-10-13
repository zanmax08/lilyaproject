// Centralized portfolio video metadata built from a generated manifest.
// The manifest is created by scripts/generatePortfolioManifest.mjs by scanning public/videos.

import manifest from './portfolio.manifest.json'

// Map stable folder keys (routes) to physical folder names in /public/videos
export const folderDefs = [
  { key: 'mom', dir: 'Mom & Daughter' },
  { key: 'fashionMom', dir: 'Fashion mom & daughter' },
  { key: 'fashion', dir: 'Fashion' },
  { key: 'kids', dir: 'Kids Toys' },
  { key: 'beauty', dir: 'Beauty' },
  { key: 'food', dir: 'Food' },
  { key: 'other', dir: 'Other' },
  { key: 'videoEX', dir: 'videoEX' }
]

function getVideosForDir(dir){
  const list = (manifest?.folders?.[dir]) || []
  return list.map((entry, i) => {
    const src = `/videos/${dir}/${entry.file}`
    const thumb = entry.thumb ? `/videos/${dir}/${entry.thumb}` : `/videos/${dir}/${entry.file.replace(/\.[^.]+$/, '.PNG')}`
    return { src, thumb, index: i+1 }
  })
}

export function getFolderItems(){
  // Only keys; labels resolved via i18n
  return folderDefs.map(({ key }) => ({ key }))
}

export function buildFolderVideos(){
  const map = {}
  for(const def of folderDefs){
    map[def.key] = getVideosForDir(def.dir)
  }
  return map
}

export function resolveFolderByKey(key){
  return folderDefs.find(f => f.key === key) || null
}

export function getAllVideosFlat(){
  const map = buildFolderVideos()
  const out = []
  for(const key in map){
    for(const v of map[key]){
      out.push({ ...v, folderKey: key })
    }
  }
  return out
}
