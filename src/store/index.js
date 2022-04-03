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

        addVirus(state) {
            state.basket.forEach(elem => {
                state.viruses.push(elem)
            })
        },

        setSample(state) {
            state.basket.forEach(elem => {
                state.samples.push(elem)
            })
        },

        removeBasket(state) {
            state.basket.splice(0)
        },

        addToBasket(state, virus) {
            state.basket.push(virus)
        }
    },
    getters: {
        getViruses(state) { return state.viruses },
        getParts(state) { return state.parts },
        getSamples(state) { return state.samples },
        getBasket(state) { return state.basket },
    },
})