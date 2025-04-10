/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { en } from './locale/en'
import { createI18n, useI18n } from 'vue-i18n'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

const messages = {
    en: en,
};
const i18n = createI18n({
    legacy: false, // Vuetify does not support the legacy mode of vue-i18n
    locale: 'en',
    fallbackLocale: 'en',
    messages,
  })
app.use(i18n)

registerPlugins(app)

app.mount('#app')
