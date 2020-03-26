import uuidv4 from '../../plugins/uuid';

const budgetStore = {
  namespaced: true,
  state: {
    list: {
      1: {
        type: 'INCOME',
        value: 100,
        comment: 'Some comment',
        id: 1,
      },
      2: {
        type: 'OUTCOME',
        value: -50,
        comment: 'Some outcome comment',
        id: 2,
      },
    },
  },
  getters: {
    budgetList: ({ list }) => Object.values(list),
  },
  mutations: {
    DELETE_ITEM(state, newList) {
      state.list = { ...newList };
    },
    ADD_ITEM(state, newItem) {
      state.list = {
        ...state.list,
        [newItem.id]: newItem,
      };
    },
  },
  actions: {
    deleteItem({ state, commit }, itemId) {
      delete state.list[itemId];
      const newList = { ...state.list };
      commit('DELETE_ITEM', newList);
    },
    addItem({ commit }, newItem) {
      const id = uuidv4();
      const newItemWithId = {
        ...newItem,
        id: String([id]),
      };
      commit('ADD_ITEM', newItemWithId);
    },
  },
};

export default budgetStore;
