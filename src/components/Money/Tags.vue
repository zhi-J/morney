<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          @click="toggle(tag.name)"
          :class="{selected: selectedTags.indexOf(tag.name) >= 0}">{{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import store from '@/store/index.ts';

  export default defineComponent({
    data() {
      return {
        selectedTags: [] as string[],
      };
    },
    computed:{
      tagList(){
        return store.state.tagList
      }
    },
    created(){
      store.commit('fetchTags')
    },
    methods: {
      toggle(tag: string) {
        const index = this.selectedTags.indexOf(tag);
        if (index >= 0) {
          this.selectedTags.splice(index, 1);
        } else {
          this.selectedTags.push(tag);
        }
        this.$emit('update:selected', this.selectedTags);
      },
      create() {
        const name = window.prompt('请输入标签名');
        if (!name ) {
          return window.alert('标签名不能为空');
        }
        store.commit('createTag',name)

      }
    }

  });
</script>

<style lang="scss" scoped>
  .tags {
    padding: 16px;
    font-size: 14px;
    display: flex;
    flex-direction: column-reverse;
    background: white;
    flex-grow: 1;
    > .current {
      display: flex;
      flex-wrap: wrap;

      > li {
        background: #D3E6F8;
        height: 24px;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;

        &.selected {
          background: #F0C48A;
          color: white;
        }
      }
    }

    > .new {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 3px;
      }
    }
  }
</style>