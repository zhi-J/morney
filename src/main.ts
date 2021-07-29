import {createApp} from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

//record store
window.recordList = recordListModel.fetch()
window.createRecord = (record: RecordItem)=>{
  recordListModel.create(record)
}
//tag store
window.tagList = tagListModel.fetch();
window.createTag = (name:string) =>{
  const  message = tagListModel.create(name)
  if(message === 'duplicated'){
    window.alert('标签名重复')
  }else if(message === 'success'){
    window.alert('添加成功')
  }
}
window.removeTag = (id:string)=>{
  return tagListModel.remove(id);
}
window.updateTag= (id:string, name: string)=>{
  return tagListModel.update(id, name)
}
createApp(App).use(store).use(router).component('Nav', Nav).component('Layout', Layout).component('Icon', Icon).mount('#app');
