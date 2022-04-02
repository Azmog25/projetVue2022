<template>
  <div>
    <table>
      <tr><td>Name</td><td>Code</td><td>% Mortality</td></tr>
      <tr v-for="(v,index) in this.$store.getters.getViruses" :key="index"><td>{{v.name}}</td><td>{{v.code}}</td><td>{{v.mortalite}}</td><td> <button @click="$store.getters.getBasket.push(v)">Clone virus for the lab</button></td></tr>
    </table>
  </div>
</template>

<script>

  export default {
    name: 'Articles',
  }
</script>

<style scoped>
</style>
