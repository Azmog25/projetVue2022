<template>
  <v-app>
    <v-app-bar
      app
      color="grey darken-3"
      dark
    >
      <v-spacer></v-spacer>
      <NavBar :titles="titles" />

      <v-spacer></v-spacer>


    </v-app-bar>
    <keep-alive>
    <router-view name="locCentral"></router-view>
    </keep-alive>
      <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { mdiBeakerOutline } from '@mdi/js'
import { mdiHome } from '@mdi/js'
import { mdiLibraryOutline } from '@mdi/js'

export default {
  name: 'App',
  data : () => {
    return {
      titles : [ { text: "Home", icon: mdiHome, path:"/home"}, { text: "Lab", icon: mdiBeakerOutline, path:"/labo/slice"}, { text: "Library", icon: mdiLibraryOutline, path:"/library/view"} ],
      currentMenu : 0,
    }
  },
  components: {
    NavBar
  },
  methods: {
    receiveVirus : function(viruses) {
      viruses.forEach(v => this.samples.push(v));
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>