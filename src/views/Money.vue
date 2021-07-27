<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Types/>
    <Notes/>
    <Tags :data-source="tags" v-model:dataSource="tags"/>
  </Layout>
</template>

<script>
  import Layout from '@/components/Layout.vue';
  import Tags from '@/components/Money/Tags.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';

  export default {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    data(){
      return{
        tags: ['衣','食','住','行']
      }
    },
    name: 'Money',
    components: {Notes, Types, NumberPad, Tags, Layout},
  }
</script>
<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>