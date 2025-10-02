<template>
  <header class="site-header" v-reveal:fade>
    <div class="header-inner">
      <div class="brand" v-reveal="{mode:'left',delay:60}">
        <router-link to="/" class="logo-link" aria-label="Go to home">
          <img src="/logo.png" :alt="t('ui.logo_alt')" class="logo" onerror="this.onerror=null;this.src='/logo-placeholder.svg'" />
        </router-link>
      </div>

      <nav class="main-nav" v-reveal="{mode:'up',delay:140}">
        <router-link to="/" class="nav-link hover-pop">{{ t('nav.home') }}</router-link>
        <span class="sep">·</span>
  <router-link to="/portfolio" class="nav-link hover-pop">{{ t('nav.portfolio') }}</router-link>
  <span class="sep">·</span>
  <router-link to="/contact" class="nav-link hover-pop">{{ t('nav.contact') }}</router-link>
      </nav>

      <div class="right-cluster" v-reveal="{mode:'right',delay:200}">
        <button class="burger" @click="$emit('toggle-mobile')" :aria-label="t('ui.toggle_menu')" :aria-expanded="mobileOpen ? 'true' : 'false'" aria-haspopup="true" :aria-controls="'mobileMenu'">
          <span :class="{open: mobileOpen}"></span>
        </button>
        <div class="lang-select" v-reveal="{mode:'up',delay:300}">
          <select v-model="langLocal" @change="onLangChange">
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="es">ES</option>
          </select>
        </div>
      </div>
    </div>

    <teleport to="body">
      <transition name="mm-fade">
        <div
          v-if="mobileOpen"
          class="mobile-overlay is-solid"
          :id="'mobileMenu'"
          role="dialog"
          aria-modal="true"
          @keydown.esc.prevent="$emit('close-mobile')"
        @click.self="$emit('close-mobile')"
        >
          <nav class="mobile-panel" role="navigation" aria-label="Main" @click.stop>
            <button class="m-close" type="button" :aria-label="t('ui.toggle_menu')" @click="$emit('close-mobile')">
              <span></span>
            </button>
            <div class="m-links">
              <router-link to="/" @click.native="$emit('close-mobile')">{{ t('nav.home') }}</router-link>
              <router-link to="/portfolio" @click.native="$emit('close-mobile')">{{ t('nav.portfolio') }}</router-link>
              <router-link to="/contact" @click.native="$emit('close-mobile')">{{ t('nav.contact') }}</router-link>
            </div>
            <div class="m-social">
              <a href="https://www.instagram.com/lilyacreates?igsh=NHk5bGVuZGM2ZnA%3D&utm_source=qr" target="_blank" rel="noopener" aria-label="Instagram" class="icon-img">
                <img src="/inst.png" alt="Instagram" />
              </a>
              <a href="https://www.tiktok.com/@lilyacreates?_t=ZT-90C6nnZuP4Y&_r=1" target="_blank" rel="noopener" aria-label="TikTok" class="icon-img">
                <img src="/tt.png" alt="TikTok" />
              </a>
              <a href="https://youtube.com/@lilyacreates?si=-WiNnQbngE96mzoU" target="_blank" rel="noopener" aria-label="YouTube" class="icon-img">
                <img src="/yt.png" alt="YouTube" />
              </a>
              <a href="https://www.facebook.com/share/1787UTd9yF/?mibextid=wwXIfr" target="_blank" rel="noopener" aria-label="Facebook" class="icon-img">
                <img src="/fb.png" alt="Facebook" />
              </a>
            </div>
            <!-- language selector removed from modal -->
          </nav>
        </div>
      </transition>
    </teleport>
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
/* Header base */
.site-header{padding:6px 0;background:var(--header-gradient);color:#fff;position:sticky;top:0;z-index:60;box-shadow:0 2px 6px -4px rgba(0,0,0,.25);border-radius:22px;margin:10px 10px 0}
.header-inner{display:flex;align-items:center;justify-content:space-between;max-width:1180px;margin:0 auto;background:transparent;color:inherit;padding:0 10px 0 14px;min-height:56px}
.site-header .brand{display:flex;align-items:center;gap:14px}
.logo{height:46px;display:block}
.logo-link{display:block;line-height:0;text-decoration:none}
.logo-link:focus-visible{outline:2px solid #fff;outline-offset:4px;border-radius:8px}
/* tagline removed */
.main-nav{color:rgba(255,255,255,0.92);font-weight:500}
.main-nav a{color:inherit;margin:0 .65rem;text-decoration:none;position:relative}
.main-nav a:hover:after,.main-nav a:focus-visible:after{width:100%}
.main-nav a:after{content:"";position:absolute;left:0;bottom:-6px;height:2px;width:0;background:rgba(255,255,255,.65);transition:width .4s}
.sep{color:rgba(255,255,255,0.45);margin:0 .5rem}
.right-cluster{display:flex;align-items:center;gap:16px;margin-left:auto}

/* Burger */
.burger{display:none;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,.35);padding:8px 10px;cursor:pointer;border-radius:18px;backdrop-filter:blur(6px);transition:background .35s,transform .35s,box-shadow .35s}
.burger:hover{background:rgba(255,255,255,0.28);transform:translateY(-2px);box-shadow:0 6px 18px -6px rgba(0,0,0,.4)}
.burger span{display:block;width:22px;height:2.4px;background:#fff;position:relative;transition:all .4s cubic-bezier(.5,.3,.2,1.4)}
.burger span::before,.burger span::after{content:'';position:absolute;left:0;width:22px;height:2.4px;background:#fff;transition:all .4s cubic-bezier(.5,.3,.2,1.4)}
.burger span::before{top:-7px}
.burger span::after{top:7px}
.burger span.open{background:transparent}
.burger span.open::before{transform:rotate(42deg);top:0}
.burger span.open::after{transform:rotate(-42deg);top:0}

.lang-select{margin-left:8px;position:relative}
.lang-select select{appearance:none;-webkit-appearance:none;-moz-appearance:none;background:rgba(255,255,255,0.18);color:#fff;border:1px solid rgba(255,255,255,0.42);padding:8px 34px 8px 18px;border-radius:22px;font-weight:600;font-size:.78rem;letter-spacing:.5px;backdrop-filter:blur(6px);transition:background .35s,border-color .35s,box-shadow .35s;cursor:pointer}
.lang-select select:hover{background:rgba(255,255,255,0.28)}
.lang-select select:focus-visible{outline:2px solid rgba(255,255,255,.85);outline-offset:3px;box-shadow:0 0 0 4px rgba(255,255,255,0.15)}
.lang-select::after{content:"";position:absolute;pointer-events:none;top:50%;right:14px;width:9px;height:9px;border-right:2px solid #fff;border-bottom:2px solid #fff;transform:translateY(-60%) rotate(45deg);opacity:.9}

/* Mobile overlay */
.mobile-overlay{position:fixed;inset:0;background:linear-gradient(180deg,rgba(21,16,19,0.68) 0%,rgba(21,16,19,0.42) 32%,rgba(21,16,19,0.18) 64%,rgba(21,16,19,0.05) 100%);backdrop-filter:blur(18px) saturate(170%);display:flex;align-items:flex-start;justify-content:center;z-index:999;animation:overlayIn .35s ease;overflow-y:auto}
.mobile-overlay.is-solid{background:linear-gradient(180deg,rgba(21,16,19,0.72) 0%,rgba(21,16,19,0.46) 34%,rgba(21,16,19,0.18) 68%,rgba(21,16,19,0.04) 100%)}
/* Mobile panel stripped of rectangle visuals */
.mobile-panel{width:100%;max-width:none;background:transparent;-webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:none;border-radius:0;padding:60px 0 60px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:34px;position:relative;overflow:visible;min-height:100%;}
@media (max-width:640px){.mobile-panel{gap:38px}}
.m-links{display:flex;flex-direction:column;gap:22px;font-size:clamp(1.35rem,4.8vw,2rem);font-weight:650;letter-spacing:.5px;line-height:1.07;margin:6px 0 0;color:#fff;text-shadow:0 2px 4px rgba(0,0,0,.25);align-items:center;text-align:center}
.m-links a{color:#fff;text-decoration:none;position:relative;padding-left:2px;letter-spacing:.5px}
.m-links a::after{content:"";position:absolute;left:0;bottom:-6px;width:0;height:2px;background:linear-gradient(90deg,#ffe5f8,#f7d6c8);transition:width .45s}
.m-links a:hover::after,.m-links a:focus-visible::after{width:100%}
.m-social{display:flex;gap:20px;flex-wrap:wrap;margin-top:4px;filter:drop-shadow(0 4px 12px rgba(0,0,0,.25))}
/* Close button */
.m-close{position:absolute;top:18px;right:18px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.35);display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(6px);transition:background .35s,transform .35s,box-shadow .35s}
.m-close:hover{background:rgba(255,255,255,0.28);transform:translateY(-2px);box-shadow:0 6px 20px -6px rgba(0,0,0,.45)}
.m-close span{position:relative;display:block;width:20px;height:2.4px;background:transparent}
.m-close span::before,.m-close span::after{content:"";position:absolute;left:0;top:0;width:20px;height:2.4px;background:#fff;border-radius:2px;transition:background .35s}
.m-close span::before{transform:rotate(45deg)}
.m-close span::after{transform:rotate(-45deg)}
@media (max-width:640px){.m-close{width:40px;height:40px;top:14px;right:14px}}
.m-social .icon-img{width:50px;height:50px;background:rgba(255,255,255,0.18);border-radius:16px;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:background .4s,transform .4s,box-shadow .4s}
.m-social .icon-img:hover{background:rgba(255,255,255,0.32);transform:translateY(-4px);box-shadow:0 10px 34px -12px rgba(0,0,0,.5)}
.m-social img{width:100%;height:100%;object-fit:cover}
.visually-hidden{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap!important;border:0!important}
/* Fullscreen fade */
.mm-fade-enter-active,.mm-fade-leave-active{transition:opacity .35s ease}
.mm-fade-enter-from,.mm-fade-leave-to{opacity:0}
@keyframes overlayIn{from{opacity:0}to{opacity:1}}

@media (max-width:900px){
  .main-nav{display:none}
  .burger{display:block}
  /* social-links removed */
  /* keep language selector visible */
}

@media (max-width:640px){
  .site-header{padding:4px 0;margin:6px 6px 0;border-radius:18px}
  .logo{height:40px}
  .header-inner{padding:0 10px 0 10px;min-height:54px}
  .burger{padding:6px 8px;border-radius:16px}
}

@media (min-width:1200px){
  .header-inner{padding:0 34px}
  .logo{height:62px}
}
</style>
