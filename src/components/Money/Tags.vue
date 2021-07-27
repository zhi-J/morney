<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
      @click="toggle(tag)"
      :class="{selected: selectedTags.indexOf(tag) >= 0}">{{tag}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {defineComponent } from 'vue';
  export default defineComponent({
    props:{
      dataSource:  [String]
    },
    emits: ['update:dataSource'],
    data(){
      return{
        selectedTags: [] as string[]
      }
    },
    methods:{
      toggle(tag: string){
        const index = this.selectedTags.indexOf(tag)
        if(index >= 0){
          this.selectedTags.splice(index, 1)
        }else {
          this.selectedTags.push(tag)
        }
      },
      create(){
        const name = window.prompt('请输入标签名')
        if(name === ''){
          window.alert('标签名不能为空')
        }else {
          if(this.dataSource){
            this.$emit('update:dataSource',[...this.dataSource, name])
          }
        }
      }
    }
  });
</script>

<style lang="scss" scoped>
  .tags{
    padding: 16px;
    font-size: 14px;
    display: flex;
    flex-direction: column-reverse;
    > .current{
      display: flex;
      flex-wrap: wrap;
      > li{
        background: #d9d9d9;
        height: 24px;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;
        &.selected{
          background: #F0C48A;
          color: white;
        }
      }
    }
    > .new{
      padding-top: 16px;
      button{
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 3px;
      }
    }
  }
</style>