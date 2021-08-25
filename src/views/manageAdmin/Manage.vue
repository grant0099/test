<template>
  <div class="mainBody" :style="collapseState ? 'padding-left:50px;' : 'padding-left:250px;'">
    <div class="content">
      <nav class="navbar navbar-expand-md navbar-light navbar-white border-bottom-0 navbar-trend">
        <div class="container-fluid">
          <img src="@/assets/images/logo-header-white.png" alt="OpView Trend Logo" class="brand-image" />
          <!-- Right navbar links -->
          <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
            <!-- Messages Dropdown Menu -->
            <li class="nav-item dropdown">
              <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                <template v-slot:button-content>
                  <a class="nav-link nav-link-user" data-toggle="dropdown" href="#" style="color: white !important">
                    <i class="material-icons-outlined md-24">person_outline</i>
                  </a>
                </template>
                <b-dropdown-text>
                  <b-media no-body>
                    <b-media-aside>
                      <span class="nav-user-50 img-size-50 mr-3">
                        <i class="material-icons-outlined md-24">person_outline</i>
                      </span>
                    </b-media-aside>
                    <b-media-body>
                      <h3 class="dropdown-item-title dropdown-item-user mb-2" style="white-space: nowrap">
                        {{ adminName }} @eLand - 系統管理者
                      </h3>
                      <router-link
                        to="/LogOut"
                        class="btn btn-sm btn-gradient color-11 mt-2 mb-2"
                        style="margin-right: 4px; width: 100px"
                      >
                        <span>
                          <i class="material-icons-outlined md-18">person_outline</i>
                        </span>
                        登出
                      </router-link>
                    </b-media-body>
                  </b-media>
                </b-dropdown-text>
              </b-dropdown>
            </li>
          </ul>
        </div>
      </nav>
      <SidebarMenu
        :menu="menu"
        :theme="'white-theme'"
        :width="'250px'"
        :collapsed="true"
        :disableHover="true"
        @toggle-collapse="collapseState = !collapseState"
      ></SidebarMenu>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.mainBody {
  height: 155vh;
  background: url("../../assets/images/optrend-login-bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
}
.content {
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
}
.card-header {
  font-weight: bold;
  font-size: 20px;
}
.fontFormat {
  font-size: 20px;
}
body {
  padding-right: 0 !important;
}
</style>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import jwtDecode from "jwt-decode";

// Vue.use(VueJwtDecode);
export default {
  components: {
    SidebarMenu,
  },
  mounted() {
    this.menu = [
      {
        header: true,
        title: "Trend 管理站台",
        hiddenOnCollapse: true,
      },
      {
        href: "/Manage/AccountList",
        title: "服務帳號",
        icon: "fa fa-user",
      },
      {
        href: "/Manage/HighchartResult",
        title: "highchart",
        icon: "fas fa-braille",
      },
    ];
    var decoded = jwtDecode(this.$cookies.get("data1"));
    this.adminName = decoded.userAccount;
  },
  data() {
    return {
      adminName: "",
      collapseState: true,
      menu: [],
    };
  },
};
</script>
