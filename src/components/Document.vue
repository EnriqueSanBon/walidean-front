<template>
<div>
  <h1>Documento</h1>
  <div>Document {{ $route.params.id }}</div>
  <h1>DATOS DEL DOCUMENTO</h1>
  <h3 v-for="data in this.currentDocument">{{data}}</h3>
  <button @click="getDocument()">Check User</button>

</div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
  computed: mapState(['clientData']),
  mounted() {
    console.log("Mounted");
    this.getDocument();
  },
  data() {
    return {
      currentDocument: '',
    }
  },
  methods: {
    getDocument() {
      let config = {
        headers: {
          'securityCode': this.token
        }
      }
      axios.get('http://localhost:8080/PVIService/resources/users/' + this.clientData.userId + '/documents/' + $route.params.id, config)
        .then((response) => {
          console.log("Consulta datos Documento");
          console.log(response.data);
          this.currentDocument = response.data
        })
    }
  }
}
</script>
