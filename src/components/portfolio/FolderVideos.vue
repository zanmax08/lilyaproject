<template>
  <section class="folder-videos" v-reveal>
    <div class="fv-inner">
      <div class="fv-bar">
        <button class="back" @click="goBack" :aria-label="t('portfolioUI.back','Back')">←</button>
        <h2 class="fv-title">{{ translatedLabel }}</h2>
      </div>
      <div class="fv-grid">
     <div v-for="(v,i) in videos" :key="i" class="fv-item"
       @mouseenter="startHover(v,i,$event)" @mouseleave="stopHover(v,i,$event)">
          <div
            v-if="!isActive(v)"
            class="thumb"
            :data-src="v.src"
            :ref="el => itemEls[i] = el"
            @click="openVideo(v)"
            role="button"
            :aria-label="t('portfolioUI.play','Play') + ' ' + altFor(v,i)"
          >
            <img :src="previewSrc(v)" :alt="altFor(v,i)" :class="{ placeholder: !hasGenerated(v), 'is-hovering': hoverVideo && hoverVideo.src===v.src }" loading="lazy" decoding="async" fetchpriority="low" />
            <div v-if="hoverVideo && hoverVideo.src===v.src" class="hover-preview" :aria-hidden="true">
              <video :src="v.mini || v.src" muted playsinline autoplay loop preload="metadata"></video>
            </div>
            <button class="play" @click.stop="openVideo(v)" :aria-label="t('portfolioUI.play','Play')">▶</button>
          </div>
          <div v-else class="inline-player">
            <video
              ref="activeEl"
              :src="v.src"
              controls
              autoplay
              playsinline
              preload="metadata"
              @ended="closeVideo"
            ></video>
            <button class="inline-close" @click="closeVideo" :aria-label="t('portfolioUI.back','Back')">×</button>
          </div>
          <div class="fv-name" :title="fileBase(v.src)">{{ fileBase(v.src) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { t } from '@/i18n'
import { useRouter } from 'vue-router'
export default {
  name:'FolderVideos',
  props:{ folder:{type:String,default:''}, videos:{type:Array,default:()=>[]}},
  setup(props, { emit }){
    const router = useRouter()
    const activeVideo = ref(null)
    const generatedThumbs = ref({}) // src -> dataURL
  const observer = ref(null)
    const itemEls = ref([]) // element refs for thumbs
  const hoverVideo = ref(null)
  let hoverTimer = null

    function openVideo(v){
      activeVideo.value = v
    }
    function closeVideo(){
      activeVideo.value = null
    }
    function isActive(v){ return activeVideo.value && activeVideo.value.src === v.src }
    let hoverEnabled = false
    // enable hover previews after initial settling
    setTimeout(()=>{ hoverEnabled = true }, 1200)

    function startHover(v,i,evt){
      if(isActive(v)) return
      if(!hoverEnabled) return
      if(window.matchMedia('(hover: none)').matches) return // skip touch devices
      clearTimeout(hoverTimer)
      hoverTimer = setTimeout(()=>{ hoverVideo.value = v }, 180)
    }
    function stopHover(v,i,evt){
      clearTimeout(hoverTimer)
      hoverTimer = null
      if(hoverVideo.value && hoverVideo.value.src === v.src){
        hoverVideo.value = null
      }
    }
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

    function hasGenerated(v){ return !!generatedThumbs.value[v.src] }
    function previewSrc(v){ return generatedThumbs.value[v.src] || v.thumb || '/glscreen.png' }

    function restoreCache(){
      props.videos.forEach(v=>{
        try {
          const cached = localStorage.getItem('pv:'+v.src)
          if(cached){
            generatedThumbs.value = { ...generatedThumbs.value, [v.src]: cached }
          }
        } catch(e){}
      })
    }

  const queue = []
  let activeCount = 0
  const MAX_CONCURRENT = window.matchMedia('(max-width:640px)').matches ? 1 : 2

    function runNext(){
      if(activeCount >= MAX_CONCURRENT) return
      const job = queue.shift()
      if(!job) return
      activeCount++
      job(()=>{ activeCount--; runNext() })
    }

    function schedule(job){
      queue.push(job)
      requestIdleCallback ? requestIdleCallback(()=>runNext(), { timeout: 1800 }) : setTimeout(runNext, 50)
    }

    function generatePreview(src){
      if(generatedThumbs.value[src]) return
      schedule((done)=>{
      const video = document.createElement('video')
      video.src = src
      video.muted = true
      video.playsInline = true
      let captured = false
      const cleanup = ()=>{
        video.removeEventListener('loadeddata', onLoaded)
        video.removeEventListener('seeked', onSeeked)
        video.remove()
        done()
      }
      function capture(){
        if(captured) return
        captured = true
        try {
          const w = video.videoWidth, h = video.videoHeight
            if(!w || !h) throw new Error('no dims')
          const maxW = 260 // reduce thumbnail width for faster generation
          let dw = w, dh = h
          if(w > maxW){ const r = maxW / w; dw = Math.round(w*r); dh = Math.round(h*r) }
          const canvas = document.createElement('canvas')
          canvas.width = dw; canvas.height = dh
          const ctx = canvas.getContext('2d')
          ctx.drawImage(video, 0, 0, dw, dh)
          const data = canvas.toDataURL('image/jpeg', 0.55)
          generatedThumbs.value = { ...generatedThumbs.value, [src]: data }
          try { localStorage.setItem('pv:'+src, data) } catch(e){}
        } catch(e){}
        cleanup()
      }
      function onLoaded(){
        try {
          const target = Math.min(0.4, (video.duration||1)*0.05)
          video.currentTime = target
        } catch(e){ /* ignore */ }
      }
      function onSeeked(){ capture() }
      video.addEventListener('loadeddata', onLoaded)
      video.addEventListener('seeked', onSeeked)
      setTimeout(()=>capture(), 4500) // fallback
    })
    }

    function setupObserver(){
      if(typeof IntersectionObserver === 'undefined'){
        props.videos.forEach(v=>generatePreview(v.src))
        return
      }
      const init = () => {
        observer.value = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if(entry.isIntersecting){
              const src = entry.target.getAttribute('data-src')
              generatePreview(src)
              observer.value.unobserve(entry.target)
            }
          })
        }, { rootMargin: '40px 0px' })
        nextTick(()=>{
          itemEls.value.forEach(el=>{ if(el) observer.value.observe(el) })
        })
      }
      if('requestIdleCallback' in window){ requestIdleCallback(init, { timeout: 1200 }) } else { setTimeout(init, 300) }
    }

    onMounted(()=>{
      restoreCache()
      setupObserver()
    })
    onBeforeUnmount(()=>{ if(observer.value) observer.value.disconnect() })
    watch(()=>props.videos, ()=>{
      if(observer.value) observer.value.disconnect()
      itemEls.value = []
      setupObserver()
    })

    function fileBase(src){
      try{
        const name = (src||'').split('/').pop() || ''
        return name.replace(/\.[^/.]+$/, '')
      }catch(e){ return src }
    }

    return { activeVideo, openVideo, closeVideo, translatedLabel, altFor, goBack, t, previewSrc, hasGenerated, itemEls, isActive, startHover, stopHover, hoverVideo, fileBase }
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
.fv-item .thumb{position:relative;border-radius:56px;overflow:hidden;aspect-ratio:9/16;background:transparent;box-shadow:0 18px 60px -20px rgba(0,0,0,.18);transition:transform .55s cubic-bezier(.16,.8,.3,1),box-shadow .55s;cursor:pointer}
.fv-item:hover .thumb{transform:translateY(-10px);box-shadow:0 28px 70px -24px rgba(0,0,0,.42)}
.inline-player{position:relative;border-radius:56px;overflow:hidden;aspect-ratio:9/16;box-shadow:0 26px 70px -26px rgba(0,0,0,.25);background:transparent;display:flex}
.inline-player video{width:100%;height:100%;object-fit:cover;display:block}
.inline-close{position:absolute;top:.4rem;right:.45rem;background:#fff;color:#111;border:1px solid rgba(0,0,0,.12);border-radius:8px;padding:.25rem .55rem;font-size:1rem;line-height:1;cursor:pointer}
.inline-close:hover{background:#fff}
.fv-item img{width:100%;height:100%;object-fit:cover;display:block;transition:opacity .6s,filter .6s}
.fv-item img.placeholder{opacity:.14;mix-blend-mode:luminosity;filter:saturate(40%)}
.fv-item:hover img.placeholder{opacity:.24}
.fv-item .play{position:absolute;inset:auto auto 1.25rem 1.25rem;background:#fff;border:none;border-radius:999px;padding:.85rem 1rem;font-size:.9rem;cursor:pointer;font-weight:600;box-shadow:0 4px 12px -4px rgba(0,0,0,.36);transition:background .25s,transform .3s}
.fv-item .play:hover{background:#fff;transform:scale(1.1)}
/* filename below each item */
.fv-name{margin-top:.55rem;font-size:.86rem;line-height:1.2;color:#2b2b2b;text-align:center;letter-spacing:.2px;word-break:break-word}
/* Hover preview layer */
.hover-preview{position:absolute;inset:0;display:flex;animation:fadeIn .35s ease forwards}
.hover-preview video{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.95) saturate(110%);}
@keyframes fadeIn{from{opacity:0;transform:scale(1.04)}to{opacity:1;transform:scale(1)} }
@media (hover:none){ .hover-preview{display:none!important} }
@media (max-width:900px){.fv-item .thumb,.inline-player{border-radius:48px}}
@media (max-width:720px){.fv-item .thumb,.inline-player{border-radius:42px}}
@media (max-width:600px){.fv-item .thumb{aspect-ratio:9/15;border-radius:38px}.inline-player{border-radius:38px}.fv-item .play{inset:auto auto .85rem .85rem;padding:.6rem .75rem;font-size:.78rem}}
@media (max-width:480px){.fv-item .thumb,.inline-player{border-radius:32px}}

/* Modal styles removed (inline playback now) */
</style>
