
<template>
  <section>
  <h2>{{ t('contact.heading') }}</h2>
  <p style="color:var(--muted)">{{ t('contact.intro') }}</p>

    <form @submit.prevent="send">
      <div>
        <label>{{ t('contact.name') || 'Name' }}</label>
        <input v-model="name" :placeholder="t('contact.namePlaceholder') || 'Your name'" required />
      </div>
      <div>
        <label>{{ t('contact.email') || 'Email' }}</label>
        <input v-model="email" type="email" :placeholder="t('contact.emailPlaceholder') || 'you@example.com'" required />
      </div>
      <div>
        <label>{{ t('contact.message') || 'Message' }}</label>
        <textarea v-model="message" :placeholder="t('contact.messagePlaceholder') || 'Short brief, timeline, budget (optional)'" required></textarea>
      </div>
      <button type="submit">{{ t('contact.submit') }}</button>
    </form>

    <p v-if="sent" style="color:green;margin-top:1rem">{{ t('contact.thanks') }}</p>
  </section>
</template>

<script>
import { t } from '../i18n'

export default {
  computed: {
    t() { return t }
  },
  data() {
    return { name: '', email: '', message: '', sent: false }
  },
  methods: {
    send() {
      const payload = { name: this.name, email: this.email, message: this.message, at: new Date() }
      // demo: save to localStorage
      const prev = JSON.parse(localStorage.getItem('lilya_messages') || '[]')
      prev.push(payload)
      localStorage.setItem('lilya_messages', JSON.stringify(prev))
      this.sent = true
      this.name = this.email = this.message = ''
    },
  },
}
</script>

<style scoped>
form div{margin-bottom:.5rem}
label{display:block;font-weight:600}
input,textarea{width:100%;padding:.4rem}
</style>
