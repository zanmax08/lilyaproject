<template>
  <section class="portfolio-hero" v-reveal>
    <div class="ph-inner">
      <div class="ph-left" v-reveal="{mode:'left',delay:40}">
        <div class="hero-image-frame">
          <img :src="image" alt="public/lilyaPF.JPG" class="hero-image" />
        </div>
      </div>
      <div class="ph-content" v-reveal="{mode:'up',delay:120}">
        <h1 class="ph-title">
          <span class="ph-line-1 accent">{{ t('portfolioPage.hero.ugc') }}</span>
          <span class="ph-line-2">{{ t('portfolioPage.hero.portfolio') }}</span>
        </h1>
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
/* Desktop/container layout */
.ph-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:clamp(200px,27%,300px) 1fr;gap:clamp(1.6rem,3.6vw,2.8rem);align-items:flex-start;min-height:520px}
/* Fluid hero height + center on mobile similar to Home */
@media (max-width:960px){
  .portfolio-hero{height:calc(100vh - var(--mobile-header-h) - env(safe-area-inset-top,0px));display:flex;align-items:center;padding:2.2rem 1.15rem 2.4rem;border-radius:0 0 42px 42px/0 0 42px 42px}
  .ph-inner{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:1.9rem;max-width:760px}
  .ph-content{align-items:center}
  .ph-title{margin-bottom:.6rem}
}
@media (max-width:640px){
  .portfolio-hero{padding:2rem 1rem 2.2rem}
  .ph-inner{gap:1.65rem}
  .ph-title{font-size:clamp(1.9rem,8.4vw,2.4rem)}
}
@media (max-width:480px){
  .portfolio-hero{padding:1.8rem .9rem 2rem;border-radius:0 0 38px 38px/0 0 38px 38px}
  .ph-title{font-size:clamp(1.75rem,9vw,2.15rem)}
}
@media (max-width:360px){
  .portfolio-hero{padding:1.65rem .75rem 1.9rem}
  .ph-inner{gap:1.45rem}
  .hero-image-frame{max-width:clamp(200px,70vw,250px)}
  .ph-title{font-size:clamp(1.62rem,9.4vw,2rem)}
  .ph-p{font-size:.9rem}
}
@media (max-width:340px){
  .portfolio-hero{padding:1.55rem .68rem 1.85rem}
  .hero-image-frame{max-width:clamp(185px,72vw,230px)}
  .ph-title{font-size:clamp(1.55rem,9.6vw,1.9rem)}
  .ph-p{font-size:.88rem}
}
/* Image frame adaptive scaling */
.hero-image-frame{background:#fff;border-radius:26px;overflow:hidden;box-shadow:0 10px 28px -12px rgba(0,0,0,.18),0 4px 10px -4px rgba(0,0,0,.06);border:1px solid #eadfd6;width:100%;max-width:clamp(240px,30vw,320px);aspect-ratio:3/4;display:flex;position:relative;margin:0;transition:box-shadow .6s}
.hero-image{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:transform .8s cubic-bezier(.4,.16,.2,1)}
.hero-image-frame:hover .hero-image{transform:scale(1.025)}
@media (min-width:961px){
  .hero-image-frame{max-width:clamp(260px,28vw,360px)}
}
@media (max-width:780px){
  .hero-image-frame{margin:0 auto 1.2rem;max-width:clamp(220px,54vw,300px)}
}
.ph-content{display:flex;flex-direction:column}
.ph-title{font-size:clamp(2.15rem,4.4vw,3.05rem);margin:0 0 1.1rem;line-height:1.05;font-weight:700;letter-spacing:.4px}
.ph-title .accent{background:linear-gradient(90deg,#1f1f1f,#5c5c5c);-webkit-background-clip:text;background-clip:text;color:transparent}
/* New two-line structure for hero title */
.ph-title .ph-line-1{display:inline-block;white-space:nowrap}
.ph-title .ph-line-2{display:block;font-weight:350;opacity:.82;text-transform:uppercase;letter-spacing:1.6px;margin-top:.18rem}
.ph-p{margin:.55rem 0;max-width:60ch;font-size:clamp(.93rem,1.02vw,1rem);line-height:1.5}
.ph-p:first-of-type{margin-top:.2rem}
@media (min-width:1180px){.ph-p{max-width:58ch}}
@media (max-width:780px){
  .ph-title{font-size:clamp(2rem,8vw,2.6rem)}
  .ph-p{font-size:.96rem}
  .ph-title .ph-line-2{letter-spacing:1.2px}
}
@media (prefers-reduced-motion:no-preference){.ph-title{animation:fadeSlide .7s .12s both}}
@keyframes fadeSlide{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
</style>
