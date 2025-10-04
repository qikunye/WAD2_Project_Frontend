import { createApp } from 'vue';
// Import the custom stylesheet that contains the colour palette and utility classes.
import './styles.css';
import App from './App.vue';

// Create the Vue application and mount it to the #app element.  We do not
// register global components like Icon or Countup because they are not
// used in the simplified layout.  If you need iconify in the future,
// you can import and register it here.
createApp(App).mount('#app');
