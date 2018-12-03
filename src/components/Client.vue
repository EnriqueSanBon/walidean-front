<template>
<div>
  <h1>ESTO ES CLIENTE</h1>
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
export default {
  computed: mapState(['clientData']),
  components: {
    grid
  },
  mounted() {
    console.log("Mounted");
    this.getDocuments();
  },
  data() {
    return {
      searchQuery: '',
      gridColumns: ['Tipo', 'Numero', 'Documento', 'Validacion'],
      gridData: [
        /*
                { Tipo: 'Nomina', Numero: 12355568 },
                { Tipo: 'DNI', Numero: '523698978A' },
                { Tipo: 'Nomina', Numero: 25558745 },
                { Tipo: 'Carnet', Numero: 5888878 }*/
      ]
    }
  },
  methods: {
    getDocuments() {
      let config = {
        headers: {
          'securityCode': this.token
        }
      }
      axios.get('http://localhost:8080/PVIService/resources/users/' + this.clientData.userId + '/documents', config)
        .then((response) => {
          console.log("Consulta Documentos");
          console.log(response.data);
          this.gridData = response.data.idsList.map(function(obj) {
            var item = {};
            item.Numero = obj.userNumberId;
            item.Tipo = obj.docType;
            item.Documento = "DOC";
            item.Validacion = "Validation";
            item.id = obj.documentId;
            return item;
          });
        })
    }
  }
}

// bootstrap the demo
</script>
