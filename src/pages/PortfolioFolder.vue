<template>
  <div class="portfolio-folder-page">
    <FolderVideos v-if="folderKey && videos.length" :folder="folderKey" :videos="videos" />
  <div v-else class="pf-empty">{{ t('portfolioUI.notFound', 'Not found') }}</div>
  <PortfolioFolders class="pf-secondary" :folders="otherFolders" :headingTop="t('portfolioUI.moreFoldersTop','MORE')" :headingBottom="t('portfolioUI.moreFoldersBottom','FOLDERS')" @select="goFolder" />
  </div>
</template>
<script>
import { computed } from 'vue'
import { t } from '@/i18n'
import { useRoute, useRouter } from 'vue-router'
import FolderVideos from '@/components/portfolio/FolderVideos.vue'
import PortfolioFolders from '@/components/portfolio/PortfolioFolders.vue'
import { buildFolderVideos, resolveFolderByKey, getFolderItems } from '@/utils/portfolioData'

const allVideos = buildFolderVideos()

export default {
  name:'PortfolioFolderPage',
  components:{ FolderVideos, PortfolioFolders },
  setup(){
    const route = useRoute()
    const router = useRouter()
    const folderKey = computed(()=> route.params.key )
    const videos = computed(()=> allVideos[folderKey.value] || [])
    const allFolders = getFolderItems()
    const otherFolders = computed(()=> allFolders.filter(f => f.key !== folderKey.value))
    function goBack(){ router.push('/portfolio') }
    function goFolder(f){
      router.push({ name:'PortfolioFolder', params:{ key:f.key } })
      // scroll to top of page after navigation
      setTimeout(()=>{ window.scrollTo({ top:0, behavior:'smooth'}) }, 40)
    }

    // If invalid key -> show not found quickly or redirect
    if(!resolveFolderByKey(folderKey.value)){
      // Could redirect but for now leave message
    }

    return { folderKey, videos, goBack, otherFolders, goFolder, t }
  }
}
</script>
<style scoped>
.portfolio-folder-page{--pad:clamp(1.25rem,4vw,3.2rem);padding:var(--pad);min-height:100vh;background:#fff}
.pf-empty{padding:2rem 0;font-size:1rem;opacity:.7}
.pf-secondary{margin-top:2rem}
</style>
