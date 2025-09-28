<template>
  <div class="home">
    <section class="hero hero-pink">
      <div class="hero-inner">
        <div class="hero-left">
          <h1 class="hero-title">Liliia | Kids UGC<br/>Mom Mentor</h1>
          <h3 class="hero-sub">&amp; Home Creator</h3>
          <div class="hero-cta">
            <router-link to="/portfolio" class="btn large">VIEW PORTFOLIO</router-link>
          </div>
        </div>

        <div class="hero-right">
          <div class="arch-frame">
            <div class="arch-inner">
              <img src="https://testugclilia.my.canva.site/_assets/media/489875f501d97026bd993eb6b575692a.jpg" alt="portrait" />
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

export default {
  computed: {
    t() { return t },
    lead() { return t('hero.lead') }
  }
}
</script>

<style scoped>

.hero-pink{padding:2.5rem 0;background:var(--header-gradient);color:#fff;position:relative}
.hero-inner{max-width:1600px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:2rem;padding:4rem 2rem}
.hero-left{flex:1;max-width:900px}
.hero-title{font-size:6.2rem;line-height:0.9;margin:0 0 0.6rem;font-weight:900}
.hero-sub{font-size:2rem;margin:0 0 1.8rem;color:#fff;opacity:0.95}
.hero-cta{margin-top:1.5rem}
.btn.large{padding:1rem 2.5rem;border-radius:48px;background:linear-gradient(90deg,#fff1f8,#ffdff3);color:#111;font-weight:700}
.hero-right{width:520px;flex-shrink:0;display:flex;justify-content:flex-end}
.arch-frame{width:520px;height:520px;border-radius:50% 50% 0 0/60% 60% 0 0;overflow:hidden;padding:10px;background:linear-gradient(180deg,#f7e3e9,#f8e6df)}
.arch-inner{width:100%;height:calc(100% - 36px);overflow:hidden;border-radius:40% 40% 10% 10%/50% 50% 10% 10%;background:transparent}
.arch-inner img{width:100%;height:100%;object-fit:cover;display:block}
.arch-base{height:36px;background:#fbeeea;margin-top:8px;border-radius:0 0 10px 10px}

@media (max-width:1100px){
  .hero-title{font-size:4.2rem}
  .arch-frame{width:420px;height:420px}
}

@media (max-width:900px){
  .hero-inner{flex-direction:column;align-items:flex-start}
  .hero-right{width:100%;order:2}
  .arch-frame{width:100%;height:320px;border-radius:20px}
  .hero-title{font-size:2rem}
  .hero-sub{font-size:1.1rem}
}

@media (max-width:1000px){
  .hero-inner{flex-direction:column;align-items:flex-start}
  .hero-portrait{width:100%;order:2}
  .arch{width:100%;height:260px;border-radius:20px}
  .hero-title{font-size:2rem}
}

@media (max-width:640px){
  .hero-title{font-size:1.5rem}
  .examples-grid img{height:140px}
}
</style>
