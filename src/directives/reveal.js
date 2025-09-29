// v-reveal directive: adds .reveal class and toggles .is-visible when in viewport
const defaultOptions = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }

let observer
function getObserver(){
  if(observer) return observer
  observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const el = entry.target
      if(entry.isIntersecting){
        requestAnimationFrame(()=>{
          el.classList.add('is-visible')
        })
        // once visible stop observing
        observer.unobserve(el)
      }
    })
  }, defaultOptions)
  return observer
}

export default {
  mounted(el, binding){
    el.classList.add('reveal')
    const mode = binding.value && binding.value.mode || binding.arg || 'up'
    if(mode) el.dataset.reveal = mode
    // delay
    const delay = binding.value && binding.value.delay
    if(typeof delay === 'number'){
      el.style.setProperty('--reveal-delay', `${delay}ms`)
      el.dataset.delay = delay
    }
    getObserver().observe(el)
  }
}
