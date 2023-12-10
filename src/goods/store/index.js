import items from '../json/items.json';
import materials from '../json/materials.json';

const favoriteIdListFromStorage = JSON.parse(localStorage.getItem('favoriteIdList'));
const cartIdListFromStorage = JSON.parse(localStorage.getItem('cartIdList'));

const findIndexId = (v, arr = []) => arr?.findIndex((id) => id === v) ?? -1;

export default {
  namespaced: true,
  state: () => ({
    favoriteIdList: Array.isArray(favoriteIdListFromStorage) ? favoriteIdListFromStorage : [],
    cartIdList: Array.isArray(cartIdListFromStorage) ? cartIdListFromStorage : [],
    itemList: [],
    materialList: [],
  }),
  getters: {
    getItemList(state) {
      return state.itemList;
    },
    getMaterialList(state) {
      return state.materialList;
    },
    getFavoriteIdList(state) {
      return state.favoriteIdList;
    },
    getCartIdList(state) {
      return state.cartIdList;
    },
  },
  mutations: {
    setItemList(state, list) {
      if (!Array.isArray(list)) {
        console.warn('list is not array');
        return;
      }
      state.itemList = list;
    },
    setMaterialList(state, list) {
      if (!Array.isArray(list)) {
        console.warn('list is not array');
        return;
      }
      state.materialList = list;
    },
    toCartHandler(state, v) {
      const { cartIdList } = state;

      if (!Array.isArray(cartIdList)) {
        console.error('cartIdList is not array');
        return;
      }

      const listCopy = [...cartIdList];

      const foundIndexId = findIndexId(v, cartIdList);

      if (foundIndexId === -1) {
        listCopy.push(v);
      } else {
        listCopy.splice(foundIndexId, 1);
      }

      state.cartIdList = listCopy;
      localStorage.setItem('cartIdList', JSON.stringify(listCopy));
    },
    toFavoriteHandler(state, v) {
      const { favoriteIdList } = state;

      if (!Array.isArray(favoriteIdList)) {
        console.error('favoriteIdList is not array');
        return;
      }

      const listCopy = [...favoriteIdList];

      const foundIndexId = findIndexId(v, favoriteIdList);

      if (foundIndexId === -1) {
        listCopy.push(v);
      } else {
        listCopy.splice(foundIndexId, 1);
      }

      state.favoriteIdList = listCopy;
      localStorage.setItem('favoriteIdList', JSON.stringify(listCopy));
    },
  },
  actions: {
    loadItemList({ commit }) {
      return new Promise((resolve, reject) => {
        if (Array.isArray(items)) {
          commit('setItemList', items);
          resolve(items);
        } else {
          reject(new Error('items is not array'));
        }
      });
    },
    loadMaterialList({ commit }) {
      return new Promise((resolve, reject) => {
        if (Array.isArray(materials)) {
          commit('setMaterialList', materials);
          resolve(materials);
        } else {
          reject(new Error('materials is not array'));
        }
      });
    },
  },
};
