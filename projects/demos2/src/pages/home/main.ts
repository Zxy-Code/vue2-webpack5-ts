import Vue from 'vue';
import App from './app.vue';
import router from './router';
import '@/libs/js/flexible.debug.js';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
