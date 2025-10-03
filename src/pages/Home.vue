<template>
  <div class="home">
    <section class="hero hero-pink hero-bg" v-reveal:fade>
      <div class="hero-inner with-photo">
        <div class="hero-left" v-reveal="{mode:'left',delay:80}">
          <h1 class="hero-title" v-reveal="{mode:'up',delay:140}"><span class="title-line-1">{{ t('homeHero.title_line1') }}</span><span class="title-line-2">{{ t('homeHero.title_line2') }}</span></h1>
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
          <div v-if="hasCompact" class="spec-compact" v-reveal="{mode:'up',delay:240}">
            <div class="sc-columns">
              <div class="sc-col">
                <h4 class="sc-heading" v-text="t('specialties.compact.heading1')"></h4>
                <ul class="sc-list">
                  <li v-for="(r,i) in t('specialties.compact.reasons',[])" :key="'r'+i" v-text="r"></li>
                </ul>
              </div>
              <div class="sc-col">
                <h4 class="sc-heading" v-text="t('specialties.compact.heading2')"></h4>
                <ul class="sc-list">
                  <li v-for="(d,i) in t('specialties.compact.diffs',[])" :key="'d'+i" v-text="d"></li>
                </ul>
              </div>
            </div>
            <p class="sc-final" v-text="t('specialties.compact.final')"></p>
          </div>
          <p v-else class="spec-lead" v-reveal="{mode:'up',delay:240}" v-html="t('specialties.lead')"></p>
          <router-link to="/contact" class="btn spec-cta hover-pop" v-reveal="{mode:'up',delay: hasCompact ? 420 : 340}">{{ t('specialties.cta') }}</router-link>
        </div>
      </div>
    </section>
    
    <!-- Stats & Proof Section -->
    <section class="stats-proof" v-reveal:fade>
      <div class="sp-inner">
        <div class="sp-left" v-reveal="{mode:'left',delay:120}">
          <h3 class="sp-heading" v-text="t('statsProof.heading')"></h3>
          <ul class="sp-bullets" v-reveal="{mode:'up',delay:200}">
            <li v-for="(b,i) in t('statsProof.bullets',[])" :key="'b'+i" v-text="b"></li>
          </ul>
          <p class="sp-miniSignature" v-reveal="{mode:'up',delay:320}" v-text="t('statsProof.miniSignature')"></p>
        </div>
        <div class="sp-folder-wrap" v-reveal="{mode:'right',delay:180}">
          <router-link to="/stats-proof" class="sp-folder hover-pop">
            <div class="sp-folder-label">
              <strong v-text="t('statsProof.folderLabel')"></strong>
              <span class="sp-folder-mini" v-text="t('statsProof.tagline')"></span>
            </div>
          </router-link>
          <p class="sp-cta-hint no-arrow" v-text="t('statsProof.ctaHint')"></p>
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
    hasCompact(){
      const reasons = t('specialties.compact?.reasons') || t('specialties.compact.reasons')
      return Array.isArray(reasons) && reasons.length>0
    }
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

.hero-inner{max-width:1700px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:4rem;padding:3rem 3.5rem;overflow:hidden}
.hero-inner.with-photo{min-height:520px}
.hero-left{flex:1;max-width:900px;z-index:1;min-width:0}
.hero-title{font-size:6rem;line-height:.92;margin:0 0 1.2rem;font-weight:800;letter-spacing:.5px}
.hero-sub{font-size:2.4rem;margin:0 0 2.6rem;font-weight:600}
.hero-title,.hero-sub{overflow-wrap:break-word;word-break:break-word;hyphens:auto;max-width:100%;}
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
.hero-photo-arch{width:540px;flex-shrink:0;display:flex;justify-content:flex-end;z-index:1;min-width:0}
.arch-frame.big{width:540px;height:540px;display:flex;flex-direction:column;padding:14px;background:linear-gradient(180deg,#fdebe4,#f8dccf);border-radius:52% 52% 40px 40px/60% 60% 40px 40px;box-shadow:0 12px 40px -8px rgba(0,0,0,.18)}
.arch-inner{flex:1;overflow:hidden;border-radius:48% 48% 28px 28px/58% 58% 30px 30px;position:relative}
.arch-inner img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
/* Mobile: shift focal point slightly downward so верх кадра полностью виден */
@media (max-width:960px){
  .arch-inner img{object-position:center 12%;}
}
.arch-base{display:none}

/* Responsive */
@media (max-width:1400px){
  .hero-title{font-size:5rem}
  .hero-sub{font-size:2rem}
  .hero-photo-arch{width:500px}
  .arch-frame.big{width:500px;height:500px}
}
/* Cyrillic (ru) adjustments: slightly tighter size + relaxed line-height to avoid awkward syllable breaks */
html[lang='ru'] .hero-title{font-size:5.4rem;line-height:.95;word-break:normal}
@media (max-width:1400px){html[lang='ru'] .hero-title{font-size:4.6rem}}
@media (max-width:1100px){html[lang='ru'] .hero-title{font-size:4rem;line-height:.98}}
@media (max-width:960px){html[lang='ru'] .hero-title{font-size:2.65rem;line-height:1.02}}
@media (max-width:560px){html[lang='ru'] .hero-title{font-size:clamp(1.7rem,7vw,2rem)}}
@media (max-width:1100px){
  .hero-title{font-size:4rem}
  .hero-photo-arch{width:420px}
  .arch-frame.big{width:420px;height:420px}
}
/* Fluid adaptive sizing for hero photo on desktop (override fixed widths above) */
@media (min-width:961px){
  .hero-photo-arch,
  .arch-frame.big{width:clamp(360px,40vw,540px);height:clamp(360px,40vw,540px)}
}
@media (max-width:960px){
  .hero-inner{flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:1.8rem;padding:2.2rem 1.15rem 2.4rem}
  /* unify hero rounded top on mobile */
  .hero-pink{border-radius:0 0 42px 42px/0 0 42px 42px}
  .hero-left{display:flex;flex-direction:column;align-items:center}
  .hero-photo-arch{width:100%;display:flex;justify-content:center}
  .arch-frame.big{width:100%;height:400px;border-radius:40px;padding:12px}
  .arch-inner{border-radius:30px}
  .hero-title{font-size:2.75rem;margin-bottom:1rem}
  .hero-sub{font-size:1.4rem;margin:0 0 1.4rem}
  .arch-base{display:none}
}
/* Extra small height devices (e.g., iPhone SE landscape height class) */
@media (max-width:520px) and (max-height:740px){
  .arch-frame.big{height:340px}
  .hero-inner{gap:1.4rem;padding:1.9rem 1rem 2rem}
  .hero-title{font-size:2.45rem}
  .hero-sub{font-size:1.28rem;margin-bottom:1.1rem}
}
@media (max-width:520px) and (max-height:680px){
  .arch-frame.big{height:310px}
  .hero-title{font-size:2.28rem}
  .hero-sub{font-size:1.22rem}
  .hero-inner{padding:1.7rem .95rem 1.85rem}
}
@media (max-width:520px) and (max-height:630px){
  .arch-frame.big{height:290px}
  .hero-title{font-size:2.12rem}
  .hero-sub{font-size:1.14rem}
  .hero-inner{gap:1.2rem}
}
@media (max-width:560px){
  .hero-title{font-size: clamp(1.8rem, 7.5vw, 2.05rem);line-height:1.02}
  .hero-sub{font-size: clamp(1rem, 4vw, 1.18rem);}
  .hero-cta .btn.large{padding:.85rem 2rem}
}
@media (max-width:420px){
  .hero-inner{padding:2rem 1.15rem 2.4rem}
  .hero-title{font-size:1.92rem}
  .hero-sub{font-size:1.08rem;margin-bottom:1.2rem}
}
/* Target common 375px width devices (e.g., 375x667) to tighten further before ultra narrow rules */
@media (max-width:400px){
  .hero-inner{padding:1.9rem 1rem 2.2rem;gap:1.45rem}
  .arch-frame.big{height:320px}
  .hero-title{font-size:1.8rem; letter-spacing: -0.5px;}
  .hero-sub{font-size:1.0rem;margin-bottom:1.1rem; line-height: 1.3;}
  .hero-cta .btn.large{padding:.82rem 1.8rem}
}
/* Ultra narrow widths */
@media (max-width:360px){
  .hero-inner{padding:1.75rem .85rem 2.1rem;gap:1.3rem}
  .arch-frame.big{height:350px}
  .hero-title{font-size:1.82rem;letter-spacing:.2px}
  .hero-sub{font-size:1rem;margin-bottom:1rem}
  .hero-cta .btn.large{padding:.78rem 1.6rem;font-size:.92rem}
}
@media (max-width:340px){
  .arch-frame.big{height:330px}
  .hero-title{font-size:1.72rem}
  .hero-sub{font-size:.96rem}
  .hero-inner{padding:1.6rem .75rem 2rem;gap:1.15rem}
}
</style>

<style scoped>
/* Hero title line handling: keep full 'Лилия | Kids UGC' on first line, force 'Ментор мам' to new line */
.hero-title .title-line-1 { display:inline; }
.hero-title .title-line-2 { display:block; }

@media (max-width: 559px) {
  .hero-title .title-line-1 { display:block; }
  .hero-title .title-line-2 { display:block; }
  .hero-title .title-line-1,
  .hero-title .title-line-2 { line-height: 0.95; }
}

/* Intro Screens Section */
.intro-screens{
  position: relative;
  max-width: 100%;
  overflow: hidden; /* Prevent children from breaking out */
}
.intro-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4rem;
}
.intro-text {
  text-align: left;
  max-width: 520px;
}
.intro-text h2 {
  font-size: 3.2rem;
  font-weight: 300;
  margin: 0 0 1.8rem;
}
.intro-multiline p {
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0 0 1.2rem;
  max-width: 100%;
  overflow-wrap: break-word;
}

@media (max-width: 960px) {
  .intro-inner {
    flex-direction: column;
    gap: 2rem;
  }
  .intro-text {
    text-align: center;
    max-width: 800px;
  }
}

@media (max-width: 900px) {
  .intro-inner { padding: 2.4rem 1.6rem 2.8rem; }
  .intro-text h2 { font-size: 2.8rem; }
  .intro-multiline p { font-size: 1.1rem; }
}

@media (max-width: 640px) {
  .intro-inner { padding: 2.2rem 1.3rem 2.4rem; }
  .intro-text h2 { font-size: 2.4rem; margin-bottom: 1.5rem; }
}

@media (max-width: 480px) {
  .intro-inner { padding: 2rem 1.1rem 2.2rem; }
  .intro-text h2 { font-size: 2rem; }
  .intro-multiline p { font-size: 1rem; line-height: 1.45; }
}

@media (max-width: 375px) {
  .intro-inner { padding: 1.8rem 1rem 2rem; }
  .intro-text h2 { font-size: 1.8rem; }
  .intro-multiline p { font-size: 0.95rem; }
}

/* Specialties Section */
.specialties{max-width:1700px;margin:0 auto;padding:3.5rem 3rem 4.5rem;position:relative}
.spec-heading{font-size:4.2rem;font-weight:300;text-align:center;margin:0 0 2.2rem;letter-spacing:.5px}
.spec-heading,.spec-lead,.spec-ft-title,.spec-ft-desc{overflow-wrap:break-word;word-break:break-word;hyphens:auto;max-width:100%}
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
.spec-compact{display:flex;flex-direction:column;gap:1.8rem}
.sc-columns{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2.2rem}
.sc-col{display:flex;flex-direction:column;gap:.85rem}
.sc-heading{margin:0;font-size:1rem;font-weight:600;letter-spacing:.8px;text-transform:uppercase;opacity:.85;text-align:left}
.sc-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.55rem;font-size:.92rem;line-height:1.35}
.sc-list li{position:relative;padding-left:1rem}
.sc-list li::before{content:"•";position:absolute;left:0;top:0;color:#7a47d9;font-weight:600}
.sc-final{margin:0;font-size:.9rem;opacity:.85;line-height:1.4;text-align:center}
.spec-cta{display:inline-block;padding:1.05rem 3.4rem;border-radius:54px;background:linear-gradient(90deg,#fff4ea 0%,#ffd7f2 40%,#ffc8ec 60%,#ffbde5 100%);border:4px solid rgba(216,134,186,0.55);font-weight:500;letter-spacing:2px;font-size:1.65rem;color:#111;text-decoration:none;transition:.45s cubic-bezier(.16,.8,.3,1);box-shadow:0 4px 22px -6px rgba(0,0,0,.2)}
.spec-cta:hover{transform:scale(1.07);box-shadow:0 14px 38px -10px rgba(0,0,0,.32)}
.spec-cta:active{transform:scale(1.02)}

/* Stats & Proof Section */
.stats-proof{max-width:1600px;margin:0 auto;padding:3.8rem 3rem 4.2rem;position:relative}
.sp-inner{background:linear-gradient(160deg,#6a2bb8,#8a3fd9 55%,#a968ff);border-radius:64px;padding:3.4rem 4rem;display:flex;flex-direction:row;align-items:center;gap:4.2rem;position:relative;overflow:hidden;box-shadow:0 28px 64px -18px rgba(112,40,180,.45),0 12px 28px -6px rgba(60,20,110,.35)}
.sp-inner::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 18% 24%,rgba(255,255,255,.32),rgba(255,255,255,0) 60%),radial-gradient(circle at 82% 78%,rgba(255,255,255,.18),rgba(255,255,255,0) 70%);mix-blend-mode:overlay;pointer-events:none}
.sp-left{flex:1;min-width:0;display:flex;flex-direction:column;gap:1.4rem;color:#fff}
.sp-heading{margin:0;font-size:2.8rem;font-weight:700;letter-spacing:.5px;line-height:1.05}
.sp-bullets{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.6rem;font-size:1rem;font-weight:400}
.sp-bullets li{position:relative;padding-left:1.1rem}
.sp-bullets li::before{content:"▹";position:absolute;left:0;top:0;color:#ffd6ff;font-weight:600}
.sp-miniSignature{margin:.6rem 0 0;font-size:.9rem;letter-spacing:.5px;opacity:.9;font-weight:500;display:flex;align-items:center;gap:.4rem;flex-wrap:wrap}
.sp-folder-wrap{flex:0 0 320px;display:flex;justify-content:center;align-items:center;position:relative}
.sp-folder{width:270px;height:200px;position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(180deg,#cfa7ff,#b475ff 55%,#9e47ff);border-radius:26px;box-shadow:0 16px 40px -12px rgba(0,0,0,.45);text-decoration:none;color:#fff;font-weight:600;font-size:1.05rem;letter-spacing:.4px;transition:.5s cubic-bezier(.16,.8,.3,1);backdrop-filter:blur(2px)}
.sp-folder::before{content:"";position:absolute;left:22px;top:-34px;width:118px;height:48px;background:linear-gradient(180deg,#d4b3ff,#b781ff);border-radius:14px 14px 4px 4px;box-shadow:0 8px 22px -6px rgba(0,0,0,.4)}
.sp-folder:hover{transform:translateY(-6px) scale(1.04);box-shadow:0 30px 60px -14px rgba(28,0,70,.65)}
.sp-folder:active{transform:translateY(-1px) scale(1.01);transition-duration:.25s}
.sp-folder-label{z-index:1;text-align:center;display:flex;flex-direction:column;gap:.5rem}
.sp-folder-label strong{font-size:1.05rem;font-weight:700;letter-spacing:.6px}
.sp-folder-mini{font-size:.72rem;font-weight:500;opacity:.92;line-height:1.2;white-space:nowrap}
.sp-cta-hint{margin:0;font-size:.75rem;letter-spacing:1.2px;text-transform:uppercase;color:#fff;opacity:.78;position:absolute;left:50%;bottom:-34px;transform:translateX(-50%)}
.sp-variants{margin:1.2rem 0 0;display:flex;flex-direction:column;gap:.4rem;font-size:.7rem;opacity:.6}
.sp-variants code{background:rgba(255,255,255,.15);padding:.15rem .45rem;border-radius:6px;font-size:.65rem}
@media (max-width:1250px){
  .sp-inner{flex-direction:column;align-items:stretch;padding:3rem 3rem}
  .sp-folder-wrap{order:-1;padding:0 0 1rem}
  .sp-folder{width:240px;height:176px}
  .sp-heading{font-size:2.4rem}
}
@media (max-width:640px){
  .stats-proof{padding:2.6rem 1.2rem 3.2rem}
  .sp-inner{border-radius:46px;padding:2.4rem 1.6rem;gap:2.2rem}
  .sp-heading{font-size:2.1rem}
  .sp-bullets{font-size:.9rem}
  .sp-folder{width:210px;height:160px}
  .sp-folder::before{left:18px;top:-30px;width:100px;height:42px}
  .sp-folder-mini{display:none}
  .sp-cta-hint{bottom:-30px;font-size:.68rem}
}
@media (max-width:420px){
  .sp-heading{font-size:1.84rem}
  .sp-inner{padding:2.2rem 1.3rem}
  .sp-folder{width:190px;height:150px}
  .sp-folder::before{left:16px;top:-28px;width:92px;height:38px}
}

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
  .sc-list{font-size:.9rem}
  .spec-cta{font-size:1.4rem;padding:.95rem 2.8rem}
}
@media (max-width:640px){
  .specialties{padding:2.6rem 1.2rem 3.4rem}
  .spec-features{gap:2rem;margin-bottom:2.8rem}
  .spec-heading{font-size:2.8rem;margin-bottom:1.4rem}
  .spec-photo-circle{width:340px;height:340px}
  .spec-main{padding:2.4rem 1.4rem;border-radius:50px}
  .spec-lead{font-size:1.35rem}
  .sc-columns{gap:1.6rem}
  .sc-heading{font-size:.92rem;text-align:center}
  .sc-list{font-size:.85rem}
  .spec-cta{font-size:1.2rem;padding:.85rem 2.2rem;letter-spacing:1.2px}
}
@media (max-width:420px){
  .spec-photo-circle{width:280px;height:280px}
  .spec-heading{font-size:2.4rem}
  .spec-lead{font-size:1.22rem}
  .sc-columns{grid-template-columns:1fr}
  .sc-heading{text-align:center}
  .sc-list li{padding-left:.85rem}
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
/* Tighten spacing after hero on short devices */
@media (max-width:520px) and (max-height:680px){
  .intro-screens{margin:.65rem .75rem 0;padding:1.7rem 1.05rem 2rem}
}
/* Phones collage adjustments */
.intro-screens .phones{display:flex;justify-content:center;align-items:flex-end;gap:2.2rem;margin:0 0 2rem}
.intro-screens .phone img{display:block;width:100%;height:auto;border-radius:34px;box-shadow:0 10px 34px -14px rgba(0,0,0,.35),0 4px 14px -6px rgba(0,0,0,.25)}
@media (max-width:900px){
  .intro-screens .phones{gap:1.6rem}
}
@media (max-width:640px){
  .intro-screens .phones{gap:1.5rem;margin-bottom:1.6rem}
  .intro-screens .phone{flex: 1 1 44%; max-width: 44%;}
}
@media (max-width:520px){
  .intro-screens .phones{gap:1rem}
  .intro-screens .phone img{border-radius:28px}
}
@media (max-width:480px){
  .intro-screens .phones{gap:.8rem;margin-bottom:1.4rem}
  .intro-screens .phone img{border-radius:24px}
}
@media (max-width:520px) and (max-height:680px){
  .intro-screens .phones{margin-bottom:1rem;gap:.75rem}
}

/* Responsive styles for intro text */
@media (max-width: 900px) {
  .intro-inner { padding: 2.4rem 1.6rem 2.8rem; }
  .intro-text h2 { font-size: 2.8rem; }
  .intro-multiline p { font-size: 1.1rem; }
}

@media (max-width: 640px) {
  .intro-inner { padding: 2.2rem 1.3rem 2.4rem; }
  .intro-text h2 { font-size: 2.4rem; margin-bottom: 1.5rem; }
}

@media (max-width: 480px) {
  .intro-inner { padding: 2rem 1.1rem 2.2rem; }
  .intro-text h2 { font-size: 2rem; }
  .intro-multiline p { font-size: 1rem; line-height: 1.45; }
}

@media (max-width: 375px) {
  .intro-inner { padding: 1.8rem 1rem 2rem; }
  .intro-text h2 { font-size: 1.8rem; }
  .intro-multiline p { font-size: 0.95rem; }
}
</style>
