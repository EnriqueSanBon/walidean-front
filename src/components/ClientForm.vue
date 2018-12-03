<template>
<div>
  <h2>Login correcto</h2>
  <h4>Consulta Cliente</h4>

  <h5>DNI</h5>
  <input v-model="dni" />
  <h5>Phone</h5>
  <input v-model="phone" />
  <h5>Token</h5>
  <button @click="searchClient()">Send Token</button>
  <input v-model="token" />
  <button @click="getClient()">Check User</button>

</div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      dni: "123456789A",
      phone: "enriquesanchezbonet@gmail.com",
      token: null,
      idUserFound: 3
    }
  },
  methods: {
    searchClient() {
      let config = {
        headers: {
          'maxRecords': 100,
          'initialRecord': 0,
          'userNumberId': this.dni,
          'userPhone': this.phone
        }
      }
      axios.get('http://localhost:8080/PVIService/resources/users', config)
        .then((response) => {
          if (response.data.usersCount == '1') {
            this.idUserFound = response.data.idList[0];
            this.sendToken();
          } else {
            console.log("Mal especificados los parametros");
          }
        })
    },
    sendToken() {
      axios.post('http://localhost:8080/PVIService/resources/users/' + this.idUserFound + '/token')
        .then((response) => {})
    },
    getClient() {
      this.$store.dispatch('setClientDataAsync', this.idUserFound).then(() => {
        //pasar al siguiente modulo
        console.log("Cambiando de ruta");
        this.$router.push('/client', () => console.log('Ruta cambiada')); // Home
      })
    }
  }
}
</script>
