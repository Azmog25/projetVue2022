<template>
  <div>
    <v-simple-table>
      <thead>
        <tr><th>Name</th><th>Code</th><th>% Mortality</th></tr>
      </thead>
      <tbody>
        <tr v-for="(v,index) in listViruses" :key="index"><th>{{v.name}}</th><th>{{v.code}}</th><th>{{v.mortalite}}</th><th> <v-btn @click="$store.commit('addToBasket', v)">Clone virus for the lab</v-btn></th></tr>
      </tbody>
    </v-simple-table>
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
