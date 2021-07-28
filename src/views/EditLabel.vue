<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" @update:value="updateTag" field-name="标签名" placeholder="请在这里输入新的标签噢~"/>
    </div>
    <div class="deleteTag-wrapper">
      <button class="deleteTag" @click="remove">删除标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import Layout from '@/components/Layout.vue';
  import tagListModel from '@/models/tagListModel';
  import Icon from '@/components/Icon.vue';
  import FormItem from '@/components/Money/FormItem.vue';

  export default defineComponent({
    components: {Icon, Layout, FormItem},
    data(){
      return{
        tag: {
          id: '',
          name: ''
        }
      }
    },
    created(){
      const id = this.$route.params.id
      tagListModel.fetch()
      const tags = tagListModel.data
      const tag = tags.find(tag=> tag.id === id)
      if(tag){
        this.tag = tag
      }else {
        this.$router.replace('/404')
      }
    },
    methods: {
      updateTag(name: string){
        if(this.tag){
          tagListModel.update(this.tag.id, name)
        }
      },
      remove(){
        if(this.tag){
          if(tagListModel.remove(this.tag.id)){
            this.$router.back()
          }
        }
      },
      goBack(){
        this.$router.back()
      }
    }
  });
</script>

<style lang="scss" scoped>
  .deleteTag{
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
  .navBar{
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    >.title{

    }
    >.leftIcon{
      width: 24px;
      height: 24px;
    }
    >.rightIcon{
      width: 24px;
      height: 24px;
    }
  }
  .form-wrapper{
    background: white;
    margin-top: 8px;
  }
</style>