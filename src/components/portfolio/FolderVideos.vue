<template>
  <section class="folder-videos" v-reveal>
    <div class="fv-inner">
      <div class="fv-bar">
  <button class="back" @click="goBack" :aria-label="t('portfolioUI.back','Back')">←</button>
  <h2 class="fv-title">{{ translatedLabel }}</h2>
      </div>
      <div class="fv-grid">
        <div v-for="(v,i) in videos" :key="i" class="fv-item">
          <div class="thumb" @click="openVideo(v)" role="button" :aria-label="t('portfolioUI.play','Play') + ' ' + altFor(v,i)">
            <img :src="v.thumb" :alt="altFor(v,i)" loading="lazy" />
            <button class="play" @click.stop="openVideo(v)" :aria-label="t('portfolioUI.play','Play')">▶</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeVideo" class="video-modal" @click.self="closeVideo">
      <div class="vm-content">
        <button class="vm-close" @click="closeVideo" aria-label="Close video">×</button>
        <video :src="activeVideo.src" controls autoplay playsinline></video>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, computed } from 'vue'
import { t } from '@/i18n'
import { useRouter } from 'vue-router'
export default {
  name:'FolderVideos',
  props:{ folder:{type:String,default:''}, videos:{type:Array,default:()=>[]}},
  setup(props, { emit }){
    const router = useRouter()
    const activeVideo = ref(null)
    function openVideo(v){ activeVideo.value = v }
    function closeVideo(){ activeVideo.value = null }
    const translatedLabel = computed(()=>{
      // find folder translation by key
      const list = t('folders', [])
      if(Array.isArray(list)){
        const f = list.find(x=>x.key===props.folder)
        if(f && f.label) return f.label
      }
      return props.folder
    })
    function altFor(v,i){
      const pattern = t('portfolioUI.videoAltPattern','{label} video {index}')
      return pattern
        .replace('{label}', translatedLabel.value)
        .replace('{index}', (v.index || (i+1)))
    }
    function goBack(){
      // keep emit for legacy parent usage
      emit('back')
      router.push('/portfolio')
    }
    return { activeVideo, openVideo, closeVideo, translatedLabel, altFor, goBack, t }
  }
}
</script>
<style scoped>
.folder-videos{--pad:clamp(1.25rem,3.6vw,3rem);padding:calc(var(--pad)*1.6) var(--pad) calc(var(--pad)*2.2);background:linear-gradient(180deg,#fbf8f6 0%,#f5efea 100%);border-radius:var(--radius-xl);overflow:hidden}
.fv-inner{max-width:1100px;margin:0 auto}
.fv-bar{display:flex;align-items:center;gap:1.2rem;margin:0 0 1.8rem}
.back{background:#fff;border:1px solid #e4d8d0;border-radius:10px;padding:.55rem .9rem;font-size:.9rem;font-weight:600;cursor:pointer;box-shadow:0 4px 14px -6px rgba(0,0,0,.18);transition:background .3s,transform .4s}
.back:hover{background:#fffdfc;transform:translateY(-3px)}
.fv-title{margin:0;font-size:clamp(1.8rem,4vw,2.4rem);font-weight:650;letter-spacing:.5px}
.fv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:2.4rem}
@media (max-width:780px){.fv-grid{gap:1.6rem;grid-template-columns:repeat(auto-fill,minmax(155px,1fr))}}
.fv-item .thumb{position:relative;border-radius:var(--radius-card);overflow:hidden;aspect-ratio:9/16;background:linear-gradient(180deg,#c68fc1,#d6b0d2);box-shadow:0 16px 50px -18px rgba(0,0,0,.28);transition:transform .55s cubic-bezier(.16,.8,.3,1),box-shadow .55s}
.fv-item:hover .thumb{transform:translateY(-10px);box-shadow:0 28px 70px -24px rgba(0,0,0,.42)}
.fv-item img{width:100%;height:100%;object-fit:cover;display:block;opacity:.12;mix-blend-mode:luminosity;transition:opacity .6s}
.fv-item:hover img{opacity:.22}
.fv-item .play{position:absolute;inset:auto auto 1.25rem 1.25rem;background:#fff;border:none;border-radius:999px;padding:.85rem 1rem;font-size:.9rem;cursor:pointer;font-weight:600;box-shadow:0 4px 12px -4px rgba(0,0,0,.36);transition:background .25s,transform .3s}
.fv-item .play:hover{background:#fff;transform:scale(1.1)}
@media (max-width:600px){.fv-item .thumb{aspect-ratio:9/15;border-radius:var(--radius-lg)}.fv-item .play{inset:auto auto .85rem .85rem;padding:.6rem .75rem;font-size:.78rem}}

/* Simple modal */
.video-modal{position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:90;padding:1.5rem}
.vm-content{position:relative;width:100%;max-width:560px;background:#111;border-radius:18px;box-shadow:0 18px 60px -10px rgba(0,0,0,.55);padding:1rem}
.vm-close{position:absolute;top:.35rem;right:.55rem;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:10px;padding:.35rem .65rem;font-size:1.1rem;cursor:pointer;line-height:1;backdrop-filter:blur(4px);}
.vm-close:hover{background:rgba(255,255,255,.25)}
.vm-content video{width:100%;height:auto;max-height:70vh;display:block;border-radius:8px;background:#000}
</style>
