<template>
  <section class="video-examples" v-reveal>
    <div class="vx-inner">
      <div class="vx-header">
        <h2 class="vx-title" v-reveal="{mode:'left',delay:40}">
          <span>{{ t('portfolioPage.examples.video') }}</span> {{ t('portfolioPage.examples.examples') }}
        </h2>
        <div class="vx-text" v-reveal="{mode:'right',delay:120}" v-html="t('portfolioPage.examples.lead')"></div>
      </div>
      <div class="vx-grid" v-reveal="{mode:'up',delay:160}">
        <div v-for="(item,i) in localItems" :key="i" class="vx-item" @mouseenter="startHover(item,i,$event)" @mouseleave="stopHover(item,i,$event)">
          <div v-if="!isActive(item)" class="thumb" :data-src="item.src" :ref="el => thumbEls[i] = el" @click="playInline(item)">
            <img :src="displayThumb(item)" :alt="item.alt || (t('portfolioPage.examples.video') + ' ' + (i+1))" :class="{ placeholder: !hasPreview(item), 'is-hovering': hoverItem && hoverItem.src===item.src }" loading="lazy" decoding="async" :fetchpriority="i<2 ? 'high' : 'low'" @error="e=>{ if(e.target && !e.target._fallback){ e.target._fallback=true; e.target.src='/glscreen.png' } }" />
            <div v-if="hoverItem && hoverItem.src===item.src" class="hover-preview" aria-hidden="true">
              <video :src="item.mini || item.src" muted playsinline autoplay loop preload="metadata"></video>
            </div>
            <button class="play" @click.stop="playInline(item)" :aria-label="t('portfolioPage.examples.play')">▶</button>
          </div>
          <div v-else class="inline-player">
            <video :src="item.src" controls autoplay playsinline preload="metadata" @ended="closeActive" />
            <button class="inline-close" @click="closeActive" :aria-label="t('portfolioUI.back','Back')">×</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { t } from '@/i18n'
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name:'VideoExamples',
  props:{ items:{type:Array,default:()=>[]} },
  setup(props){
  const router = useRouter()
  const localItems = ref(props.items.map(v=>({ ...v })))
  const previews = ref({}) // src -> dataURL
  const active = ref(null)
  const hoverItem = ref(null)
  let hoverTimer = null
    const thumbEls = ref([])
    const observer = ref(null)

    function hasPreview(item){ return !!previews.value[item.src] }
    function displayThumb(item){ return previews.value[item.src] || item.thumb || '/glscreen.png' }

  const q = []
  let running = 0
  const MAX = window.matchMedia('(max-width:640px)').matches ? 1 : 2
    function step(){
      if(running>=MAX) return
      const job = q.shift(); if(!job) return
      running++
      job(()=>{ running--; step() })
    }
    function schedule(job){
      q.push(job)
      requestIdleCallback ? requestIdleCallback(()=>step(), { timeout:1600 }) : setTimeout(step,40)
    }

    function generate(src){
      if(previews.value[src]) return
      schedule((done)=>{
      const video = document.createElement('video')
      video.src = src
      video.muted = true
      video.playsInline = true
      let captured = false
      const cleanup=()=>{
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
          if(!w||!h) throw new Error('no dims')
          const maxW = 220
          let dw=w, dh=h
          if(w>maxW){ const r=maxW/w; dw=Math.round(w*r); dh=Math.round(h*r) }
          const canvas=document.createElement('canvas')
          canvas.width=dw; canvas.height=dh
          const ctx=canvas.getContext('2d')
          ctx.drawImage(video,0,0,dw,dh)
          const data=canvas.toDataURL('image/jpeg',0.55)
          previews.value = { ...previews.value, [src]: data }
        }catch(e){}
        cleanup()
      }
      function onLoaded(){
        try{ video.currentTime = Math.min(0.35,(video.duration||1)*0.05) }catch(e){}
      }
      function onSeeked(){ capture() }
      video.addEventListener('loadeddata', onLoaded)
      video.addEventListener('seeked', onSeeked)
      setTimeout(()=>capture(), 4000)
    })
    }

    function setupObserver(){
      if(typeof IntersectionObserver==='undefined'){
        localItems.value.forEach(i=>generate(i.src))
        return
      }
      const init = () => {
        observer.value = new IntersectionObserver(entries => {
          entries.forEach(e=>{
            if(e.isIntersecting){
              const src = e.target.getAttribute('data-src')
              generate(src)
              observer.value.unobserve(e.target)
            }
          })
        }, { rootMargin: '40px 0px' })
        nextTick(()=>{ thumbEls.value.forEach(el=>{ if(el) observer.value.observe(el) }) })
      }
      if('requestIdleCallback' in window){ requestIdleCallback(init, { timeout:1100 }) } else { setTimeout(init,260) }
    }

    function isActive(item){ return active.value && active.value.src === item.src }
    function playInline(item){ active.value = item; hoverItem.value = null }
    function closeActive(){ active.value = null }
    let hoverReady = false
    setTimeout(()=>hoverReady=true, 1200)
    function startHover(item,i,e){
      if(isActive(item)) return
      if(window.matchMedia('(hover: none)').matches) return
      if(!hoverReady) return
      clearTimeout(hoverTimer)
      hoverTimer = setTimeout(()=>{ hoverItem.value = item },170)
    }
    function stopHover(item,i,e){
      clearTimeout(hoverTimer)
      hoverTimer = null
      if(hoverItem.value && hoverItem.value.src === item.src){ hoverItem.value = null }
    }

    onMounted(()=> setupObserver())
    onBeforeUnmount(()=>{ if(observer.value) observer.value.disconnect() })
    watch(()=>props.items, (nv)=>{
      localItems.value = nv.map(v=>({ ...v }))
      if(observer.value) observer.value.disconnect()
      thumbEls.value = []
      setupObserver()
    })

    return { t, localItems, thumbEls, displayThumb, hasPreview, playInline, isActive, closeActive, startHover, stopHover, hoverItem }
  }
}
</script>
<style scoped>
.video-examples{--pad:clamp(1.25rem,3.6vw,3rem);background:
  linear-gradient(180deg,#fbf8f6 0%,#f5efea 100%);
  padding:calc(var(--pad)*1.8) var(--pad) calc(var(--pad)*2.2);position:relative}
.vx-inner{max-width:1100px;margin:0 auto}
.vx-header{display:grid;grid-template-columns:minmax(240px,320px) 1fr;gap:2.4rem;margin:0 0 2.2rem;align-items:start}
@media (max-width:860px){.vx-header{grid-template-columns:1fr;gap:1.25rem}}
.vx-title{margin:0;font-size:clamp(2rem,4.4vw,2.6rem);line-height:1.06;letter-spacing:.4px;font-weight:650;display:flex;flex-wrap:wrap;gap:.5ch}
.vx-title span{font-weight:300;opacity:.85}
.vx-text{background:#fff;padding:.7rem 1rem .78rem;border-radius:38px;font-size:.9rem;line-height:1.38;border:1px solid #e5d8cf;box-shadow:0 3px 14px -6px rgba(0,0,0,.08);display:inline-block;width:-moz-fit-content;width:fit-content;max-width:100%;margin:0 0 0 0}
@media (min-width:861px){.vx-text{margin-left:0;margin-right:auto}}
@media (max-width:860px){.vx-text{display:block;width:100%;border-radius:22px;margin:0}}
.vx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:1.4rem}
@media (min-width:640px){.vx-grid{grid-template-columns:repeat(auto-fill,minmax(170px,1fr))}}
.vx-item .thumb{position:relative;border-radius:28px;overflow:hidden;aspect-ratio:9/16;background:transparent;box-shadow:0 8px 28px -10px rgba(0,0,0,.18);transition:transform .55s cubic-bezier(.16,.8,.3,1),box-shadow .55s}
.vx-item:hover .thumb{transform:translateY(-6px);box-shadow:0 14px 40px -12px rgba(0,0,0,.36)}
.vx-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .55s,filter .6s,opacity .5s}
.vx-item img.placeholder{filter:saturate(65%) blur(0);opacity:.55}
.vx-item:hover img{transform:translateY(-4px)}
.vx-item .play{position:absolute;inset:auto auto .55rem .55rem;background:rgba(255,255,255,.94);border:none;border-radius:999px;padding:.55rem .72rem;font-size:.78rem;cursor:pointer;font-weight:600;box-shadow:0 2px 6px -2px rgba(0,0,0,.3);transition:background .25s,transform .3s}
.vx-item .play:hover{background:#fff;transform:scale(1.1)}
/* inline player */
.inline-player{position:relative;border-radius:28px;overflow:hidden;aspect-ratio:9/16;box-shadow:0 16px 44px -16px rgba(0,0,0,.22);background:transparent;display:flex}
.inline-player video{width:100%;height:100%;object-fit:cover;display:block}
.inline-close{position:absolute;top:.4rem;right:.45rem;background:#fff;color:#111;border:1px solid rgba(0,0,0,.12);border-radius:8px;padding:.25rem .55rem;font-size:1rem;line-height:1;cursor:pointer}
.inline-close:hover{background:#fff}
/* hover preview */
.hover-preview{position:absolute;inset:0;display:flex;animation:fadeIn .35s ease forwards}
.hover-preview video{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.97) saturate(110%)}
@keyframes fadeIn{from{opacity:0;transform:scale(1.035)}to{opacity:1;transform:scale(1)}}
@media (hover:none){ .hover-preview{display:none!important} }
@media (max-width:860px){.vx-item .thumb,.inline-player{border-radius:24px}}
@media (max-width:640px){.vx-item .thumb,.inline-player{border-radius:22px}}
@media (max-width:580px){.vx-item .thumb{aspect-ratio:9/15;border-radius:20px}.inline-player{border-radius:20px}}
</style>
