<template>
  <header class="site-header">
    <div class="header-inner">
      <div class="brand">
        <img src="/logo.png" :alt="t('ui.logo_alt')" class="logo" onerror="this.onerror=null;this.src='/logo-placeholder.svg'" />
        <div class="tag">{{ t('hero.title') }}</div>
      </div>

      <nav class="main-nav">
        <router-link to="/">{{ t('nav.home') }}</router-link>
        <span class="sep">·</span>
        <router-link to="/portfolio">{{ t('nav.portfolio') }}</router-link>
        <span class="sep">·</span>
        <router-link to="/services">{{ t('nav.services') }}</router-link>
        <span class="sep">·</span>
        <router-link to="/contact">{{ t('nav.contact') }}</router-link>
      </nav>

      <button class="burger" @click="$emit('toggle-mobile')" :aria-label="t('ui.toggle_menu')">
        <span :class="{open: mobileOpen}"></span>
      </button>
      <div class="right-cluster">
        <div class="social-links" aria-label="social links">
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="icon ig">IG</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok" class="icon tt">TT</a>
          <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube" class="icon yt">YT</a>
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" class="icon fb">FB</a>
        </div>
        <div class="lang-select">
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
      <router-link to="/services" @click.native="$emit('close-mobile')">{{ t('nav.services') }}</router-link>
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
.social-links .icon{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;font-size:.7rem;font-weight:600;letter-spacing:.5px;border-radius:50%;background:rgba(255,255,255,0.12);color:#fff;text-decoration:none;position:relative;overflow:hidden;transition:background .25s,transform .25s}
.social-links .icon:hover{background:rgba(255,255,255,0.25);transform:translateY(-2px)}
.social-links .icon:active{transform:translateY(0);background:rgba(255,255,255,0.35)}
.social-links .icon.ig{background:linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4);}
.social-links .icon.ig:hover{filter:brightness(1.1)}
.social-links .icon.tt{background:#111}
.social-links .icon.tt:hover{background:#222}
.social-links .icon.yt{background:#cc0000}
.social-links .icon.yt:hover{background:#e60000}
.social-links .icon.fb{background:#1877F2}
.social-links .icon.fb:hover{background:#2b86f7}
.logo{height:64px;display:block}
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
