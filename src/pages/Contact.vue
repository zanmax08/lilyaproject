
<template>
  <section class="contact-layout" v-reveal:fade>
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
.contact-layout{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:60px;max-width:1180px;margin:0 auto;padding:80px 28px 140px;align-items:start}
.contact-left{max-width:400px}
.mega{font-size:clamp(2.7rem,7vw,5.2rem);line-height:0.9;font-weight:600;letter-spacing:1px;margin:0 0 42px}
.mega .block{display:block}
.mega .line2{font-weight:300;letter-spacing:4px}
.mega .line3{font-weight:300;letter-spacing:6px}
.pitch{font-size:1.05rem;line-height:1.35;font-weight:400;max-width:360px}
.pitch strong{font-weight:700}

.contact-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:30px 40px;width:100%}
.field{display:flex;flex-direction:column;gap:6px}
.field.span2{grid-column:1 / -1}
label{font-size:.9rem;font-weight:500;letter-spacing:1px;text-transform:none}
label .opt{font-weight:300;font-size:.75rem;opacity:.6;margin-left:6px}
input,textarea{font:inherit;padding:14px 18px;border:2px solid #000;border-radius:0;background:#fafafa;outline:none;transition:border-color .25s,background .25s}
input:focus,textarea:focus{border-color:#333;background:#fff}
textarea{resize:vertical;min-height:140px}
.actions{display:flex;flex-direction:column;align-items:center;gap:14px;margin-top:10px;position:relative}
.send-btn{cursor:pointer;border:2px solid #000;background:#000;color:#fff;padding:18px 90px;font-size:1.15rem;letter-spacing:3px;border-radius:60px;text-transform:lowercase;font-weight:500;transition:transform .35s,box-shadow .35s;box-shadow:0 4px 18px -6px rgba(0,0,0,0.55)}
.send-btn[disabled]{opacity:.5;cursor:not-allowed;transform:none}
.send-btn:hover:not([disabled]){transform:scale(1.045)}
.send-btn:active{transform:scale(1.02)}
.send-btn:focus-visible{outline:3px solid #111;outline-offset:3px}
@media (prefers-reduced-motion: reduce){.send-btn{transition:none}.send-btn:hover,.send-btn:active{transform:none}}
.sent-msg{color:green;font-size:.85rem}
.error-msg{color:#c40000;font-size:.85rem}

@media (max-width:860px){
  .contact-layout{gap:40px;padding:60px 20px 100px}
  .contact-form{grid-template-columns:1fr}
  .send-btn{width:100%}
}

@media (prefers-reduced-motion: reduce){
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
