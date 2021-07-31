<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" v-model:type="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" v-model:type="interval"/>
  </Layout>
</template>

<script>
  import Layout from '@/components/Layout';
  import Tabs from '@/components/Tabs';
  import {defineComponent} from 'vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';
  export default defineComponent( {
    components: {Layout,Tabs},
    data(){
      return{
        type: '-',
        interval: 'day',
        intervalList:intervalList,
        recordTypeList: recordTypeList
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
  ::v-deep .interval-tabs-item{
    height: 48px;
  }
</style>