import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'quill/dist/quill.snow.css';  // Import the default Quill styles

// import './assets/styles.css';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');