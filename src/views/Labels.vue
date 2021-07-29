<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script>
  import Layout from '@/components/Layout';
  import {defineComponent} from 'vue';
  import tagListModel from '@/models/tagListModel';

  // tagListModel.fetch()
  export default defineComponent({
    data(){
      return{
        tags: window.tagList
      }
    },
    components: {Layout},
    methods: {
      createTag(){
        const name = window.prompt('请输入标签名')
        if(name){
          const  message = tagListModel.create(name)
          if(message === 'duplicated'){
            window.alert('标签名重复')
          }else if(message === 'success'){
            window.alert('添加成功')
          }
        }
      }
    }
  })
</script>
<style lang="scss" scoped>
  .tags{
    background: white;
    font-size: 16px;
    padding-left: 16px;
    >.tag{
      display: flex;
      align-items: center;
      min-height: 44px;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      >svg{
        width: 20px;
        height: 20px;
        margin-right: 16px;
        color: #F0C48A;
      }
    }
  }
  .createTag{
    background: #F0C48A;
    height: 40px;
    border-radius: 4px;
    color: white;
    padding: 0 16px;
    border: none;
    &-wrapper{
      text-align: center;
      padding: 16px;
      margin-top: 28px;
    }
  }
</style>
