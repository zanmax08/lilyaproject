<template>
  <div class="stats-proof-page">
    <section class="sp-hero" v-reveal>
      <h1 class="sp-title" v-reveal="{mode:'up',delay:60}">{{ t('statsProof.heading') }}</h1>
      <p class="sp-tagline" v-reveal="{mode:'up',delay:140}" v-text="t('statsProof.tagline')"></p>
      <ul class="sp-metrics" v-reveal="{mode:'up',delay:200}">
        <li v-for="(m,i) in page.metrics" :key="i" v-text="m"></li>
      </ul>
      <p class="sp-mini" v-reveal="{mode:'up',delay:260}" v-text="t('statsProof.miniSignature')"></p>
    </section>
    <section class="sp-grid-section" v-if="images.length" v-reveal>
      <div class="sp-grid">
        <figure v-for="(img,i) in images" :key="img.src" class="sp-item" @click="open(img,i)">
          <img :src="img.src" :alt="img.alt || ('Shot '+(i+1))" loading="lazy" decoding="async" @error.stop="removeBroken(i)" />
          <figcaption v-if="img.caption" v-text="img.caption"></figcaption>
        </figure>
      </div>
    </section>
    <section v-else class="sp-empty" v-reveal>
      <p class="sp-empty-text">No proof screenshots loaded. Add files to <code>public/proof</code> or update explicit list.</p>
    </section>
    <div v-if="viewer" class="sp-viewer" @click.self="closeViewer">
      <div class="sp-viewer-inner" v-reveal="{mode:'up'}">
        <button class="sp-close" @click="closeViewer" aria-label="close">×</button>
        <img :src="viewer.src" :alt="viewer.alt" />
        <p class="sp-cap" v-if="viewer.caption" v-text="viewer.caption"></p>
        <div class="sp-nav" v-if="images.length>1">
          <button @click.stop="prev" aria-label="prev">‹</button>
          <button @click.stop="next" aria-label="next">›</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { t } from '@/i18n'
import { getStatsProofImages, getStatsMetrics } from '@/utils/statsProofData'
import { ref } from 'vue'

export default {
  name:'StatsProofPage',
  setup(){
  const images = ref(getStatsProofImages())
    const metrics = getStatsMetrics()
    const page = { metrics }
    const viewer = ref(null)
    function open(img,i){ viewer.value = { ...img, i } }
    function closeViewer(){ viewer.value = null }
    function prev(){ if(!viewer.value) return; const i=(viewer.value.i-1+images.value.length)%images.value.length; viewer.value={ ...images.value[i], i } }
    function next(){ if(!viewer.value) return; const i=(viewer.value.i+1)%images.value.length; viewer.value={ ...images.value[i], i } }
    function removeBroken(index){
      if(!images.value[index]) return
      images.value.splice(index,1)
      if(viewer.value && viewer.value.i === index) viewer.value = null
    }
    return { t, images, page, viewer, open, closeViewer, prev, next, removeBroken }
  }
}
</script>
<style scoped>
.stats-proof-page{--pad:clamp(1.25rem,4vw,3rem);color:#222;display:flex;flex-direction:column;gap:3.2rem;padding:1.2rem 0 3.2rem;background:#fff}
.sp-hero{max-width:1100px;margin:0 auto;padding:2.6rem var(--pad) 2.2rem;display:flex;flex-direction:column;gap:1.6rem;background:linear-gradient(180deg,#faf5ff,#f5ecff);border-radius:48px}
.sp-title{margin:0;font-size:clamp(2.4rem,5vw,3.4rem);font-weight:700;letter-spacing:.5px}
.sp-tagline{margin:0;font-size:1.05rem;opacity:.85;max-width:640px}
.sp-metrics{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:.75rem 1.4rem;font-size:.9rem}
.sp-metrics li{background:#fff;border:1px solid #eadff6;padding:.55rem .9rem;border-radius:30px;box-shadow:0 2px 6px -2px rgba(0,0,0,.08)}
.sp-mini{margin:.3rem 0 0;font-size:.8rem;letter-spacing:1px;text-transform:uppercase;font-weight:600;opacity:.75}
.sp-grid-section{max-width:1300px;margin:0 auto;padding:0 var(--pad)}
.sp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.6rem;align-items:start}
.sp-item{position:relative;background:#f3eef9;border:1px solid #e3d7f5;border-radius:20px;overflow:hidden;cursor:pointer;box-shadow:0 6px 20px -8px rgba(0,0,0,.15);transition:.4s}
.sp-item:hover{transform:translateY(-4px);box-shadow:0 12px 30px -10px rgba(0,0,0,.22)}
.sp-item img{width:100%;height:100%;object-fit:cover;display:block;aspect-ratio:3/4}
.sp-item figcaption{position:absolute;left:0;bottom:0;right:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.55));color:#fff;font-size:.65rem;padding:.4rem .55rem;text-shadow:0 1px 2px rgba(0,0,0,.5)}
/* Viewer */
.sp-viewer{position:fixed;inset:0;background:rgba(20,10,35,.75);display:flex;align-items:center;justify-content:center;z-index:300;padding:1.4rem}
.sp-viewer-inner{position:relative;background:#120d16;border:1px solid #3a2d55;max-width:min(90vw,1000px);max-height:90vh;width:100%;display:flex;flex-direction:column;align-items:center;gap:1rem;padding:1.6rem;border-radius:28px;box-shadow:0 20px 60px -18px rgba(0,0,0,.55)}
.sp-viewer-inner img{max-width:100%;max-height:70vh;object-fit:contain}
.sp-close{position:absolute;top:.6rem;right:.6rem;background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:10px;padding:.4rem .75rem;font-size:1.2rem;cursor:pointer}
.sp-close:hover{background:rgba(255,255,255,.18)}
.sp-nav{display:flex;gap:1.2rem}
.sp-nav button{background:#2e2340;color:#fff;border:1px solid #493a61;border-radius:12px;padding:.55rem 1.1rem;font-size:1.1rem;cursor:pointer;transition:.3s}
.sp-nav button:hover{background:#3b2b55}
.sp-cap{margin:0;font-size:.8rem;opacity:.85;max-width:640px;text-align:center}
.sp-empty{max-width:900px;margin:0 auto;padding:0 var(--pad)}
.sp-empty-text{background:#f6f1ff;border:1px dashed #c9b4e9;padding:1.2rem 1.4rem;border-radius:18px;font-size:.9rem;color:#4a3d60}
@media (max-width:900px){
  .sp-metrics{flex-direction:column;align-items:flex-start}
  .sp-hero{border-radius:40px;padding:2.2rem var(--pad) 1.9rem}
  .sp-grid{gap:1.2rem}
}
@media (max-width:560px){
  .sp-grid{grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem}
  .sp-item{border-radius:22px}
  .sp-item img{aspect-ratio:9/16}
  .sp-item figcaption{font-size:.6rem}
  .sp-hero{border-radius:32px}
}
</style>
