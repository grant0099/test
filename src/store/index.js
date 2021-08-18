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
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === memberItem.id) {
          state.items.splice(i, 1, memberItem);
          break;
        }
      }
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
      console.log(memberItem);
      context.commit("updateMember", memberItem);
      //       account: "Member-0"
      // createTime: "2021/01/12 14:37:20"
      // enable: true
      // id: 0
      // updateTime: "2021/01/12 14:37:20
      // id: 0
    },
  },
  modules: {},
});
