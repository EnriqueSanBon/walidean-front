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

mock.onGet('http://localhost:8080/PVIService/resources/users/3/documents').reply(200, {
  idsList: [{
    documentId: "1",
    userNumberId: "521478569A",
    docType: "DNI",
  }, {
    documentId: "2",
    userNumberId: "45265981",
    docType: "Nomina",
  }, {
    documentId: "3",
    userNumberId: "521478569A",
    docType: "DNI",
  }, {
    documentId: "4",
    userNumberId: "12645562",
    docType: "Nomina",
  }, {
    documentId: "7",
    userNumberId: "878456265",
    docType: "Nomina",
  }]
});


mock.onGet('http://localhost:8080/PVIService/resources/users/3/documents/1').reply(200, {
  data: {
    userId: "1",
    userNumberId: "123456789K",
    docType: "Dni",
    item: "http://prueba",
    providerId: "0",
    processDate: "2017/11/08",
    expirationDate: "2030/02/05"
  }
});