import { createApp } from 'vue';
import { createPinia } from 'pinia';
// Import the custom stylesheet that contains the colour palette and utility classes.
import App from './App.vue';
import router from './router';

import './assets/css/main.css';

// Create the Vue application and mount it to the #app element.  We do not
// register global components like Icon or Countup because they are not
// used in the simplified layout.  If you need iconify in the future,
// you can import and register it here.
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');
