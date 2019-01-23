import Home from './components/Home.vue';
import ClientForm from './components/ClientForm.vue';
import Client from './components/Client.vue';
import Document from './components/Document.vue';
import Validations from './components/Validations.vue';
import Chicfy from './components/Chicfy.vue';
import ChicfyDone from './components/ChicfyDone.vue';

export const routes = [{
  path: '/',
  component: Chicfy
}, {
  path: '/chicfy/done',
  component: ChicfyDone,
}]