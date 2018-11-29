<template>
<section>
  <h1>Walidean</h1>
  <router-link to="/">Home</router-link>
  <router-link to="/clientForm">FormularioCliente</router-link>
  <hr />
  <router-view></router-view>
</section>
</template>

<script>
import persona from './components/persona.vue';
export default {
  components: {
    persona
  },
  data() {
    return {}
  }
}
</script>

<style>

</style>
