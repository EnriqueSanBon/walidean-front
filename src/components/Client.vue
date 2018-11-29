<template>
<div>
  <h1>ESTO ES CLIENTE</h1>
  <h3 v-for="data in clientData">{{data}}</h3>
</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState(['clientData']),
}
</script>
