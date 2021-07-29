<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types v-model:type="record.type"/>
    <div class="notes">
      <FormItem @update:value="onUpdateNotes" field-name="备注" placeholder="请在这里输入备注噢~ "/>
    </div>
    <Tags v-model:dataSource="tags" @update:selected="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Layout from '@/components/Layout.vue';
  import Tags from '@/components/Money/Tags.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';

  import {defineComponent} from 'vue';
  import store from '@/store/index2';


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
        tags: store.tagList,
        // eslint-disable-next-line no-empty-pattern
        recordList: store.recordList,
        record: {
          tags: [''], notes: '', type: '-', amount: 0
          // eslint-disable-next-line no-undef
        } as RecordItem
      };
    },
    watch: {
      recordList: {
        handler() {
          store.saveRecords();
        },
        deep: true
      },
    },
    components: {FormItem, Types, NumberPad, Tags, Layout},
    methods: {
      onUpdateTags(selectedTags: string[]) {
        this.record.tags = selectedTags;
      },
      onUpdateNotes(notes: string) {
        this.record.notes = notes;
      },
      saveRecord() {
        store.createRecord(this.record)
      },
      onUpdateAmount(value: string) {
        this.record.amount = parseFloat(value);
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