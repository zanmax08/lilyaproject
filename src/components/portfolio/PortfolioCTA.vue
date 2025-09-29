<template>
  <section class="portfolio-cta" v-reveal>
    <div class="cta-inner">
      <h3 class="cta-heading" v-html="t('portfolioPage.cta.heading')" />
      <p class="cta-text" v-html="t('portfolioPage.cta.text')" />
      <router-link to="/contact" class="cta-btn">{{ t('portfolioPage.cta.button') }}</router-link>
    </div>
  </section>
</template>
<script>
import { t } from '@/i18n'
export default { name:'PortfolioCTA', computed:{ t(){ return t } } }
</script>
<style scoped>
.portfolio-cta{--pad:clamp(1.25rem,4vw,3.2rem);background:
 linear-gradient(180deg,#f5efea 0%,#ffffff 100%);
 padding:calc(var(--pad)*1.8) var(--pad) calc(var(--pad)*2.1);text-align:center;border-top:1px solid #ece4db}
.cta-inner{max-width:760px;margin:0 auto}
.cta-heading{font-size:clamp(1.9rem,4.4vw,2.7rem);margin:0 0 1rem;line-height:1.08;font-weight:700;letter-spacing:.5px}
.cta-heading span{background:linear-gradient(90deg,#222,#666);-webkit-background-clip:text;background-clip:text;color:transparent}
.cta-text{margin:0 0 1.4rem;font-size:clamp(.95rem,1.05vw,1rem);line-height:1.5}
.cta-btn{display:inline-block;background:#222;color:#fff;text-decoration:none;font-weight:600;padding:.9rem 1.6rem;border-radius:40px;font-size:.9rem;letter-spacing:.5px;transition:background .3s,transform .4s}
.cta-btn:hover{background:#444;transform:translateY(-3px)}
.cta-btn:active{transform:translateY(-1px)}
</style>
