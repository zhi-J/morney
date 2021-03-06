import {createStore} from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';


const store =  createStore({
  state: {
    recordList: [] ,
    tagList: [],
    currentTag: undefined
  }as RootState,
  mutations: {
    setCurrentTag(state, id:string){
      state.currentTag = state.tagList.find(tag => tag.id === id)
    },
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]')
    },
    createRecord(state, record:RecordItem){
      const record2 = clone(record);
      record2.createAt = new Date().toISOString();
      state.recordList?.push(record2);   //可选链，新语法
      store.commit('saveRecords')
      window.alert('已保存')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state){
      state.tagList =  JSON.parse(window.localStorage.getItem('tagList') || '[]')
    },
    createTag(state,name:string) {
      const names = state.tagList.map(item => item.name)
      if(names.indexOf(name) >=0){
        window.alert('标签名重复')
      }
      const id = createId().toString()
      state.tagList.push({id, name:name})
      store.commit('saveTags')
      window.alert('添加成功')
    },
    saveTags(state){
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    updateTag(state,object:{id:string, name: string}){
      const id = object.id
      const name = object.name
      const idList = state.tagList.map(item => item.id)
      if(idList.indexOf(id) >= 0){
        const names = state.tagList.map(item => item.name)
        if(names.indexOf(name) >= 0){
          window.alert('标签名重复了')
        }else{
          const tag = state.tagList.find(item => item.id === id)
          if(tag){
            tag.name = name
          }
          store.commit('saveTags')
        }
      }
    },
    removeTag(state,id:string){
      let index = -1
      for(let i=0; i< state.tagList.length; i++){
        if(state.tagList[i].id === id){
          index = i
          break
        }
      }
      if(index >=0){
        state.tagList.splice(index, 1)
        store.commit('saveTags')
        router.back()
      }else {
        window.alert('删除失败')
      }

    },
  },

})
export default store