<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" v-model:type="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" v-model:type="interval"/>
    <ol>
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id"><span>{{tagString(item.tags)}}</span><span class="note">{{item.notes}}</span><span>￥{{item.amount}}</span></li>
        </ol>
      </li>
    </ol>

  </Layout>
</template>

<script>
  import Layout from '@/components/Layout';
  import Tabs from '@/components/Tabs';
  import {defineComponent} from 'vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';
  import store from '@/store';

  export default defineComponent({
    components: {Layout, Tabs},
    data() {
      return {
        type: '-',
        interval: 'day',
        intervalList: intervalList,
        recordTypeList: recordTypeList
      }
    },
    methods:{
      tagString(tags){
        return tags.length===0 ? "无" : tags.join(',')
      }
    },
    computed: {
      recordList() {
        return store.state.recordList
      },
      result() {
        const {recordList} = this
        const hashTable = {}
        for (let i = 0; i < recordList.length; i++) {
          const [date, time] = recordList[i].createAt.split('T');
          hashTable[date] = hashTable[date] || {title: date, items: []}
          hashTable[date].items.push(recordList[i])
        }
        return hashTable
      },
    },
    beforeCreate() {
      store.commit('fetchRecords')
    }
  })
</script>
<style lang="scss" scoped>
  ::v-deep {
    .type-tabs-item {
      background: white;

      &.selected {
        background: #c4c4c4;

        &::after {
          display: none;
        }
      }
    }

    .interval-tabs-item {
      height: 48px;
    }
  }
  %item{
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title{
    @extend %item
  }
  .record{
    background: white;
    @extend %item
  }
  .note{
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>