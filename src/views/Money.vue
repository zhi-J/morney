<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Tabs v-model:type="record.type" :data-source="recordTypeList"/>
    <div class="notes">
      <FormItem @update:value="onUpdateNotes" field-name="备注" placeholder="请在这里输入备注噢~ "/>
    </div>
    <Tags @update:selected="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Layout from '@/components/Layout.vue';
  import Tags from '@/components/Money/Tags.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tabs from '@/components/Tabs.vue';

  import {defineComponent} from 'vue';
  import store from '@/store/index.ts';
  import recordTypeList from '@/constants/recordTypeList';

  // const version = window.localStorage.getItem('version')
  // const recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]')
  // if(version === '0.0.1'){
  //   //数据迁移
  //   recordList.forEach((record: { createAt: Date; }) => {
  //     record.createAt = new Date(2020, 0, 1)
  //   });
  //   //保存数据
  //   window.localStorage.setItem('recordList', JSON.stringify(recordList))
  // }
  // window.localStorage.setItem('version', '0.0.2')
  // const tagList = tagListModel.fetch()
  export default defineComponent({
    data() {
      return {
        record: {
          tags : [] as string[] , notes: '', type: '-', amount: 0
          // eslint-disable-next-line no-undef
        } as RecordItem,
        recordTypeList: recordTypeList
      };
    },
    created(){
      store.commit('fetchRecords')
    },
    computed:{
      recordList(){
        return store.state.recordList
      }
    },
    watch: {
      recordList: {
        handler() {
          store.commit('saveRecords');
        },
        deep: true
      },
    },
    components: {FormItem, NumberPad, Tags, Layout, Tabs},
    methods: {
      onUpdateNotes(notes: string) {
        this.record.notes = notes;
      },
      saveRecord() {
        store.commit('createRecord',this.record)
      },
      onUpdateAmount(value: string) {
        this.record.amount = parseFloat(value);
      },
      onUpdateTags(value:string[]){
        this.record.tags = value
      }
    }
  });

</script>
<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding: 12px 0;
  }
</style>