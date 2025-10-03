<template>
  <div class="portfolio-page screen-fit">
    <PortfolioHero />
    <VideoExamples :items="videoItems" />
    <section class="formats" v-if="formats && formats.items && formats.items.length" v-reveal>
      <div class="fm-inner">
        <h2 class="fm-heading" v-reveal="{mode:'up',delay:60}" v-text="formats.heading"></h2>
        <ul class="fm-list" v-reveal="{mode:'up',delay:140}">
          <li v-for="(f,i) in formats.items" :key="i" v-text="f"></li>
        </ul>
      </div>
    </section>
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
import { buildFolderVideos } from '@/utils/portfolioData'
// Use only curated videoEX examples (full set) without randomness
const curatedExamples = buildFolderVideos().videoEX || []

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
      return curatedExamples.map((v,i)=>({
        ...v,
        alt: pattern.replace('{label}', t('portfolioPage.examples.video','Video')).replace('{index}', v.index || (i+1))
      }))
    })
    const formats = computed(()=> t('portfolioPage.formats', null) || null )
    return { videoItems, folderItems, onSelectFolder, foldersAnchor, formats }
  }
}
</script>

<style scoped>
.portfolio-page{--pad:clamp(1.25rem,4vw,3.2rem);color:#2c2c2c;background:#fff;padding-top:1.2rem;padding-bottom:2.4rem;display:flex;flex-direction:column;gap:2.8rem}
@media (max-width:900px){
  .portfolio-page{padding-top:1rem;padding-left:1rem;padding-right:1rem;gap:2.2rem}
}
@media (max-width:560px){
  .portfolio-page{padding-top:.75rem;gap:1.9rem}
}
:deep(.reveal){opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s cubic-bezier(.4,.16,.2,1)}
:deep(.reveal.is-visible){opacity:1;transform:none}

/* Formats Section */
.formats{--pad:clamp(1.25rem,4vw,3.2rem);padding:0 var(--pad);}
.fm-inner{max-width:1100px;margin:0 auto;background:linear-gradient(180deg,#fbf8f6,#f5f1ee);border:1px solid #efe4da;padding:3rem clamp(1.2rem,3vw,2.2rem);border-radius:46px;box-shadow:0 10px 28px -14px rgba(0,0,0,.12),0 4px 10px -4px rgba(0,0,0,.06);display:flex;flex-direction:column;gap:1.8rem}
.fm-heading{margin:0;font-size:clamp(2rem,4.2vw,2.6rem);font-weight:300;letter-spacing:.6px;line-height:1.08;}
.fm-list{margin:0;padding:0;list-style:none;columns:2;column-gap:2.6rem;font-size:.95rem;line-height:1.5;max-width:880px}
.fm-list li{break-inside:avoid;padding:.25rem 0 .25rem 1.05rem;position:relative}
.fm-list li::before{content:"✦";position:absolute;left:0;top:.2rem;font-size:.75rem;color:#8b52d9}
@media (max-width:800px){
  .fm-list{columns:1}
  .fm-inner{padding:2.4rem 1.4rem}
}
@media (max-width:560px){
  .fm-heading{font-size:clamp(1.65rem,7vw,2.05rem)}
  .fm-list{font-size:.9rem}
}
</style>
