<template>
  <section class="portfolio-hero" v-reveal>
    <div class="ph-inner">
      <div class="ph-left" v-reveal="{mode:'left',delay:40}">
        <div class="hero-image-frame">
          <img :src="image" alt="public/lilyaPF.JPG" class="hero-image" />
        </div>
      </div>
      <div class="ph-content" v-reveal="{mode:'up',delay:120}">
        <h1 class="ph-title"><span class="accent">{{ t('portfolioPage.hero.ugc') }}</span><br/><em>{{ t('portfolioPage.hero.portfolio') }}</em></h1>
        <p v-for="(p,i) in t('portfolioPage.hero.paragraphs')" :key="i" class="ph-p" v-html="p" />
      </div>
    </div>
  </section>
</template>
<script>
import { t } from '@/i18n'
import { resolveImg } from '@/utils/image'
export default {
  name:'PortfolioHero',
  props:{
  // Use the static file from public (served at /lilyaPF.JPG). If you later move it to src/assets, switch back to resolveImg.
  image:{ type:String, default:()=> '/lilyaPF.JPG' }
  },
  computed:{ t(){ return t } }
}
</script>
<style scoped>
.portfolio-hero{--pad:clamp(1.25rem,3.6vw,3rem);position:relative;color:#2c2c2c;background:
  radial-gradient(circle at 50% 0%,rgba(200,160,140,.32),rgba(255,255,255,0) 68%),
  linear-gradient(180deg,#ffffff 0%,#fbf8f6 100%);
  padding:calc(var(--pad)*2.1) var(--pad) calc(var(--pad)*1.6);overflow:hidden}
.ph-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:clamp(200px,27%,300px) 1fr;gap:clamp(1.6rem,3.6vw,2.8rem);align-items:flex-start}
@media (max-width:940px){.ph-inner{max-width:900px;grid-template-columns:clamp(180px,32%,260px) 1fr}}
@media (max-width:780px){.ph-inner{grid-template-columns:1fr;max-width:640px}}
.hero-image-frame{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 28px -12px rgba(0,0,0,.18),0 4px 10px -4px rgba(0,0,0,.06);border:1px solid #eadfd6;width:100%;max-width:320px;aspect-ratio:3/4;display:flex;position:relative;margin:0}
.hero-image{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s cubic-bezier(.4,.16,.2,1)}
.hero-image-frame:hover .hero-image{transform:scale(1.025)}
.ph-content{display:flex;flex-direction:column}
.ph-title{font-size:clamp(2.15rem,4.4vw,3.05rem);margin:0 0 1.1rem;line-height:1.05;font-weight:700;letter-spacing:.4px}
.ph-title .accent{background:linear-gradient(90deg,#1f1f1f,#5c5c5c);-webkit-background-clip:text;background-clip:text;color:transparent}
.ph-title em{font-style:normal;font-weight:350;opacity:.78}
.ph-p{margin:.55rem 0;max-width:60ch;font-size:clamp(.93rem,1.02vw,1rem);line-height:1.5}
.ph-p:first-of-type{margin-top:.2rem}
@media (min-width:1180px){.ph-p{max-width:58ch}}
@media (max-width:780px){.hero-image-frame{margin:0 auto 1.4rem}.ph-title{font-size:clamp(2rem,8vw,2.6rem)}.ph-p{font-size:.96rem}}
@media (prefers-reduced-motion:no-preference){.ph-title{animation:fadeSlide .7s .12s both}}
@keyframes fadeSlide{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
</style>
