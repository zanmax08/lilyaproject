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

// simple static sample thumbnails (reuse placeholder path if needed)
const videoItems = Array.from({ length: 4 }).map((_, i) => ({ thumb: '/glscreen.png', alt: 'video ' + (i + 1) }))

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
    return { videoItems, folderItems, onSelectFolder, foldersAnchor }
  }
}
</script>

<style scoped>
.portfolio-page{--pad:clamp(1.25rem,4vw,3.2rem);color:#2c2c2c;background:#fff}
:deep(.reveal){opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s cubic-bezier(.4,.16,.2,1)}
:deep(.reveal.is-visible){opacity:1;transform:none}
</style>
