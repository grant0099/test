import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
// import createPersistedState from "vuex-persistedstate";
// import Login from "../views/Login.vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
  },
  mutations: {
    setMember(state, items) {
      for (let i = 0; i < items.length; i++) {
        items[i].id = i;
      }
      state.items = items;
    },
    updateMember(state, memberItem) {
      const copyItems = JSON.parse(JSON.stringify(state.items));
      for (let i = 0; i < copyItems.length; i++) {
        if (copyItems[i].id === memberItem.id) {
          copyItems.splice(i, 1, memberItem);
          break;
        }
      }
      state.items = JSON.parse(JSON.stringify(copyItems));
    },
  },
  getters: {
    getItems(state) {
      return state.items;
    },
  },
  actions: {
    getMember(context) {
      const jwtToken = Vue.$cookies.get("data1");
      Vue.axios({
        method: "post",
        baseURL: "https://release-test2.opview.com.tw",
        url: "/eduApi/member",
        data: {
          action: "query",
        },
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + jwtToken },
      })
        .then((result) => {
          context.commit("setMember", result.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updateMember(context, memberItem) {
      context.commit("updateMember", memberItem);
    },
  },
  modules: {},
});
