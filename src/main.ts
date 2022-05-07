import { App, createApp } from 'vue'
import AppComponent from './App.vue'

const Ins: App<Element> = createApp(AppComponent);
Ins.mount('#app');
