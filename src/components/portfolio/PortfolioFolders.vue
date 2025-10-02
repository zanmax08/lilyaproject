<template>
  <section class="portfolio-folders" v-reveal>
    <div class="pf-inner">
      <div class="pf-header" v-reveal="{mode:'up',delay:40}">
        <h2 class="pf-title"><span>{{ headingTop }}</span><br/>{{ headingBottom }}</h2>
      </div>
            <ul class="pf-grid" v-reveal="{mode:'up',delay:120}">
              <li v-for="f in normalizedFolders" :key="f.key" class="pf-item" @click="$emit('select', f)" tabindex="0" @keydown.enter.prevent="$emit('select', f)">
                <div class="icon-wrap"><img :src="folderIcon" alt="folder icon" loading="lazy" /></div>
                <span class="label">{{ f.label }}</span>
              </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { computed } from 'vue'
import { t } from '@/i18n'
export default {
  name:'PortfolioFolders',
  props:{
    folders:{ type:Array, default:()=>[] },
    headingTop:{ type:String, default:'' },
    headingBottom:{ type:String, default:'' }
  },
  setup(props){
    const folderIcon = '/folder.PNG'
    const translations = computed(()=>{
      const arr = t('folders', [])
      return Array.isArray(arr)? arr: []
    })
    const normalizedFolders = computed(()=>{
      return props.folders.map(f => {
        if(f.label) return f
        const tr = translations.value.find(x=>x.key===f.key)
        return tr ? { ...f, label: tr.label } : { ...f, label: f.key }
      })
    })
    return { folderIcon, normalizedFolders }
  }
}
</script>
<style scoped>
.portfolio-folders{--pad:clamp(1.25rem,4vw,3.2rem);padding:calc(var(--pad)*0.85) var(--pad) calc(var(--pad)*2.2);background:
  radial-gradient(circle at 55% 0%,rgba(180,130,255,.20),rgba(255,255,255,0) 68%),
  linear-gradient(180deg,#fbf8f6 0%,#fefefe 100%);border-radius:var(--radius-xl);overflow:hidden}
.pf-inner{max-width:1140px;margin:0 auto}
.pf-header{text-align:center;margin:-.35rem 0 1.75rem}
.pf-title{margin:0;font-size:clamp(1.9rem,4.2vw,2.75rem);line-height:1.04;font-weight:750;letter-spacing:.5px}
.pf-title span{font-weight:400;letter-spacing:2px;opacity:.9}
.pf-grid{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:2.2rem;padding:0;margin:0;justify-items:center}
.pf-item{display:flex;flex-direction:column;align-items:center;gap:.55rem;cursor:pointer;outline:none;position:relative;transition:transform .45s cubic-bezier(.16,.8,.3,1),filter .4s}
.pf-item:focus-visible{box-shadow:0 0 0 3px rgba(90,70,255,.35);border-radius:26px}
.pf-item:hover{transform:translateY(-6px)}
.icon-wrap{width:95px;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;position:relative;border-radius:28px;padding:6px;background:linear-gradient(145deg,#fff,#f2e9ff);box-shadow:0 6px 18px -6px rgba(0,0,0,.18)}
.icon-wrap img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 4px 10px rgba(0,0,0,.15));border-radius:22px}
.label{text-align:center;font-size:.9rem;letter-spacing:.5px;font-weight:500;text-transform:none}
@media (max-width:640px){.pf-grid{gap:1.6rem}.icon-wrap{width:84px;border-radius:22px;padding:5px}.pf-title{font-size:clamp(1.8rem,7vw,2.4rem)}}
</style>
