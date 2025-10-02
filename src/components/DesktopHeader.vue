<template>
  <header class="desk-header" v-reveal:fade>
    <div class="inner">
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
      <div class="right" v-reveal="{mode:'right',delay:200}">
        <div class="social" aria-label="social links">
          <a href="https://www.instagram.com/lilyacreates?igsh=NHk5bGVuZGM2ZnA%3D&utm_source=qr" target="_blank" rel="noopener" aria-label="Instagram" class="s-icon">
            <img src="/inst.png" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@lilyacreates?_t=ZT-90C6nnZuP4Y&_r=1" target="_blank" rel="noopener" aria-label="TikTok" class="s-icon">
            <img src="/tt.png" alt="TikTok" />
          </a>
            <a href="https://youtube.com/@lilyacreates?si=-WiNnQbngE96mzoU" target="_blank" rel="noopener" aria-label="YouTube" class="s-icon">
            <img src="/yt.png" alt="YouTube" />
          </a>
          <a href="https://www.facebook.com/share/1787UTd9yF/?mibextid=wwXIfr" target="_blank" rel="noopener" aria-label="Facebook" class="s-icon">
            <img src="/fb.png" alt="Facebook" />
          </a>
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
  </header>
</template>

<script>
import { t, lang, setLang } from '../i18n'
import { ref, watch } from 'vue'
export default {
  name: 'DesktopHeader',
  setup(){
    const langLocal = ref(lang.value)
    watch(langLocal, v=> setLang(v))
    return { t, langLocal, onLangChange: ()=> setLang(langLocal.value) }
  }
}
</script>

<style scoped>
.desk-header{padding:6px 0;background:var(--header-gradient);color:#fff;position:sticky;top:0;z-index:60;box-shadow:0 2px 6px -4px rgba(0,0,0,.25);border-radius:22px;margin:10px 10px 0}
.inner{display:flex;align-items:center;justify-content:space-between;max-width:1180px;margin:0 auto;padding:0 28px;min-height:60px}
.brand{display:flex;align-items:center;gap:18px}
.tag{color:rgba(255,255,255,0.9);font-size:.9rem;font-weight:500;letter-spacing:.35px;white-space:nowrap;text-shadow:0 2px 4px rgba(0,0,0,.25)}
@media (min-width:1180px){.tag{font-size:1rem}}
.logo{height:54px;display:block}
@media (min-width:1200px){.logo{height:62px}}
.logo-link{display:block;line-height:0}
.logo-link:focus-visible{outline:2px solid #fff;outline-offset:4px;border-radius:8px}
.main-nav{color:rgba(255,255,255,0.92);font-weight:500}
.main-nav a{color:inherit;margin:0 .75rem;text-decoration:none;position:relative}
.main-nav a:after{content:"";position:absolute;left:0;bottom:-6px;height:2px;width:0;background:rgba(255,255,255,.65);transition:width .4s}
.main-nav a:hover:after,.main-nav a:focus-visible:after{width:100%}
.sep{color:rgba(255,255,255,0.45);margin:0 .5rem}
.right{display:flex;align-items:center;gap:22px}
.social{display:flex;align-items:center;gap:12px}
.s-icon{display:inline-flex;width:40px;height:40px;border-radius:14px;background:rgba(255,255,255,0.16);backdrop-filter:blur(6px);overflow:hidden;transition:background .35s,transform .35s,box-shadow .35s}
.s-icon:hover{background:rgba(255,255,255,0.28);transform:translateY(-3px);box-shadow:0 6px 18px -6px rgba(0,0,0,.4)}
.s-icon img{width:100%;height:100%;object-fit:cover;mix-blend-mode:multiply}
.lang-select select{appearance:none;background:rgba(255,255,255,0.18);color:#fff;border:1px solid rgba(255,255,255,0.42);padding:10px 40px 10px 20px;border-radius:26px;font-weight:600;font-size:.8rem;letter-spacing:.5px;backdrop-filter:blur(6px);cursor:pointer;transition:background .35s,border-color .35s}
.lang-select select:hover{background:rgba(255,255,255,0.28)}
.lang-select select:focus-visible{outline:2px solid rgba(255,255,255,.85);outline-offset:3px}
.lang-select{position:relative}
.lang-select:after{content:"";position:absolute;pointer-events:none;top:50%;right:18px;width:9px;height:9px;border-right:2px solid #fff;border-bottom:2px solid #fff;transform:translateY(-55%) rotate(45deg);opacity:.9}
@media (max-width:900px){.desk-header{display:none}}
</style>
