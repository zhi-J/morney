<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types v-model:type="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags v-model:dataSource="tags" @update:selected="onUpdateTags"/>
    {{recordList}}
  </Layout>
</template>

<script lang="ts">
  import Layout from '@/components/Layout.vue';
  import Tags from '@/components/Money/Tags.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';

  import {defineComponent } from 'vue';

  window.localStorage.setItem('version', '0.0.1')

  type Record = {
    tags: string[]
    notes: string
    type: string
    amount: number
    createAt?: Date
  }
  export default defineComponent({
    data(){
      return{
        tags: ['衣','食','住','行'],
        // eslint-disable-next-line no-empty-pattern
        recordList: [] =JSON.parse(window.localStorage.getItem('recordList') || '[]'),
        record: {
          tags: [''],  notes: '', type: '-', amount: 0
        } as Record
      }
    },
    watch:{
      recordList: {
        handler(recordList) {
          window.localStorage.setItem('recordList', JSON.stringify(recordList))
        },
        deep: true
      },
    },
    components: {Notes, Types, NumberPad, Tags, Layout},
    methods:{
      onUpdateTags(selectedTags: string[]){
        this.record.tags = selectedTags
      },
      onUpdateNotes(notes: string){
        this.record.notes = notes
      },
      saveRecord(){
        const record2: Record = JSON.parse(JSON.stringify(this.record))
        record2.createAt = new Date()
        this.recordList.push(record2)
      },
      onUpdateAmount(value: string){
        this.record.amount = parseFloat(value)
      }
    }
  })

</script>
<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>