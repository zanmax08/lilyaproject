<template>
  <div class="portfolio-page">
    <PortfolioHero />
    <VideoExamples :items="videoItems" />
    <PortfolioCTA />
  </div>
</template>

<script>
import PortfolioHero from '@/components/portfolio/PortfolioHero.vue'
import VideoExamples from '@/components/portfolio/VideoExamples.vue'
import PortfolioCTA from '@/components/portfolio/PortfolioCTA.vue'

// simple static sample thumbnails (reuse placeholder path if needed)
const videoItems = Array.from({length:4}).map((_,i)=>({ thumb:'/'+'glscreen.png', alt:'video '+(i+1) }))

export default {
  name:'PortfolioPage',
  components:{ PortfolioHero, VideoExamples, PortfolioCTA },
  setup(){
    return { videoItems }
  }
}
</script>

<style scoped>
.portfolio-page{--pad:clamp(1.25rem,4vw,3.2rem);color:#2c2c2c;background:#fff}
:deep(.reveal){opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s cubic-bezier(.4,.16,.2,1)}
:deep(.reveal.is-visible){opacity:1;transform:none}
</style>
