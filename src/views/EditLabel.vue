<template>
  <Layout>
    <div>
      <Icon name="left"/>
      <span>编辑标签</span>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import Layout from '@/components/Layout.vue';
  import tagListModel from '@/models/tagListModel';
  import Icon from '@/components/Icon.vue';

  export default defineComponent({
    components: {Icon, Layout},
    created(){
      const id = this.$route.params.id
      tagListModel.fetch()
      const tags = tagListModel.data
      const tag = tags.find(tag=> tag.id === id)
      if(tag){
        console.log(tag);
      }else {
        this.$router.replace('/404')
      }
    },
  });
</script>

<style lang="scss" scoped>

</style>