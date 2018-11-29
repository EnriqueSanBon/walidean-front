import Home from './components/Home.vue';
import ClientForm from './components/ClientForm.vue';
import Client from './components/Client.vue';

export const routes = [{
  path: '/',
  component: Home
}, {
  path: '/clientForm',
  component: ClientForm
}, {
  path: '/client',
  component: Client
}]