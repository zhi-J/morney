<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"/>
    <Types v-model:type="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags v-model:dataSource="tags" @update:selected="onUpdateTags"/>
    {{record}}
  </Layout>
</template>

<script lang="ts">
  import Layout from '@/components/Layout.vue';
  import Tags from '@/components/Money/Tags.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';

  import {defineComponent } from 'vue';

  type Record = {
    tags: string[]
    notes: string
    type: string
    amount: number
  }
  export default defineComponent({
    data(){
      return{
        tags: ['衣','食','住','行'],
        record: {
          tags: [''],  notes: '', type: '-', amount: 0
        } as Record
      }
    },
    name: 'Money',
    components: {Notes, Types, NumberPad, Tags, Layout},
    methods:{
      onUpdateTags(selectedTags: string[]){
        this.record.tags = selectedTags
      },
      onUpdateNotes(notes: string){
        this.record.notes = notes
      },
      // onUpdateType(type: string){
      //   this.record.type = type
      // },
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