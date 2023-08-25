
import router from './router';
import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/css/style.css'

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
})

app.use(router); 
app.use(vuetify).mount('#app')