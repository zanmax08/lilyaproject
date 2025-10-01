<template>
  <header class="site-header" v-reveal:fade>
    <div class="header-inner">
      <div class="brand" v-reveal="{mode:'left',delay:60}">
        <router-link to="/" class="logo-link" aria-label="Go to home">
          <img src="/logo.png" :alt="t('ui.logo_alt')" class="logo" onerror="this.onerror=null;this.src='/logo-placeholder.svg'" />
        </router-link>
        <div class="tag" v-reveal="{mode:'up',delay:160}">{{ t('hero.title') }}</div>
      </div>

      <nav class="main-nav" v-reveal="{mode:'up',delay:140}">
        <router-link to="/" class="nav-link hover-pop">{{ t('nav.home') }}</router-link>
        <span class="sep">·</span>
  <router-link to="/portfolio" class="nav-link hover-pop">{{ t('nav.portfolio') }}</router-link>
  <span class="sep">·</span>
  <router-link to="/contact" class="nav-link hover-pop">{{ t('nav.contact') }}</router-link>
      </nav>

      <button class="burger" @click="$emit('toggle-mobile')" :aria-label="t('ui.toggle_menu')" v-reveal="{mode:'up',delay:220}">
        <span :class="{open: mobileOpen}"></span>
      </button>
      <div class="right-cluster" v-reveal="{mode:'right',delay:200}">
        <div class="social-links" aria-label="social links">
          <a href="https://www.instagram.com/lilyacreates?igsh=NHk5bGVuZGM2ZnA%3D&utm_source=qr" target="_blank" rel="noopener" aria-label="Instagram" class="icon-img hover-pop">
            <img src="/inst.png" alt="Instagram" loading="lazy" />
          </a>
          <a href="https://www.tiktok.com/@lilyacreates?_t=ZT-90C6nnZuP4Y&_r=1" target="_blank" rel="noopener" aria-label="TikTok" class="icon-img hover-pop">
            <img src="/tt.png" alt="TikTok" loading="lazy" />
          </a>
          <a href="https://youtube.com/@lilyacreates?si=-WiNnQbngE96mzoU" target="_blank" rel="noopener" aria-label="YouTube" class="icon-img hover-pop">
            <img src="/yt.png" alt="YouTube" loading="lazy" />
          </a>
          <a href="https://www.facebook.com/share/1787UTd9yF/?mibextid=wwXIfr" target="_blank" rel="noopener" aria-label="Facebook" class="icon-img hover-pop">
            <img src="/fb.png" alt="Facebook" loading="lazy" />
          </a>
        </div>
        <div class="lang-select" v-reveal="{mode:'up',delay:300}">
          <select v-model="langLocal" @change="onLangChange">
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="es">ES</option>
          </select>
        </div>
      </div>
    </div>

    <div class="mobile-nav" v-if="mobileOpen">
      <router-link to="/" @click.native="$emit('close-mobile')">{{ t('nav.home') }}</router-link>
  <router-link to="/portfolio" @click.native="$emit('close-mobile')">{{ t('nav.portfolio') }}</router-link>
  <router-link to="/contact" @click.native="$emit('close-mobile')">{{ t('nav.contact') }}</router-link>
    </div>
  </header>
</template>

<script>
import { t, lang, setLang } from '../i18n'
import { ref, watch } from 'vue'

export default {
  name: 'SiteHeader',
  props: {
    mobileOpen: { type: Boolean, default: false }
  },
  emits: ['toggle-mobile', 'close-mobile', 'update:mobileOpen'],
  setup(props, { emit }) {
    const langLocal = ref(lang.value)
    watch(langLocal, (v) => setLang(v))

    function onLangChange() { setLang(langLocal.value) }

    return { t, langLocal, onLangChange }
  }
}
</script>

<style scoped>
.site-header{padding:12px 0;background:var(--header-gradient);color:#fff;position:sticky;top:0;z-index:40;box-shadow:0 1px 0 rgba(2,6,23,0.04)}
.header-inner{display:flex;align-items:center;justify-content:space-between;max-width:1100px;margin:0 auto;background:transparent;color:inherit;padding:0 18px}

.site-header .brand{position:absolute;left:12px;right:auto;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:12px}
.site-header .lang-select{position:static;margin-left:12px}
.header-inner{padding-left:96px;padding-right:96px}
.main-nav{margin-left:auto}
.right-cluster{display:flex;align-items:center;gap:14px;margin-left:32px}
.social-links{display:flex;align-items:center;gap:10px}
.social-links .icon-img{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.18);backdrop-filter:blur(4px);overflow:hidden;transition:transform .3s,background .3s}
.social-links .icon-img:hover{background:rgba(255,255,255,0.32);transform:translateY(-3px)}
.social-links .icon-img:active{transform:translateY(-1px)}
.social-links .icon-img img{display:block;width:100%;height:100%;object-fit:cover;mix-blend-mode:multiply}
.logo{height:64px;display:block}
.logo-link{display:block;line-height:0;text-decoration:none;}
.logo-link:focus-visible{outline:2px solid #fff;outline-offset:4px;border-radius:8px}
.tag{color:rgba(255,255,255,0.85);font-size:0.9rem}
.main-nav{color:rgba(255,255,255,0.9)}
.main-nav a{color:inherit;margin:0 .5rem;text-decoration:none}
.sep{color:rgba(255,255,255,0.5);margin:0 .5rem}

.burger{display:none;background:transparent;border:0;padding:8px;cursor:pointer}
.burger span{display:block;width:22px;height:2px;background:#fff;position:relative;transition:all .25s}
.burger span::before,.burger span::after{content:'';position:absolute;left:0;width:22px;height:2px;background:#fff;transition:all .25s}
.burger span::before{top:-7px}
.burger span::after{top:7px}
.burger span.open{background:transparent}
.burger span.open::before{transform:rotate(45deg);top:0}
.burger span.open::after{transform:rotate(-45deg);top:0}

.mobile-nav{display:none}

@media (max-width:900px){
  .main-nav{display:none}
  .burger{display:block}
  .mobile-nav{display:flex;flex-direction:column;gap:8px;padding:12px 18px;background:#3a2b2b}
  .mobile-nav a{color:#fff;padding:8px 0}
  .social-links{display:none}
}

.lang-select{margin-left:12px}
.lang-select select{background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.15);padding:6px;border-radius:6px}

@media (max-width:640px){
  .site-header{padding:6px 0}
  .tag{display:none}
  .brand{gap:6px}
  .logo{height:40px}
  .header-inner{padding:6px 12px 6px 12px;justify-content:space-between;align-items:center}
  .site-header .brand{right:8px}
  .site-header .lang-select{left:8px}
  .brand{order:1;margin-left:0;padding-left:0}
  .brand .logo{margin-left:0}
  .burger{order:2;margin-left:auto;position:relative;top:0;right:0;padding:6px;display:flex;align-items:center}
  .burger span{width:18px}
}

/* Large screen: rounded header and extra spacing */
@media (min-width:1100px) {
  .site-header { border-radius:14px; box-shadow:0 6px 20px rgba(3,7,18,0.08); margin:18px; }
  .header-inner { padding:14px 26px; }
}

</style>
