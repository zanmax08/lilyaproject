import fs from 'fs'
import path from 'path'

const root = process.cwd()
const videosRoot = path.join(root, 'public', 'videos')
const outFile = path.join(root, 'src', 'utils', 'portfolio.manifest.json')

const VIDEO_EXTS = new Set(['.mov', '.mp4', '.webm', '.m4v', '.avi'])
const PREVIEW_EXTS = ['.PNG', '.png', '.JPG', '.jpg', '.JPEG', '.jpeg', '.WEBP', '.webp']

function safeReaddirSync(dir){
  try { return fs.readdirSync(dir, { withFileTypes: true }) } catch { return [] }
}

function findPreviewFor(base, filesSet){
  for(const ext of PREVIEW_EXTS){
    const name = base + ext
    if(filesSet.has(name)) return name
  }
  return null
}

function scan(){
  const result = { folders: {} }
  const folders = safeReaddirSync(videosRoot).filter(d => d.isDirectory()).map(d => d.name)
  for(const dirName of folders){
    const full = path.join(videosRoot, dirName)
    const entries = safeReaddirSync(full)
    const files = entries.filter(e => e.isFile()).map(e => e.name)
    const filesSet = new Set(files)
    const videos = files
      .filter(name => VIDEO_EXTS.has(path.extname(name).toLowerCase()))
      // Sort numerically if names are like 1.MOV, 2.MOV; fall back to locale compare
      .sort((a,b)=>{
        const na = parseInt(path.parse(a).name, 10)
        const nb = parseInt(path.parse(b).name, 10)
        if(!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb
        return a.localeCompare(b)
      })
    result.folders[dirName] = videos.map(file => {
      const base = path.parse(file).name
      const thumb = findPreviewFor(base, filesSet)
      return { file, thumb }
    })
  }
  return result
}

function ensureDir(p){ fs.mkdirSync(path.dirname(p), { recursive: true }) }

function main(){
  const data = scan()
  ensureDir(outFile)
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf-8')
  console.log(`[manifest] Wrote ${outFile}`)
}

main()
