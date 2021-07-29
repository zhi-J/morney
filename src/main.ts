import {createApp} from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';

window.tagList = tagListModel.fetch();
createApp(App).use(store).use(router).component('Nav', Nav).component('Layout', Layout).component('Icon', Icon).mount('#app');
