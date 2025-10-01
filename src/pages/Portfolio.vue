<template>
  <div class="portfolio-page">
    <PortfolioHero />
    <VideoExamples :items="videoItems" />
    <div ref="foldersAnchor"></div>
    <PortfolioFolders :folders="folderItems" @select="onSelectFolder" />
    <PortfolioCTA />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { t } from '@/i18n'
import { useRouter } from 'vue-router'
import PortfolioHero from '@/components/portfolio/PortfolioHero.vue'
import VideoExamples from '@/components/portfolio/VideoExamples.vue'
import PortfolioFolders from '@/components/portfolio/PortfolioFolders.vue'
import PortfolioCTA from '@/components/portfolio/PortfolioCTA.vue'
// FolderVideos now shown on a separate route

// dynamic random sample of 4 videos across all folders
import { getAllVideosFlat } from '@/utils/portfolioData'

function pickRandomVideos(count){
  const all = getAllVideosFlat()
  if(all.length <= count) return all
  // Fisher–Yates partial shuffle for first count
  for(let i=0;i<count;i++){
    const r = i + Math.floor(Math.random() * (all.length - i))
    ;[all[i], all[r]] = [all[r], all[i]]
  }
  return all.slice(0,count)
}

const initialRandom = pickRandomVideos(4)

export default {
  name: 'PortfolioPage',
  components: { PortfolioHero, VideoExamples, PortfolioFolders, PortfolioCTA },
  setup() {
    const router = useRouter()
    const folderItems = computed(()=>{
      const list = t('folders', [])
      if(Array.isArray(list)) return list
      return []
    })
    const foldersAnchor = ref(null)
    function onSelectFolder(f){
      router.push({ name:'PortfolioFolder', params:{ key:f.key } })
    }
    // build translated alt text on the fly via computed mapping for current language
    const videoItems = computed(()=>{
      const pattern = t('portfolioUI?.videoAltPattern','Video {index}') || t('portfolioUI.videoAltPattern','Video {index}')
      return initialRandom.map((v,i)=>({
        ...v,
        alt: pattern.replace('{label}', t('portfolioPage.examples.video','Видео')).replace('{index}', v.index || (i+1))
      }))
    })
    return { videoItems, folderItems, onSelectFolder, foldersAnchor }
  }
}
</script>

<style scoped>
.portfolio-page{--pad:clamp(1.25rem,4vw,3.2rem);color:#2c2c2c;background:#fff}
:deep(.reveal){opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s cubic-bezier(.4,.16,.2,1)}
:deep(.reveal.is-visible){opacity:1;transform:none}
</style>
