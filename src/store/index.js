import Vue from 'vue'
import Vuex from 'vuex'
import {viruses} from "../model";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viruses: viruses,
    parts: [],
    samples: [],
    basket: [],
  },
  mutations: {
    addPart(state, part) {
      state.parts.push(part)
    },

    addVirus(state, virus) {
      state.basket.push(virus)
    },

    setSample(state) {
      state.basket.forEach(elem => {
        state.samples.push(elem)
      })
    },

    removeBasket(state) {
      state.basket.splice(0)
    }
  },
  getters: {
<<<<<<< HEAD
    getviruses(state) { return state.viruses },
    parts(state) { return state.parts },
    samples(state) { return state.samples },
    basket(state) { return state.basket },
=======
    getViruses(state) { return state.viruses },
    getParts(state) { return state.parts },
    getSamples(state) { return state.samples },
    getBasket(state) { return state.basket },
>>>>>>> 89752f460b49f463fca1e56e72fccfc4a5fc4c32
  },
})
