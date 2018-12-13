import Home from './components/Home.vue';
import ClientForm from './components/ClientForm.vue';
import Client from './components/Client.vue';
import Document from './components/Document.vue';
import Validations from './components/Validations.vue';
import Chicfy from './components/Chicfy.vue';

export const routes = [{
  path: '/',
  component: Home
}, {
  path: '/clientForm',
  component: ClientForm
}, {
  path: '/client',
  component: Client
}, {
  path: '/document/:id',
  component: Document
}, {
  path: '/document/:id/validations',
  component: Validations,
  props: true
}, {
  path: '/chicfy/home',
  component: Chicfy,
}]