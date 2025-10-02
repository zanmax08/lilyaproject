
<template>
  <section class="contact-layout screen-fit" v-reveal:fade>
    <transition name="toast-fade">
      <div v-if="toastSuccess" class="toast success" role="status" aria-live="polite">
        <span class="icon">✔</span>
        <span class="text">{{ t('contactStatus.sent') }}</span>
      </div>
    </transition>
    <div class="contact-left">
      <h1 class="mega">
        <span class="block line1">{{ t('contact.drop') }}</span>
        <span class="block line2">{{ t('contact.your') }}</span>
        <span class="block line3">{{ t('contact.contactWord') }}</span>
      </h1>
      <p class="pitch" v-html="t('contact.pitch')"></p>
    </div>

    <form class="contact-form" @submit.prevent="send" novalidate>
      <div class="field">
        <label for="name">{{ t('contact.name') }}</label>
        <input id="name" v-model="name" :placeholder="t('contact.namePlaceholder')" required />
      </div>
      <div class="field">
        <label for="email">{{ t('contact.email') }}</label>
        <input id="email" v-model="email" type="email" :placeholder="t('contact.emailPlaceholder')" required />
      </div>
      <div class="field">
        <label for="messenger">{{ t('contact.messenger') }} <span class="opt">{{ t('contact.optional') }}</span></label>
        <input id="messenger" v-model="messenger" :placeholder="t('contact.messengerPlaceholder')" />
      </div>
      <div class="field span2">
        <label for="message">{{ t('contact.message') }}</label>
        <textarea id="message" v-model="message" :placeholder="t('contact.messagePlaceholder')" rows="5"></textarea>
      </div>
      <div class="actions span2">
  <button type="submit" class="send-btn hover-pop" :disabled="loading">{{ loading ? t('contactStatus.sending') : sent ? t('contactStatus.sent') : t('contact.submitNew') }}</button>
  <p v-if="sent && !error" class="sent-msg">{{ t('contact.thanks') }}</p>
  <p v-if="error" class="error-msg">{{ t('contactStatus.error') }}</p>
      </div>
    </form>
  </section>
</template>

<script>
import { t } from '../i18n'

export default {
  computed: {
    t() { return t }
  },
  data() {
  return { name: '', email: '', messenger: '', message: '', sent: false, loading: false, error: '', toastSuccess: false, toastTimer: null }
  },
  methods: {
    async send() {
      if (this.loading) return
      this.error = ''
      this.sent = false
      this.loading = true
      const payload = { name: this.name, email: this.email, messenger: this.messenger, message: this.message }
      try {
        const resp = await fetch('/.netlify/functions/send-telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        if (!resp.ok) throw new Error('bad status ' + resp.status)
        const data = await resp.json()
        if (!data.ok) throw new Error('telegram error')
        this.sent = true
        this.showToast()
        this.name = this.email = this.messenger = this.message = ''
      } catch (e) {
        this.error = e.message || 'error'
      } finally {
        this.loading = false
      }
    },
    showToast(){
      this.toastSuccess = true
      clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(()=>{ this.toastSuccess = false }, 4000)
    }
  },
}
</script>

<style scoped>
.contact-layout{--side:28px;--vpad-top:70px;--vpad-bottom:110px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:56px;max-width:1080px;margin:0 auto;padding:var(--vpad-top) var(--side) var(--vpad-bottom);align-items:start;position:relative}
@media (max-width:960px){
  .contact-layout{border-radius:46px 46px 42px 42px;background:linear-gradient(180deg,#ffffff,#fbf8fd);--side:24px;--vpad-top:60px;--vpad-bottom:96px}
}
@media (max-width:640px){
  .contact-layout{--side:20px;--vpad-top:54px;--vpad-bottom:86px;border-radius:40px}
}
@media (max-width:520px){
  .contact-layout{--side:18px;--vpad-top:48px;--vpad-bottom:78px;border-radius:34px;gap:48px}
}
@media (max-width:520px){
  .contact-form{padding:0 2px}
  input,textarea{border-radius:26px}
}
@supports(padding:max(env(safe-area-inset-top))){
  .contact-layout{padding-top:calc(var(--vpad-top) + env(safe-area-inset-top))}
}
.contact-left{max-width:480px}
.mega{font-size:clamp(2.5rem,7.2vw,5rem);line-height:.9;font-weight:600;letter-spacing:1px;margin:0 0 40px}
.mega .block{display:block}
.mega .line2{font-weight:300;letter-spacing:4px}
.mega .line3{font-weight:300;letter-spacing:6px}
.pitch{font-size:1.06rem;line-height:1.38;font-weight:400;max-width:380px;margin:0 0 4px}
.pitch strong{font-weight:700}

.contact-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:26px 34px;width:100%;max-width:760px}
.field{display:flex;flex-direction:column;gap:6px}
.field.span2{grid-column:1 / -1}
label{font-size:.85rem;font-weight:600;letter-spacing:.5px;text-transform:none}
label .opt{font-weight:400;font-size:.7rem;opacity:.55;margin-left:6px}
input,textarea{font:inherit;padding:13px 17px;border:1.5px solid #1a1a1a;border-radius:22px;background:#f7f7f8;outline:none;transition:border-color .25s,background .25s,box-shadow .35s;width:100%;max-width:100%}
input:focus,textarea:focus{border-color:#000;background:#fff;box-shadow:0 0 0 4px rgba(0,0,0,.07)}
textarea{resize:vertical;min-height:150px;border-radius:28px}
.actions{display:flex;flex-direction:column;align-items:center;gap:14px;margin-top:4px;position:relative}
.send-btn{cursor:pointer;border:2px solid #111;background:#111;color:#fff;padding:16px 68px;font-size:1.02rem;letter-spacing:2px;border-radius:56px;text-transform:lowercase;font-weight:600;transition:transform .4s,box-shadow .4s,background .4s;box-shadow:0 8px 26px -10px rgba(0,0,0,.5)}
.send-btn[disabled]{opacity:.55;cursor:not-allowed;transform:none}
.send-btn:hover:not([disabled]){transform:translateY(-3px);background:#1a1a1a;box-shadow:0 14px 38px -12px rgba(0,0,0,.5)}
.send-btn:active{transform:translateY(-1px)}
.send-btn:focus-visible{outline:3px solid #111;outline-offset:3px}
@media (prefers-reduced-motion:reduce){.send-btn{transition:none}.send-btn:hover,.send-btn:active{transform:none}}
.sent-msg{color:green;font-size:.8rem}
.error-msg{color:#c40000;font-size:.8rem}

@media (max-width:860px){
  .contact-layout{gap:48px}
  .contact-form{grid-template-columns:1fr;gap:24px}
  .send-btn{width:100%}
}
@media (max-width:640px){
  .mega{font-size:clamp(2.4rem,9vw,3.25rem);margin:0 0 24px}
  .pitch{font-size:1rem;line-height:1.34;max-width:380px}
  input,textarea{padding:12px 16px}
  .send-btn{padding:15px 56px;font-size:1rem}
}
@media (max-width:640px){
  .contact-layout{justify-items:center;text-align:center}
  .contact-left{max-width:520px}
  .mega{text-align:center}
  .pitch{margin-left:auto;margin-right:auto}
  .contact-form{justify-items:stretch}
  label{text-align:left}
}
@media (max-width:480px){
  .contact-layout{gap:38px}
  .mega{font-size:clamp(2.15rem,11vw,2.85rem)}
  .pitch{margin:0 0 4px}
  input,textarea{padding:11px 15px}
  .send-btn{padding:14px 0;font-size:.97rem;letter-spacing:1.4px}
}
/* Ultra-compact mode to ensure form fits within single viewport on short mobile screens */
@media (max-width:520px) and (max-height:760px){
  .contact-layout{--vpad-top:52px;--vpad-bottom:74px;gap:30px}
  .mega{margin:0 0 18px;font-size:clamp(2.05rem,10.4vw,2.6rem)}
  .pitch{font-size:.95rem;line-height:1.3;margin:0 0 2px}
  .contact-form{gap:20px}
  .field{gap:4px}
  label{font-size:.8rem}
  input,textarea{padding:10px 14px;font-size:.95rem;border-radius:20px}
  textarea{min-height:120px}
  .actions{margin-top:4px}
  .send-btn{padding:13px 0;font-size:.92rem;letter-spacing:1.2px;border-radius:50px}
}
@media (max-width:520px) and (max-height:660px){
  .contact-layout{--vpad-top:46px;--vpad-bottom:68px;gap:26px}
  .mega{margin:0 0 14px;font-size:clamp(1.9rem,10.8vw,2.4rem)}
  .pitch{display:none}
  .contact-form{gap:18px}
  input,textarea{padding:9px 13px;font-size:.9rem}
  textarea{min-height:110px}
  .send-btn{padding:12px 0;font-size:.9rem}
}
@media (max-width:520px) and (max-height:600px){
  .mega{font-size:clamp(1.75rem,11.2vw,2.2rem)}
  textarea{min-height:100px}
  .contact-layout{--vpad-top:42px;--vpad-bottom:60px;gap:22px}
  .send-btn{padding:11px 0}
}

@media (prefers-reduced-motion:reduce){
  .send-btn{transition:none}
}

/* Toast styles */
.toast{position:fixed;top:18px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#14b45c,#0a6e2c);color:#fff;padding:14px 22px;border-radius:14px;display:flex;align-items:center;gap:10px;font-size:.95rem;font-weight:500;box-shadow:0 10px 28px -10px rgba(0,0,0,0.35),0 2px 8px rgba(0,0,0,0.25);z-index:1000}
.toast .icon{font-size:1.1rem;line-height:1}
.toast-fade-enter-active,.toast-fade-leave-active{transition:opacity .45s,transform .45s}
.toast-fade-enter-from,.toast-fade-leave-to{opacity:0;transform:translate(-50%,-12px)}
@media (max-width:600px){
  .toast{width:calc(100% - 32px);left:16px;right:16px;transform:none}
  .toast-fade-enter-from,.toast-fade-leave-to{transform:translateY(-12px)}
}
</style>
