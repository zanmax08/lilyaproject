
<template>
  <section>
    <h2>{{ t('services.heading') }}</h2>
  <p>{{ t('services.description') }}</p>

    <ul>
      <li>
        <h3>{{ t('services.list')[0] }}</h3>
  <p>{{ t('services.paragraphs')[0] }}</p>
      </li>
      <li>
        <h3>{{ t('services.list')[1] }}</h3>
  <p>{{ t('services.paragraphs')[1] }}</p>
      </li>
      <li>
        <h3>{{ t('services.list')[2] }}</h3>
  <p>{{ t('services.paragraphs')[2] }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
import { t } from '../i18n'

export default {
  computed: {
    t() { return t }
  }
}
</script>

<style scoped>
ul{list-style:none;padding:0}
li{margin-bottom:1rem}
</style>
