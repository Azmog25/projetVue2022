<template>
    <v-app-bar app>
        <v-toolbar-title>
          <router-link to="/home" tag="span" style="cursor: pointer">
            <v-icon>{{ icon }}</v-icon>
            {{ appTitle }}
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
              text
              v-for="item in titles"
              :key="item.text"
              :to="item.path">
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
  import { mdiDoctor } from '@mdi/js';

  export default {
    name: 'NavBar',
    props: ['titles'],
    data() {
      return {
        appTitle: 'Dr Mad',
        sidebar: false,
        icon: mdiDoctor,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
