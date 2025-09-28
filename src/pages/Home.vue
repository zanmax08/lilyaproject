<template>
  <div class="home">
    <section class="hero hero-pink hero-bg">
      <div class="hero-inner with-photo">
        <div class="hero-left">
          <h1 class="hero-title">Liliia | Kids UGC<br/>Mom Mentor</h1>
          <h3 class="hero-sub">&amp; Home Creator</h3>
          <div class="hero-cta">
            <router-link to="/portfolio" class="btn large"><span>VIEW PORTFOLIO</span></router-link>
          </div>
        </div>
        <div class="hero-photo-arch">
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
    <section class="intro-screens">
      <div class="intro-inner">
        <div class="phones">
          <div class="phone phone-left">
            <img src="https://testugclilia.my.canva.site/_assets/media/c38a4d06143c391d54af44f1cf1fe7aa.jpg" alt="phone1"/>
          </div>
          <div class="phone phone-right">
            <img src="https://testugclilia.my.canva.site/_assets/media/04102cf21808b6cb0058c8d1b202bcb0.jpg" alt="phone2"/>
          </div>
        </div>
        <div class="intro-text">
          <h2>Hi I'm <strong>Liliia</strong> - viral<br/>content expert</h2>
          <div class="intro-multiline">
            <p>— UGC Kids. The first expert in content
for child-focused brands.</p>

            <p>— i create selling videos for
brands.</p>

            <p><strong>5M+ views.</strong>

Organic
growth for brands.</p>

            <p>— UGC Kids — Helping moms earn with

content.</p>
          </div>
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
    lead() { return t('hero.lead') }
  }
}
</script>

<style scoped>
.hero-pink{position:relative;padding:2.2rem 0 2.5rem;background:var(--header-gradient);color:#fff;overflow:hidden}
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
  .hero-inner{flex-direction:column;align-items:flex-start;gap:2.2rem;padding:3rem 2rem}
  .hero-photo-arch{width:100%}
  .arch-frame.big{width:100%;height:380px;border-radius:40px;padding:12px}
  .arch-inner{border-radius:30px}
  .hero-title{font-size:3rem}
  .hero-sub{font-size:1.5rem;margin-bottom:1.8rem}
  .arch-base{display:none}
}
@media (max-width:560px){
  .hero-title{font-size:2.25rem}
  .hero-sub{font-size:1.25rem}
  .hero-cta .btn.large{padding:.9rem 2.2rem}
}
</style>
