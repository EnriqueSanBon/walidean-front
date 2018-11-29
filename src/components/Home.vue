<template>
<div>
  <h2>Login</h2>
  <h3>Usuario</h3>
  <input v-model="user" />
  <h3>Contraseña</h3>
  <input v-model="pass" />
  <button @click="loginUser()">Login</button>
</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: null,
      pass: null
    }
  },
  methods: {
    loginUser() {
      axios.post('http://localhost:8080/PVIService/resources/authenticate', {
          "user": this.user,
          "pass": this.pass
        })
        .then((response) => {
          console.log(response)
          if (response.status == 200) {
            this.$router.push('/formularioCliente', () => console.log('Ruta /formularioCliente'));
          }
        })
    }
  }
}
</script>
