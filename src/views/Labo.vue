<template>
  <div>
    <v-container fluid>
      <v-data-iterator
        :items="viruses"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
          >
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle
                v-model="sortDesc"
                mandatory
              >
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
                >
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
                >
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="">
          <v-row>
            <v-col
              v-for="virus in $store.getters.getViruses"
              :key="virus.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  {{ virus.name }}
                </v-card-title>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
                  >
                    <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                      {{ key }}:
                    </v-list-item-content>
                    <v-list-item-content
                      class="aligned-end"
                      :class="{ 'blue--text': sortBy === key }"
                    >
                      {{ virus[key] }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-row
            class="mt-2"
            align="center"
            justify="center"
          >

            <span class="grey--text">Item per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >

                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span
              class="mr-4 grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
  import {Virus} from '../model.js'

  export default {
    name: 'Labo',
    data() {
      return {
        itemsPerPageArray: [4,8,12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'name',
        keys: [
            'name',
            'code',
            'mortality',
        ],
        headers: [
          {
            text: 'Viruses'
          },
          {text: 'Name'},
          {text: 'Code'},
          {text: 'Mortality %'}
        ],
        viruses: this.$store.getters.getViruses
      }
    },
    computed: {
      filteredKeys() {
        return this.keys.filter(key => key !== 'Name')
      },

      numberOfPages () {
        return Math.ceil(this.viruses.length / this.itemsPerPage)
      },
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      cut : function() {
        if (this.cutFactor === 0) return;
        this.chosenViruses.forEach(e => {
          let s = this.samples[e];
          for(let i=0;i<s.code.length;i+=this.cutFactor) {
            this.$store.commit('addPart',{code : s.code.substring(i,i+this.cutFactor)});
          }
        });
        // remove chosen viruses
        for(let i=this.chosenViruses.length-1;i>=0;i--) {
          this.$store.getters.getSamples.splice(this.chosenViruses[i],1);
        }
        // unselect all
        this.chosenViruses.splice(0,this.chosenViruses.length)
      },
      mutation : function() {
        if (this.nbMutation === 0) return;

        this.chosenViruses.forEach(e => {
          let newCode;
          let s = this.samples[e];
          for(let i=0;i<this.nbMutation;i++) {
            let idx = Math.floor(Math.random() * s.code.length);
            let chr =  String.fromCharCode(Math.floor(Math.random() * 4)+ "A".charCodeAt(0));
            newCode = s.code.substring(0,idx) + chr + s.code.substring(idx+1);
            s.code = newCode;
            s.updateCaracs();
          }
        });
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
        this.newVirus = new Virus(this.$store.getters.getViruses.length,'mixedvirus',newCode);
        // remove chosen parts
        for(let i=this.chosenParts.length-1;i>=0;i--) {
          this.$store.getters.getParts.splice(this.chosenParts[i],1);
        }
        // unselect all
        this.chosenParts.splice(0,this.chosenParts.length)
      },
    }
  }
</script>

<style scoped>
</style>
