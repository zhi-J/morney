<template>
  <div>
    <label class="formItem">
      <span class="name">{{fieldName}}</span>
      <input type="text" :value="value" @input="changeValue($event.target.value)" :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    props:{
      fieldName: {
        type: String,
        required: true
      },
      placeholder:{
        type: String,
        default: ''
      },
      value:{
        type: String,
        default: ''
      }
    },
    methods:{
      changeValue(value: string){
        this.$emit('update:value', value);
      }
    },
  });
</script>

<style lang="scss" scoped>
  .formItem {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;

    > .name {
      padding-right: 16px;
    }

    input {
      height: 44px;
      background: transparent;
      border: none;
      flex-grow: 1;
      padding-right: 16px;
    }
  }
</style>