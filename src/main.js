import Vue from 'vue'
import VueRouter from 'vue-router';
import { routes } from './routes.js';
import { store } from './store/store.js';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import firebase from 'firebase'

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBVwrpVjSABKmSQ-5H_QFXiBPzKfcTAOkA",
  authDomain: "walidean.firebaseapp.com",
  databaseURL: "https://walidean.firebaseio.com",
  projectId: "walidean",
  storageBucket: "walidean.appspot.com",
  messagingSenderId: "832613647991"
};
firebase.initializeApp(config);
/*
var mock = new MockAdapter(axios);
mock.onGet('http://localhost:8080/PVIService/resources/users/3').reply(200, {
  user: {
    name: "Pichu",
    phone: "enriquesanchezbonet@gmail.com",
    surname: "Calzada",
    userId: "3",
    userNumberId: '1234562A'
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


mock.onGet('http://localhost:8080/PVIService/resources/users/3/documents/:1').reply(200, {
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

mock.onGet('http://localhost:8080/PVIService/resources/users/3/documents/:1/validations').reply(200, {
  validations: [{
      id: 1,
      description: "Descripcon de la validacion 1",
      timestamp: "20171231",
      securityLevel: "ALTO"
    },
    {
      id: 2,
      description: "Descripcon de la validacion 2",
      timestamp: "20171120",
      securityLevel: "MEDIO"
    }
  ]
});
*/