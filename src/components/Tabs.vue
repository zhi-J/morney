<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        :class="{selected: item.value === type, [classPrefix+'-tabs-item']: classPrefix}"
        @click="select(item)">{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';

  type DataSourceItem = { text: string, value: string }
  export default defineComponent({
    props: {
      type: String,
      classPrefix: String,
      dataSource: []
    },
    methods:{
      select(item:DataSourceItem){
        this.$emit('update:type', item.value);
      }
    }
  });
</script>

<style lang="scss" scoped>
  .tabs {
    background: #c4c4c4;
    display: flex;
    align-items: center;
    font-size: 24px;

    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }
</style>