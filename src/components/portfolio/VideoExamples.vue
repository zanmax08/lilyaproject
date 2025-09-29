<template>
  <section class="video-examples" v-reveal>
    <div class="vx-inner">
      <div class="vx-header">
        <h2 class="vx-title" v-reveal="{mode:'left',delay:40}">
          <span>{{ t('portfolioPage.examples.video') }}</span> {{ t('portfolioPage.examples.examples') }}
        </h2>
        <div class="vx-text" v-reveal="{mode:'right',delay:120}" v-html="t('portfolioPage.examples.lead')"></div>
      </div>
      <div class="vx-grid" v-reveal="{mode:'up',delay:160}">
        <div v-for="(item,i) in items" :key="i" class="vx-item">
          <div class="thumb">
            <img :src="item.thumb" :alt="item.alt || (t('portfolioPage.examples.video') + ' ' + (i+1))" loading="lazy" />
            <button class="play" :aria-label="t('portfolioPage.examples.play')">▶</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { t } from '@/i18n'
export default { name:'VideoExamples', props:{ items:{type:Array,default:()=>[]} }, computed:{ t(){ return t } } }
</script>
<style scoped>
.video-examples{--pad:clamp(1.25rem,3.6vw,3rem);background:
  linear-gradient(180deg,#fbf8f6 0%,#f5efea 100%);
  padding:calc(var(--pad)*1.8) var(--pad) calc(var(--pad)*2.2);position:relative}
.vx-inner{max-width:1100px;margin:0 auto}
.vx-header{display:grid;grid-template-columns:minmax(240px,320px) 1fr;gap:2.4rem;margin:0 0 2.2rem;align-items:start}
@media (max-width:860px){.vx-header{grid-template-columns:1fr;gap:1.25rem}}
.vx-title{margin:0;font-size:clamp(2rem,4.4vw,2.6rem);line-height:1.06;letter-spacing:.4px;font-weight:650;display:flex;flex-wrap:wrap;gap:.5ch}
.vx-title span{font-weight:300;opacity:.85}
.vx-text{background:rgba(255,255,255,.55);padding:1rem 1.1rem;border-radius:12px;font-size:.9rem;line-height:1.45;border:1px solid #e7dace;backdrop-filter:blur(4px);box-shadow:0 6px 24px -10px rgba(0,0,0,.14);max-width:640px}
.vx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:1.4rem}
@media (min-width:640px){.vx-grid{grid-template-columns:repeat(auto-fill,minmax(170px,1fr))}}
.vx-item .thumb{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:9/16;background:linear-gradient(180deg,#c68fc1,#d6b0d2);box-shadow:0 6px 20px -8px rgba(0,0,0,.22);transition:transform .55s cubic-bezier(.16,.8,.3,1),box-shadow .55s}
.vx-item:hover .thumb{transform:translateY(-6px);box-shadow:0 14px 40px -12px rgba(0,0,0,.36)}
.vx-item img{width:100%;height:100%;object-fit:cover;display:block;opacity:.18;mix-blend-mode:luminosity;transition:opacity .6s}
.vx-item:hover img{opacity:.28}
.vx-item .play{position:absolute;inset:auto auto .55rem .55rem;background:rgba(255,255,255,.94);border:none;border-radius:999px;padding:.55rem .72rem;font-size:.78rem;cursor:pointer;font-weight:600;box-shadow:0 2px 6px -2px rgba(0,0,0,.3);transition:background .25s,transform .3s}
.vx-item .play:hover{background:#fff;transform:scale(1.1)}
@media (max-width:580px){.vx-item .thumb{aspect-ratio:9/15}}
</style>
