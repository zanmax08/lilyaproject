<template>
  <header class="mob-header no-shift" v-reveal:fade>
    <div class="row">
      <router-link to="/" class="logo-link" aria-label="Go to home">
        <img src="/logo.png" :alt="t('ui.logo_alt')" class="logo" onerror="this.onerror=null;this.src='/logo-placeholder.svg'" />
      </router-link>
      <div class="tagline" aria-hidden="true">{{ t('hero.title') }}</div>
      <div class="actions">
        <div class="lang-select">
          <select v-model="langLocal" @change="onLangChange">
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="es">ES</option>
          </select>
        </div>
        <button class="burger" @click="toggle" :aria-label="t('ui.toggle_menu')" :aria-expanded="mobileOpen ? 'true':'false'" aria-haspopup="true" aria-controls="mobileMenu">
          <span :class="{open: mobileOpen}"></span>
        </button>
      </div>
    </div>

    <teleport to="body">
      <transition name="mm-fade">
        <div v-if="mobileOpen" class="mobile-overlay" id="mobileMenu" role="dialog" aria-modal="true" @keydown.esc.prevent="close" @click.self="close">
          <nav class="mobile-panel" role="navigation" aria-label="Main" @click.stop>
            <button class="m-close" type="button" :aria-label="t('ui.toggle_menu')" @click="close"><span></span></button>
            <div class="m-links">
              <router-link to="/" @click.native="close">{{ t('nav.home') }}</router-link>
              <router-link to="/portfolio" @click.native="close">{{ t('nav.portfolio') }}</router-link>
              <router-link to="/contact" @click.native="close">{{ t('nav.contact') }}</router-link>
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
          </nav>
        </div>
      </transition>
    </teleport>
  </header>
</template>

<script>
import { t, lang, setLang } from '../i18n'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
export default {
  name:'MobileHeader',
  setup(){
    const mobileOpen = ref(false)
    const langLocal = ref(lang.value)
    watch(langLocal, v=> setLang(v))
    watch(mobileOpen, v=> { if(typeof document!=='undefined'){ document.body.style.overflow = v? 'hidden':'' } })
    function toggle(){ mobileOpen.value = !mobileOpen.value }
    function close(){ mobileOpen.value = false }
    function onLangChange(){ setLang(langLocal.value) }
    onBeforeUnmount(()=>{ if(typeof document!=='undefined') document.body.style.overflow='' })
    return { t, mobileOpen, toggle, close, langLocal, onLangChange }
  }
}
</script>

<style scoped>
.mob-header{padding:4px 0;background:var(--header-gradient);color:#fff;position:sticky;top:0;z-index:70;box-shadow:0 2px 6px -4px rgba(0,0,0,.25);border-radius:18px;margin:6px 6px 5px;display:none;min-height:var(--mobile-header-h);} 
@media (max-width:900px){.mob-header{display:block}}
.row{display:flex;align-items:center;justify-content:space-between;padding:0 10px;min-height:calc(var(--mobile-header-h) - 10px)}
.logo{height:40px;display:block;flex-shrink:0}
.logo-link{display:block;line-height:0}
.logo-link:focus-visible{outline:2px solid #fff;outline-offset:4px;border-radius:8px}
.actions{display:flex;align-items:center;gap:12px}
.tagline{display:none;margin-left:8px;font-weight:600;letter-spacing:.25px;color:rgba(255,255,255,0.92);text-shadow:0 2px 4px rgba(0,0,0,.25);font-size:.6rem;line-height:1.05;max-width:120px;white-space:normal;flex:1;}
@media (min-width:420px){.tagline{display:block}}
@media (min-width:480px){.tagline{max-width:150px;font-size:.64rem}}
@media (min-width:560px){.tagline{max-width:190px;font-size:.7rem}}
.burger{background:transparent;border:none;padding:6px 4px;cursor:pointer;border-radius:14px;transition:transform .35s,opacity .35s}
.burger:hover{transform:translateY(-2px);opacity:.85}
.burger span{display:block;width:22px;height:2.4px;background:#fff;position:relative;transition:all .4s cubic-bezier(.5,.3,.2,1.4)}
.burger span::before,.burger span::after{content:'';position:absolute;left:0;width:22px;height:2.4px;background:#fff;transition:all .4s cubic-bezier(.5,.3,.2,1.4)}
.burger span::before{top:-7px}.burger span::after{top:7px}
.burger span.open{background:transparent}
.burger span.open::before{transform:rotate(42deg);top:0}
.burger span.open::after{transform:rotate(-42deg);top:0}
.lang-select{position:relative}
.lang-select select{appearance:none;background:rgba(255,255,255,0.18);color:#fff;border:1px solid rgba(255,255,255,0.42);padding:6px 34px 6px 16px;border-radius:18px;font-weight:600;font-size:.72rem;letter-spacing:.5px;backdrop-filter:blur(6px);cursor:pointer;transition:background .35s,border-color .35s;min-height:32px}
.lang-select select:hover{background:rgba(255,255,255,0.28)}
.lang-select:after{content:"";position:absolute;pointer-events:none;top:50%;right:14px;width:9px;height:9px;border-right:2px solid #fff;border-bottom:2px solid #fff;transform:translateY(-55%) rotate(45deg);opacity:.9}

/* Overlay */
.mobile-overlay{position:fixed;inset:0;background:linear-gradient(180deg,rgba(21,16,19,0.68) 0%,rgba(21,16,19,0.42) 32%,rgba(21,16,19,0.18) 64%,rgba(21,16,19,0.05) 100%);backdrop-filter:blur(18px) saturate(170%);display:flex;align-items:flex-start;justify-content:center;z-index:999;animation:overlayIn .35s ease;overflow-y:auto;will-change:opacity}
.mobile-panel{width:100%;background:transparent;padding:60px 0 60px;display:flex;flex-direction:column;align-items:center;gap:34px;position:relative;min-height:100%}
@media (max-width:640px){.mobile-panel{gap:38px}}
.m-links{display:flex;flex-direction:column;gap:22px;font-size:clamp(1.35rem,4.8vw,2rem);font-weight:650;letter-spacing:.5px;line-height:1.07;margin:6px 0 0;color:#fff;text-shadow:0 2px 4px rgba(0,0,0,.25);align-items:center;text-align:center}
.m-links a{color:#fff;text-decoration:none;position:relative;padding-left:2px;letter-spacing:.5px}
.m-links a:after{content:"";position:absolute;left:0;bottom:-6px;width:0;height:2px;background:linear-gradient(90deg,#ffe5f8,#f7d6c8);transition:width .45s}
.m-links a:hover:after,.m-links a:focus-visible:after{width:100%}
.m-social{display:flex;gap:22px;flex-wrap:wrap;margin-top:4px;filter:drop-shadow(0 4px 12px rgba(0,0,0,.25))}
.m-social .icon-img{width:50px;height:50px;background:rgba(255,255,255,0.18);border-radius:16px;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:background .4s,transform .4s,box-shadow .4s}
.m-social .icon-img:hover{background:rgba(255,255,255,0.32);transform:translateY(-4px);box-shadow:0 10px 34px -12px rgba(0,0,0,.5)}
.m-social img{width:100%;height:100%;object-fit:cover}
.m-close{position:absolute;top:18px;right:18px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.35);display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(6px);transition:background .35s,transform .35s,box-shadow .35s}
@media (max-width:640px){.m-close{width:40px;height:40px;top:14px;right:14px}}
.m-close:hover{background:rgba(255,255,255,0.28);transform:translateY(-2px);box-shadow:0 6px 20px -6px rgba(0,0,0,.45)}
.m-close span{position:relative;display:block;width:20px;height:2.4px;background:transparent}
.m-close span:before,.m-close span:after{content:"";position:absolute;left:0;top:0;width:20px;height:2.4px;background:#fff;border-radius:2px}
.m-close span:before{transform:rotate(45deg)}
.m-close span:after{transform:rotate(-45deg)}
.mm-fade-enter-active,.mm-fade-leave-active{transition:opacity .35s ease}
.mm-fade-enter-from,.mm-fade-leave-to{opacity:0}
@keyframes overlayIn{from{opacity:0}to{opacity:1}}
</style>
