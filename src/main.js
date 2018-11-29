import Vue from 'vue'
import VueRouter from 'vue-router';
import { routes } from './routes.js';
import { store } from './store/store.js';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import App from './App.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

var mock = new MockAdapter(axios);
mock.onGet('http://localhost:8080/PVIService/resources/users/3').reply(200, {
  user: {
    name: "Elena",
    phone: "enriquesanchezbonet@gmail.com",
    surname: "Jurdao",
    userId: "3",
    userNumberId: '70081568Q'
  }
});