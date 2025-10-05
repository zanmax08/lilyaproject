<template>
  <div id="app">
  <DesktopHeader v-if="!isMobile" />
  <MobileHeader v-else />

    <main class="content-wrap">
      <transition name="page-fade" mode="out-in">
        <router-view />
      </transition>
    </main>

    <footer class="site-footer">
      © <span>{{ year }}</span> {{ t('meta.footer') }}
    </footer>
  </div>
</template>

<script>
import { t, lang, setLang } from './i18n'
import DesktopHeader from './components/DesktopHeader.vue'
import MobileHeader from './components/MobileHeader.vue'
import router from './router'

export default {
  components: { DesktopHeader, MobileHeader },
  data() {
    return {
      year: new Date().getFullYear(),
  isMobile: false,
  // keep lang binding in App for potential global use
      langLocal: lang.value
    }
  },
  computed: {
    t() { return t }
  },
  mounted() {
    document.documentElement.lang = lang.value
    try { document.title = t('meta.title') } catch(e) {}
    // listen for desktop breakpoint to auto close menu
    this._mq = window.matchMedia('(max-width: 900px)')
    const handler = (e)=>{ this.isMobile = e.matches }
    if(this._mq.addEventListener){ this._mq.addEventListener('change', handler) } else if(this._mq.addListener){ this._mq.addListener(handler) }
    this._mqHandler = handler
    this.isMobile = this._mq.matches

    // Fallback forced scroll-to-top after route change (in case browser keeps prior scroll)
    this._removeAfterEach = router.afterEach((to, from) => {
      // Skip if navigating to an in-page hash anchor (router scrollBehavior handles it)
      if (to.hash) return
      // Use requestAnimationFrame to wait page transition mount
      requestAnimationFrame(() => {
        // Try resetting various possible scroll containers
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        const appEl = document.getElementById('app')
        if (appEl) appEl.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })
    })
  },
  beforeUnmount(){
    if (this._removeAfterEach) this._removeAfterEach()
  },
  watch: {
    langLocal(v) { setLang(v) }
  },
  methods: {
    onLangChange() { setLang(this.langLocal) }
  }
}
</script>

<style>
.site-footer{margin-top:1.25rem;padding:.5rem 0;border-top:1px solid #f1f5f9;color:var(--muted);text-align:center;font-size:0.9rem}
</style>
