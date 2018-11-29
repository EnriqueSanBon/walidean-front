import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    clientData: null,
  },
  mutations: {
    setClientData: (state, clientData) => state.clientData = clientData,
  },
  actions: {
    setClientDataAsync: (context, idUserFound) => {
      let config = {
        headers: {
          'securityCode': this.token
        }
      }
      axios.get('http://localhost:8080/PVIService/resources/users/' + idUserFound, config)
        .then((response) => {
          console.log("Datos del usuario consultado");
          console.log(response.data);
          context.commit('setClientData', response.data.user);
        })
    },
    reducirAsync: ({ commit }, { cantidad }) => {
      setTimeout(() => commit('reducir', cantidad), 2000);
    }
  }
});