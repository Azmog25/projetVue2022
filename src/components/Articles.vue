<template>
  <div>
    <table>
      <tr><td>Name</td><td>Code</td><td>% Mortality</td></tr>
      <tr v-for="(v,index) in listViruses" :key="index"><td>{{v.name}}</td><td>{{v.code}}</td><td>{{v.mortalite}}</td><td> <button @click="$store.commit('addToBasket', v)">Clone virus for the lab</button></td></tr>
    </table>
  </div>
</template>

<script>

  export default {
    name: 'Articles',
    computed: {
      listViruses() {
        let articles = []
        const viruses = this.$store.getters.getViruses

        viruses.forEach(elem => {
          if(!articles.includes(elem)) {
            articles.push(elem)
          }
        })

        return articles
      }
    }
  }
</script>

<style scoped>
</style>
