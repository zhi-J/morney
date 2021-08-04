<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" v-model:type="type"/>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}} <span>{{group.total}}</span></h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id"><span>{{tagString(item.tags)}}</span><span class="note">{{item.notes}}</span><span>￥{{item.amount}}</span></li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script>
  import Layout from '@/components/Layout';
  import Tabs from '@/components/Tabs';
  import {defineComponent} from 'vue';
  import recordTypeList from '@/constants/recordTypeList';
  import store from '@/store';
  import clone from '@/lib/clone';
  const dayjs = require('dayjs')
  export default defineComponent({
    components: {Layout, Tabs},
    data() {
      return {
        type: '-',
        recordTypeList: recordTypeList
      }
    },
    methods:{
      tagString(tags){
        return tags.length===0 ? "无" : tags.join('，')
      },
      beautify(string){
        const now = dayjs()
        if(dayjs(string).isSame(now, 'day')){
          return '今天'
        }else if(dayjs(string).isSame(now.subtract(1,'day'), 'day')){
          return '昨天'
        }else if(dayjs(string).isSame(now.subtract(2,'day'), 'day')){
          return '前天'
        }else if(dayjs(string).isSame(now, 'year')){
          return dayjs(string).format('M月D日')
        }else {
          return dayjs(string).format('YYYY年M月D日')
        }
      }
    },
    computed: {
      recordList() {
        return store.state.recordList
      },
      groupedList() {
        const {recordList} = this

        const newList = clone(recordList).filter(r => r.type === this.type).sort((a,b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf())
        if(newList.length === 0){
          return []
        }
        const result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), total: 0,  items: [newList[0]]}]
        for(let i=1; i<newList.length; i++){
          const current = newList[i]
          const last = result[result.length-1]
          if(dayjs(last.title).isSame(dayjs(current.createAt), 'day')){
            last.items.push(current)
          }else {
            result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), total: 0,  items: [current]})
          }
        }
        result.map(group =>{
          group.total = group.items.reduce((sum, item) => sum + item.amount, 0)
        })
        return result
      },
    },
    beforeCreate() {
      store.commit('fetchRecords')
    }
  })
</script>
<style lang="scss" scoped>
  .noResult{
    padding: 16px;
    text-align: center;
  }
  ::v-deep {
    .type-tabs-item {
      background: #c4c4c4;

      &.selected {
        background: white;

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