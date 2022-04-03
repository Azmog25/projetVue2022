<template>
  <div>
    <h2>In my basket :</h2>
    <v-simple-table >
        <thead>
          <tr><th>Name</th><th>Code</th><th>% Mortality</th></tr>
        </thead>
      <tbody>
        <tr v-for="(v,index) in this.$store.getters.getBasket" :key="index">
          <th>{{v.name}}</th><th>{{v.code}}</th><th>{{v.mortalite}}</th>
        </tr>
      </tbody>

    </v-simple-table>
    <v-btn color="blue lighten-3" @click="sendToLab">Send to the lab</v-btn>
  </div>
</template>

<script>
  import {Virus} from "../model";

  export default {
    name: 'Basket',
    methods: {
      sendToLab() {
        this.$store.commit('addVirus', this.$store.getters.getBasket)
        this.$store.commit('removeBasket')
      }
    },
    watch: {
      operation(to) {
        if (to === 'addbasket') {
          this.$store.state.basket.push(new Virus(0,this.name, this.code))
          this.$router.push({path:'/library/view'})
        }
      }
    }
  }
</script>

<style scoped>
</style>
