<template>
<div>
  <h1>VALIDACIONES DE DOCUMENTO</h1>
  <h3 v-for="data in clientData">{{data}}</h3>

  <template>
    <form id="search">
      Search <input name="query" v-model="searchQuery">
    </form>
    <grid :data="gridData" :columns="gridColumns" :filter-key="searchQuery">
    </grid>
  </template>

</div>
</template>

<script>
import { mapState } from 'vuex';
import grid from './grid.vue';
import axios from 'axios';
import consts from '../consts.js';
export default {
  computed: mapState(['clientData']),
  components: {
    grid
  },
  mounted() {
    console.log("Mounted");
    this.getData();
  },
  data() {
    return {
      searchQuery: '',
      gridColumns: ['Id', 'Descripcion', 'Fecha', 'Nivel'],
      gridData: [
        /*
                { Tipo: 'Nomina', Numero: 12355568 },
                { Tipo: 'DNI', Numero: '523698978A' },
                { Tipo: 'Nomina', Numero: 25558745 },
                { Tipo: 'Carnet', Numero: 5888878 }*/
      ],
      currentDocument: null
    }
  },
  methods: {
    getValidations() {
      let config = {
        headers: {
          'securityCode': this.token
        }
      }
      console.log("La llamada a las validaciones es");
      console.log(consts.ipPVIService + consts.portPVIService + '/PVIService/resources/users/' + this.clientData.userId + '/documents/' + this.$route.params.id + '/validations');
      axios.get('http://localhost:8080/PVIService/resources/users/' + this.clientData.userId + '/documents/' + this.$route.params.id + '/validations', config)
        .then((response) => {
          console.log("Consulta Validaciones");
          console.log(response);
          console.log("CONTEXTO");
          console.log(this);
          if (this.currentDocument.providerId == 0) {
            this.gridColumns = ['Id', 'Descripcion', 'Fecha', 'Nivel', 'Validate']
            this.gridData = response.data.validations.map(function(obj) {
              var item = {};
              item.Id = obj.id;
              item.Descripcion = obj.description;
              item.Fecha = obj.timestamp;
              item.Nivel = obj.securityLevel;
              item.Validate = 'Validated';
              return item;
            });
          } else {
            this.gridData = response.data.validations.map(function(obj) {
              var item = {};
              item.Id = obj.id;
              item.Descripcion = obj.description;
              item.Fecha = obj.timestamp;
              item.Nivel = obj.securityLevel;
              return item;
            });
          }


        })
    },
    getData() {
      let config = {
        headers: {
          'securityCode': this.token
        }
      }
      console.log("La llamada al document es");
      console.log(consts.ipPVIService + consts.portPVIService + '/PVIService/resources/users/' + this.clientData.userId + '/documents/' + this.$route.params.id);
      axios.get('http://localhost:8080/PVIService/resources/users/' + this.clientData.userId + '/documents/' + this.$route.params.id, config)
        .then((response) => {
          console.log("Consulta datos Documento");
          this.currentDocument = response.data.data
          console.log(this.currentDocument);
          this.getValidations();
        })
    }
  }

}

// bootstrap the demo
</script>
