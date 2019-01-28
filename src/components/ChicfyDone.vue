<template>
<div>
  <el-container type="flex" justify="center">
    <el-main>
      <el-row justify="center" type="flex">
        <h1>Archivos subidos correctamente</h1>
      </el-row>
    </el-main>
  </el-container>
</div>
</template>

<style lang="scss">
$font-stack: Helvetica, sans-serif;
body {
    font: 100% $font-stack;
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      operationId: null,
      response: null
    }
  },
  methods: {
    consultOperationIddiligence(operationNumber) {
      var context = this;
      let config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
      axios
        .post('http://demos2.addalia.com/IDocValidationService2/resources/authenticate/', {
          user: "admin",
          pass: "admin"
        }, config)
        .then((response) => {
          console.log("Logueado correctamente en iddiligence " + response.status)
          axios
            .get('http://demos2.addalia.com/IDocValidationService2/resources/operations/' + operationNumber + '/status', {}, config)
            .then((response) => {
              console.log("Obteniendo estado de la operacion" + operationNumber);
              console.log(response);
              context.response = response.data;
            })
        })
    }
  },
  computed: {},
  mounted() {}
}
</script>
