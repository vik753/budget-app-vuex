import Vue from 'vue';
import Vuex from 'vuex';
import budgetStore from './modules/budget';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    budgetStore,
  },
});
