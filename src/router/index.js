import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
// import AccountEditModal from "../components/manageAdmin/AccountEditModal.vue";
import AccountList from "../views/manageAdmin/AccountList.vue";
import Manage from "../views/manageAdmin/Manage.vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Login",
  },
  {
    path: "/LogOut",
    name: "LogOut",
    component: Login,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Manage",
    name: "Manage",
    component: Manage,
    children: [{ path: "AccountList", component: AccountList }],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const jwtToken = Vue.$cookies.get("data1");

  if (to.path === "/LogOut") {
    Vue.$cookies.set("data1", "", 0);
    next("/LogIn");
  }
  if (jwtToken == null) {
    if (to.path === "/LogIn") {
      next();
    } else {
      next("/LogIn");
    }
  } else {
    if (to.path === "/LogIn") {
      next("/Manage/AccountList");
    } else {
      next();
    }
  }
});

export default router;
