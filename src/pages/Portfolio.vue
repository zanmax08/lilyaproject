<template>
  <section class="empty-portfolio">
    <h2>{{ t('nav.portfolio') }}</h2>
    <p class="muted">{{ t('portfolio.desc') }}</p>
    <div class="empty">
      <p>{{ t('portfolio.empty') }}</p>
      <router-link to="/" class="back">← Back to Home</router-link>
    </div>
  </section>
</template>

<script>
import { t } from '../i18n'

export default {
  computed: { t() { return t } }
}
</script>

<style scoped>
.empty-portfolio{padding:1rem}
.muted{color:var(--muted)}
.empty{margin-top:1.25rem;background:#f0e7da;padding:1.25rem;border-radius:10px;border:1px dashed #e6eef6}
.empty p{margin:0 0 .75rem}
.back{color:var(--header-bg);font-weight:600;text-decoration:none}
</style>
