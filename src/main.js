import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './styles/style.scss';

import { getUiComponents, defineUiComponents } from './helpers';

const uiComponents = getUiComponents(require.context('./ui-kit/components', true, /\.vue$/));

const app = createApp(App).use(store);

defineUiComponents(app, uiComponents);

app.mount('#app');
