<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" v-model:type="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" v-model:type="interval"/>
  </Layout>
</template>

<script>
  import Layout from '@/components/Layout';
  import Tabs from '@/components/Tabs';
  import {defineComponent} from 'vue';
  export default defineComponent( {
    components: {Layout,Tabs},
    data(){
      return{
        type: '-',
        interval: 'day',
        intervalList:[
          {text:'按天', value: 'day'},
          {text:'按周', value: 'week'},
          {text:'按月', value: 'month'}],
        typeList:[
          {text:'支出', value: '-'},
          {text:'收入', value: '+'}
        ]
      }
    }
  })
</script>
<style lang="scss" scoped>
  ::v-deep .type-tabs-item{
    background: white;
    &.selected{
      background: #c4c4c4;
      &::after{
        display: none;
      }
    }
  }
</style>