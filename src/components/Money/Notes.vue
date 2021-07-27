<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里输入噢~">
    </label>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({

  });
</script>

<style lang="scss" scoped>
  .notes{
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    background: #f5f5f5;
    > .name{
      padding-right:16px;
    }
    input{
      height: 64px;
      background: transparent;
      border: none;
      flex-grow: 1;
      padding-right: 16px;
    }
  }
</style>