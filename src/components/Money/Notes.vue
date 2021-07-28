<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input type="text" v-model="value" :placeholder="placeholder">
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
      }
    },
    data() {
      return {
        value: ''
      };
    },
    watch: {
      value: function (value: string) {
        this.$emit('update:value', value);
      }
    }
  });
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    background: #f5f5f5;

    > .name {
      padding-right: 16px;
    }

    input {
      height: 64px;
      background: transparent;
      border: none;
      flex-grow: 1;
      padding-right: 16px;
    }
  }
</style>