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
export default {
  computed: mapState(['clientData']),
  components: {
    grid
  },
  data() {
    return {
      searchQuery: '',
      gridColumns: ['Tipo', 'numero'],
      gridData: [
        { Tipo: 'Nomina', numero: 12355568 },
        { Tipo: 'DNI', numero: '523698978A' },
        { Tipo: 'Nomina', numero: 25558745 },
        { Tipo: 'Carnet', numero: 5888878 }
      ]
    }
  }
}

// bootstrap the demo
</script>
