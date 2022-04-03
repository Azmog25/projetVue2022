<template>
  <div>
    <h1>Mixing</h1>
    <v-simple-table border="0">
      <thead>
        <tr>
          <th><h1>Parts</h1></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            <h3 v-for="(e,index) in parts" :key="index">
              <input type="checkbox" :id="index" :value="index" @change="bonjour(index)">
              <label :for="index">{{parts[index].code}}</label>
            </h3>
          </th>
        </tr>
      </tbody>

    </v-simple-table>
    <v-btn @click="mix()">Mixing</v-btn>

    <hr/>
    <v-btn @click="$router.push({path:'/labo/slice'})">Go to slicer</v-btn>

    <hr/>
    <v-row>
      <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
      <v-card elevation="20" v-if="newVirus != null">
        <v-card-title class="subheading font-weight-bold">
          New virus:
        </v-card-title>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item>
            <v-list-item-content class="aligned-end">

              <v-text-field v-model="newVirus.name"> </v-text-field>{{newVirus.code}} {{newVirus.mortalite}}

            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list-item-action>
          <v-btn color="blue lighten-3" elevation="8" @click="sendToLibrary">Send to library

            <v-icon>{{  }}</v-icon>

          </v-btn>
        </v-list-item-action>
      </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {Virus, viruses} from '@/model'

  export default {
    name: 'Mixer',
    data() {
      return {
        chosenParts:[],
        newVirus : null,
        parts: this.$store.getters.getParts
      }
    },
    methods: {
      bonjour : function (index) {

        if (this.chosenParts.includes(index)){
          this.chosenParts.splice(this.chosenParts.indexOf(index))
        }
        else {
          this.chosenParts.push(index)
        }
        console.log(this.chosenParts)
      },
      mix : function() {
        let newCode="";

        let chosen = [...this.chosenParts]; // real copy so that we can splice on the copy
        let nb = chosen.length;
        for(let i=0;i<nb;i++) {
          // choose randomly a part among the selected ones
          let idx = Math.floor(Math.random() * chosen.length);
          let p = this.parts[chosen[idx]];
          newCode = newCode+p.code;
          chosen.splice(idx,1);
        }
        this.newVirus = new Virus(viruses.length,'mixedvirus',newCode);
        // remove chosen parts
        for(let i=this.chosenParts.length-1;i>=0;i--) {
          this.parts.splice(this.chosenParts[i],1);
        }
        // unselect all
        this.chosenParts.splice(0,this.chosenParts.length)
      },
      sendToLibrary : function() {
        this.$store.commit("addVirusToLibrary",this.newVirus);
        console.log("new" + this.newVirus)
        //this.newVirus = null;

      }
    }
  }
</script>

<style scoped>
</style>
