<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types v-model:type="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags v-model:dataSource="tags" @update:selected="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Layout from '@/components/Layout.vue';
  import Tags from '@/components/Money/Tags.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';

  import {defineComponent} from 'vue';
  import model from '@/model';
  import RecordItem from '@/custom';
  // import RecordItem from '@/custom'
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

  export default defineComponent({
    data() {
      return {
        tags: ['衣', '食', '住', '行'],
        // eslint-disable-next-line no-empty-pattern
        recordList: model.fetch(),
        record: {
          tags: [''], notes: '', type: '-', amount: 0
        } as RecordItem
      };
    },
    watch: {
      recordList: {
        handler(recordList) {
          model.save((recordList));
        },
        deep: true
      },
    },
    components: {Notes, Types, NumberPad, Tags, Layout},
    methods: {
      onUpdateTags(selectedTags: string[]) {
        this.record.tags = selectedTags;
      },
      onUpdateNotes(notes: string) {
        this.record.notes = notes;
      },
      saveRecord() {
        const record2: RecordItem = model.clone(this.record);
        record2.createAt = new Date();
        this.recordList.push(record2);
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
</style>