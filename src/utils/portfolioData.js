// Centralized portfolio video metadata so list and folder pages share logic.

export const folderDefs = [
  { key: 'mom', dir: 'Mom & Daughter' },
  { key: 'fashionMom', dir: 'Fashion mom & daughter' },
  { key: 'kids', dir: 'Kids Toys' },
  { key: 'beauty', dir: 'Beauty' },
  { key: 'food', dir: 'Food' },
  { key: 'other', dir: 'Other' }
]

const videoFiles = {
  'Mom & Daughter': ['1.MOV','2.MOV','3.MOV','4.MOV','5.MOV'],
  'Fashion mom & daughter': ['1.MOV','2.MOV','3.MOV'],
  'Kids Toys': ['1.MOV','2.MOV'],
  'Beauty': ['1.MOV','2.MOV','3.MOV','4.MOV'],
  'Food': ['1.MOV','2.MOV','3.MOV'],
  'Other': ['1.MOV','2.MOV','3.MOV','4.MP4','5.MOV']
}

export function getFolderItems(){
  // labels now resolved via i18n; keep only keys
  return folderDefs.map(({ key }) => ({ key }))
}

export function buildFolderVideos(){
  const map = {}
  for(const def of folderDefs){
    const files = videoFiles[def.dir] || []
    map[def.key] = files.map((file, i) => ({
      thumb: '/glscreen.png',
      // alt will be constructed in component using translation pattern
      index: i+1,
      src: `/videos/${def.dir}/${file}`
    }))
  }
  return map
}

export function resolveFolderByKey(key){
  return folderDefs.find(f => f.key === key) || null
}
