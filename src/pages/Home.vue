<template>
  <div class="home">
    <section class="hero hero-pink hero-bg" v-reveal:fade>
      <div class="hero-inner with-photo">
        <div class="hero-left" v-reveal="{mode:'left',delay:80}">
          <h1 class="hero-title" v-html="t('homeHero.title_line1') + '<br/>' + t('homeHero.title_line2')" v-reveal="{mode:'up',delay:140}"></h1>
          <h3 class="hero-sub" v-html="t('homeHero.subtitle')" v-reveal="{mode:'up',delay:220}"></h3>
          <div class="hero-cta" v-reveal="{mode:'up',delay:320}">
            <router-link to="/portfolio" class="btn large hover-pop"><span>{{ t('homeHero.cta_portfolio') }}</span></router-link>
          </div>
        </div>
        <div class="hero-photo-arch" v-reveal="{mode:'right',delay:160}">
          <div class="arch-frame big">
            <div class="arch-inner">
              <img :src="liliaPhoto" alt="Liliia" />
            </div>
            <div class="arch-base"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Intro / Screens section (Hi I'm Liliia) -->
  <section class="intro-screens" v-reveal:fade>
      <div class="intro-inner">
        <div class="phones">
          <div class="phone phone-left" v-reveal="{mode:'left',delay:80}">
            <img src="https://testugclilia.my.canva.site/_assets/media/c38a4d06143c391d54af44f1cf1fe7aa.jpg" alt="phone1"/>
          </div>
          <div class="phone phone-right" v-reveal="{mode:'right',delay:160}">
            <img src="https://testugclilia.my.canva.site/_assets/media/04102cf21808b6cb0058c8d1b202bcb0.jpg" alt="phone2"/>
          </div>
        </div>
  <div class="intro-text" v-reveal="{mode:'up',delay:120}">
          <h2 v-html="t('intro.heading')"></h2>
          <div class="intro-multiline">
            <p v-for="(p,i) in t('intro.paragraphs')" :key="i" v-html="p" v-reveal="{mode:'up',delay: (i*120)+100 }"></p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Specialties Section -->
  <section class="specialties" v-reveal:fade>
  <h2 class="spec-heading" v-reveal="{mode:'up',delay:80}">{{ t('specialties.heading') }}</h2>
      <div class="spec-features">
  <div class="spec-feature" v-for="(f,i) in t('specialties.features')" :key="i" v-reveal="{mode:'up',delay:(i*140)+60}">
          <h3 class="spec-ft-title">{{ f.title }}</h3>
          <p class="spec-ft-desc">{{ f.desc }}</p>
        </div>
      </div>
      <div class="spec-main">
  <div class="spec-photo-wrap" v-reveal="{mode:'left',delay:120}">
          <div class="spec-photo-circle">
            <img :src="liliaPhoto" alt="" />
          </div>
        </div>
        <div class="spec-text-block" v-reveal="{mode:'right',delay:180}">
          <p class="spec-lead" v-reveal="{mode:'up',delay:240}">{{ t('specialties.lead') }}</p>
          <router-link to="/contact" class="btn spec-cta hover-pop" v-reveal="{mode:'up',delay:340}">{{ t('specialties.cta') }}</router-link>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>
import { t } from '../i18n'
import liliaPhotoUrl from '/liliaGL.PNG?url'

export default {
  data(){
    return { liliaPhoto: liliaPhotoUrl }
  },
  computed: {
    t() { return t },
    lead() { return t('hero.lead') },
    specHeading(){ return t('specialties.heading') },
    specFeatures(){ return t('specialties.features') || [] },
    specLead(){ return t('specialties.lead') },
    specCta(){ return t('specialties.cta') }
  }
}
</script>

<style scoped>
.hero-pink{position:relative;padding:1.8rem 0 2.2rem;background:var(--header-gradient);color:#fff;overflow:hidden}
@media (max-width:960px){
  /* Lock hero exactly to viewport minus mobile header height and safe-area and center */
  .hero-pink{height:calc(100vh - var(--mobile-header-h) - env(safe-area-inset-top,0px));min-height:auto;display:flex;align-items:center;overflow:hidden}
  .hero-inner{justify-content:center;align-items:center;text-align:center}
  .hero-left{align-items:center;display:flex;flex-direction:column}
  .hero-title,.hero-sub{width:100%;}
  .hero-cta{width:100%;display:flex;justify-content:center}
}
/* wave decorative overlay */
.hero-bg::before{content:"";position:absolute;inset:0;background:url(/glscreen.png) left bottom/auto 120% no-repeat;opacity:.85;pointer-events:none;mix-blend-mode:screen}

.hero-inner{max-width:1700px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:4rem;padding:3rem 3.5rem}
.hero-inner.with-photo{min-height:520px}
.hero-left{flex:1;max-width:900px;z-index:1}
.hero-title{font-size:6rem;line-height:.92;margin:0 0 1.2rem;font-weight:800;letter-spacing:.5px}
.hero-sub{font-size:2.4rem;margin:0 0 2.6rem;font-weight:600}
.hero-cta .btn.large{position:relative;overflow:hidden;padding:1.05rem 3.2rem;border-radius:56px;background:linear-gradient(90deg,#fff4ea 0%,#ffd7f2 40%,#ffc8ec 60%,#ffbde5 100%);background-size:200% 100%;background-position:0 0;color:#111;font-weight:700;letter-spacing:.5px;box-shadow:0 4px 18px -4px rgba(0,0,0,.15);transition:background-position .6s ease,transform .42s cubic-bezier(.16,.8,.3,1),box-shadow .4s;will-change:transform,background-position;transform-origin:center center}
.hero-cta .btn.large span{position:relative}
/* Glow layer */
/* (Glow removed) */
/* Hover / focus visible bigger zoom */
.hero-cta .btn.large:hover,
.hero-cta .btn.large:focus-visible{background-position:100% 0;transform:scale(1.12);box-shadow:0 14px 38px -10px rgba(0,0,0,.32)}
/* Show glow */
/* (Glow activation removed) */
/* Active (pressed) slightly less scale to give tap feedback */
.hero-cta .btn.large:active{transform:scale(1.08);transition-duration:.2s}

/* Arch photo block */
.hero-photo-arch{width:540px;flex-shrink:0;display:flex;justify-content:flex-end;z-index:1}
.arch-frame.big{width:540px;height:540px;display:flex;flex-direction:column;padding:14px;background:linear-gradient(180deg,#fdebe4,#f8dccf);border-radius:52% 52% 40px 40px/60% 60% 40px 40px;box-shadow:0 12px 40px -8px rgba(0,0,0,.18)}
.arch-inner{flex:1;overflow:hidden;border-radius:48% 48% 28px 28px/58% 58% 30px 30px;position:relative}
.arch-inner img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
.arch-base{display:none}

/* Responsive */
@media (max-width:1400px){
  .hero-title{font-size:5rem}
  .hero-sub{font-size:2rem}
  .hero-photo-arch{width:500px}
  .arch-frame.big{width:500px;height:500px}
}
@media (max-width:1100px){
  .hero-title{font-size:4rem}
  .hero-photo-arch{width:420px}
  .arch-frame.big{width:420px;height:420px}
}
@media (max-width:960px){
  .hero-inner{flex-direction:column;align-items:flex-start;gap:1.8rem;padding:2.2rem 1.15rem 2.4rem}
  /* unify hero rounded top on mobile */
  .hero-pink{border-radius:0 0 42px 42px/0 0 42px 42px}
  .hero-photo-arch{width:100%}
  .arch-frame.big{width:100%;height:380px;border-radius:40px;padding:12px}
  .arch-inner{border-radius:30px}
  .hero-title{font-size:2.75rem;margin-bottom:1rem}
  .hero-sub{font-size:1.4rem;margin:0 0 1.4rem}
  .arch-base{display:none}
}
@media (max-width:560px){
  .hero-title{font-size:2.05rem;line-height:1.02}
  .hero-sub{font-size:1.18rem}
  .hero-cta .btn.large{padding:.85rem 2rem}
}
@media (max-width:420px){
  .hero-inner{padding:2rem 1.15rem 2.4rem}
  .hero-title{font-size:1.92rem}
  .hero-sub{font-size:1.08rem;margin-bottom:1.2rem}
}
</style>

<style scoped>
/* Specialties Section */
.specialties{max-width:1700px;margin:0 auto;padding:3.5rem 3rem 4.5rem;position:relative}
.spec-heading{font-size:4.2rem;font-weight:300;text-align:center;margin:0 0 2.2rem;letter-spacing:.5px}
.spec-features{display:flex;justify-content:center;gap:4.5rem;flex-wrap:wrap;margin:0 0 3.5rem}
.spec-feature{max-width:340px;text-align:center}
.spec-ft-title{font-size:1.1rem;font-weight:500;margin:0 0 .6rem;letter-spacing:.5px}
.spec-ft-desc{margin:0;font-size:.98rem;line-height:1.35;color:#222}
.spec-main{display:flex;align-items:center;justify-content:center;gap:6rem;background:radial-gradient(circle at 22% 18%,#ffffff 0%,#faf5ff 35%,#f7f2ff 60%,#f5f3ff 78%,#ffffff 100%);border-radius:120px;padding:5rem 6rem;position:relative;overflow:hidden}
.spec-photo-wrap{flex:0 0 auto}
.spec-photo-circle{width:520px;height:520px;border-radius:50%;overflow:hidden;position:relative;box-shadow:0 12px 60px -18px rgba(0,0,0,.25)}
.spec-photo-circle img{width:100%;height:100%;object-fit:cover;display:block}
.spec-text-block{max-width:640px;display:flex;flex-direction:column;align-items:center;gap:3.2rem}
.spec-lead{font-size:2rem;line-height:1.28;font-weight:400;text-align:center;letter-spacing:1.5px;margin:0}
.spec-cta{display:inline-block;padding:1.05rem 3.4rem;border-radius:54px;background:linear-gradient(90deg,#fff4ea 0%,#ffd7f2 40%,#ffc8ec 60%,#ffbde5 100%);border:4px solid rgba(216,134,186,0.55);font-weight:500;letter-spacing:2px;font-size:1.65rem;color:#111;text-decoration:none;transition:.45s cubic-bezier(.16,.8,.3,1);box-shadow:0 4px 22px -6px rgba(0,0,0,.2)}
.spec-cta:hover{transform:scale(1.07);box-shadow:0 14px 38px -10px rgba(0,0,0,.32)}
.spec-cta:active{transform:scale(1.02)}

@media (max-width:1500px){
  .spec-photo-circle{width:470px;height:470px}
  .spec-main{gap:5rem;padding:4.5rem 5rem}
}
@media (max-width:1250px){
  .spec-photo-circle{width:420px;height:420px}
  .spec-main{gap:4rem;padding:4rem 4rem;border-radius:90px}
  .spec-heading{font-size:3.6rem}
  .spec-lead{font-size:1.8rem}
}
@media (max-width:1080px){
  .spec-photo-circle{width:380px;height:380px}
  .spec-main{gap:3rem;padding:3.5rem 3rem}
  .spec-heading{font-size:3.4rem}
  .spec-lead{font-size:1.65rem}
}
@media (max-width:960px){
  .spec-main{flex-direction:column;gap:2.8rem;padding:3.2rem 2.4rem;border-radius:70px}
  .spec-photo-circle{width:460px;height:460px}
  .spec-text-block{gap:2.4rem}
  .spec-lead{font-size:1.55rem;letter-spacing:1.2px}
  .spec-cta{font-size:1.4rem;padding:.95rem 2.8rem}
}
@media (max-width:640px){
  .specialties{padding:2.6rem 1.2rem 3.4rem}
  .spec-features{gap:2rem;margin-bottom:2.8rem}
  .spec-heading{font-size:2.8rem;margin-bottom:1.4rem}
  .spec-photo-circle{width:340px;height:340px}
  .spec-main{padding:2.4rem 1.4rem;border-radius:50px}
  .spec-lead{font-size:1.35rem}
  .spec-cta{font-size:1.2rem;padding:.85rem 2.2rem;letter-spacing:1.2px}
}
@media (max-width:420px){
  .spec-photo-circle{width:280px;height:280px}
  .spec-heading{font-size:2.4rem}
  .spec-lead{font-size:1.22rem}
}
/* Mobile section rounding unify */
@media (max-width:900px){
  .intro-screens{border-radius:42px 42px 42px 42px/42px 42px 42px 42px;margin:1.2rem 1rem 0;padding:2.4rem 1.6rem 2.8rem;background:linear-gradient(180deg,#ffffff,#f9f4ff)}
}
@media (max-width:640px){
  .intro-screens{border-radius:36px;margin:1rem 1rem 0;padding:2.2rem 1.3rem 2.4rem}
}
@media (max-width:480px){
  .intro-screens{border-radius:30px;margin:.85rem .85rem 0;padding:2rem 1.1rem 2.2rem}
  .specialties{border-radius:36px 36px 0 0;margin:2.2rem 0 0;padding:2.4rem 1rem 3.2rem;background:linear-gradient(180deg,#ffffff,#fbf7ff)}
}
</style>
