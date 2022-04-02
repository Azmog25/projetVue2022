import Vue from 'vue'
import Vuex from 'vuex'
import {viruses} from "@/model";

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
    virus(state) { return state.virus },
    parts(state) { return state.parts },
    samples(state) { return state.samples },
    basket(state) { return state.basket },
  },
  actions: {
  },
  modules: {
  }
})
