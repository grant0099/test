<template>
  <div class="hold-transition login-page optrend-login-page">
    <div class="login-box">
      <div class="card mb-5 animated fadeIn a5 d2">
        <div class="login-logo mb-0 mt-3 animated fadeInDown a3 d2">
          <a href="#">
            <img src="@/assets/images/admin-logo-login.png" />
          </a>
        </div>
        <div class="card-body login-card-body">
          <div class="social-auth-links text-center mb-3 container">
            <b-row>
              <b-col>
                <b-form-input
                  class="mb-2"
                  type="text"
                  size="md"
                  aria-describedby="account"
                  placeholder="Enter account"
                  v-model="account"
                  @keyup.enter="login"
                ></b-form-input>
                <b-form-invalid-feedback class="mb-2" id="account"> 請輸入帳號 </b-form-invalid-feedback>
                <b-form-input
                  class="mb-2"
                  type="password"
                  size="md"
                  placeholder="Enter password"
                  aria-describedby="password"
                  v-model="password"
                  @keyup.enter="login"
                ></b-form-input>
                <b-form-invalid-feedback class="mb-2" id="password"> 請輸入密碼 </b-form-invalid-feedback>
                <b-button @click="login" class="btn-gradient color-9" variant="primary">登入</b-button>
              </b-col>
            </b-row>
          </div>
        </div>
        <!-- /.login-card-body -->
      </div>
      <div class="login-copyright text-center small">
        <p>Copyright by OpView. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";

export default {
  data() {
    return {
      password: "",
      account: "",
    };
  },
  methods: {
    login() {
      if (this.account === "" || this.password === "") {
        alert("帳號或密碼不能為空");
      } else {
        this.axios({
          method: "post",
          baseURL: "https://release-test2.opview.com.tw",
          url: "/eduApi/login",
          data: {
            account: this.account,
            password: this.password,
          },
        })
          .then((result) => {
            var decoded = jwtDecode(result.data.data);
            if (decoded.userAccount === "admin") {
              this.$cookies.set("data1", result.data.data, "1h");
              this.$router.push("/Manage/AccountList");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
  beforeCreate: () => {},
};
</script>
