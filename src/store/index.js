import { createStore } from 'vuex';
import goods from '../goods/store';

export default createStore({
  modules: {
    goods,
  },
});
