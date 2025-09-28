<template>
  <div id="app">
    <SiteHeader :mobileOpen="showMobile" @toggle-mobile="showMobile = !showMobile" @close-mobile="showMobile = false" />

    <main class="content-wrap">
      <router-view />
    </main>

    <footer class="site-footer">
      © <span>{{ year }}</span> {{ t('meta.footer') }}
    </footer>
  </div>
</template>

<script>
import { t, lang, setLang } from './i18n'
import SiteHeader from './components/SiteHeader.vue'

export default {
  components: { SiteHeader },
  data() {
    return {
      year: new Date().getFullYear(),
      showMobile: false,
      // keep lang binding in App for potential global use
      langLocal: lang.value
    }
  },
  computed: {
    t() { return t }
  },
  watch: {
    langLocal(v) { setLang(v) }
  },
  mounted() {
    document.documentElement.lang = lang.value
    try { document.title = t('meta.title') } catch(e) {}
  },
  methods: {
    onLangChange() { setLang(this.langLocal) }
  }
}
</script>

<style>
.site-header{padding:12px 0;background:var(--header-gradient);color:#fff;position:sticky;top:0;z-index:40;box-shadow:0 1px 0 rgba(2,6,23,0.04)}
.header-inner{display:flex;align-items:center;justify-content:space-between;max-width:1100px;margin:0 auto;background:transparent;color:inherit;padding:0 18px}

.site-header .brand{position:absolute;left:12px;right:auto;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:12px}
/* keep lang-select in normal flow (near nav) */
.site-header .lang-select{position:static;margin-left:12px}
/* add left padding so content doesn't overlap the logo and some right padding for nav */
.header-inner{padding-left:96px;padding-right:96px}
.main-nav{margin-left:auto}
.logo{height:64px;display:block}
.tag{color:rgba(255,255,255,0.85);font-size:0.9rem}
.main-nav{color:rgba(255,255,255,0.9)}
.main-nav a{color:inherit;margin:0 .5rem;text-decoration:none}
.sep{color:rgba(255,255,255,0.5);margin:0 .5rem}

/* burger styles */
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
}

/* language select */
.lang-select{margin-left:12px}
.lang-select select{background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.15);padding:6px;border-radius:6px}


/* On small screens show only logo + burger */
@media (max-width:640px){
  /* compact header: keep logo left and burger right, vertically centered */
  .site-header{padding:6px 0}
  .tag{display:none}
  .brand{gap:6px}
  .logo{height:40px}
  /* reduce the right padding for small screens and keep brand flush to right */
  .header-inner{padding:6px 12px 6px 12px;justify-content:space-between;align-items:center}
  .site-header .brand{right:8px}
  .site-header .lang-select{left:8px}
  .brand{order:1;margin-left:0;padding-left:0}
  .brand .logo{margin-left:0}
  .burger{order:2;margin-left:auto;position:relative;top:0;right:0;padding:6px;display:flex;align-items:center}
  .burger span{width:18px}
}

.site-footer{margin-top:1.25rem;padding:.5rem 0;border-top:1px solid #f1f5f9;color:var(--muted);text-align:center;font-size:0.9rem}



/* Rounded header on larger screens */
@media (min-width:1100px){
  .site-header{border-radius:14px;box-shadow:0 6px 20px rgba(3,7,18,0.08)}
  .site-header{margin:18px}
  .header-inner{padding:14px 26px}
}
</style>
