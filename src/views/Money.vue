<template>
  <div class="nav-wrapper">
    <div class="content">Money.vue</div>
    <Nav />
  </div>
</template>

<script>
  export default {
    name: 'Money',
  }
</script>

<style scoped>
.nav-wrapper{
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
  .content{
    border: 1px solid blue;
    overflow: auto;
    flex-grow: 1;
  }
</style>