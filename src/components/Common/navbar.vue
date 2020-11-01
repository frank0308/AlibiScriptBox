<template>
  <div class="nav-wrapper">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar w-100">
      <b-navbar-brand>
        <router-link to="/" class="text-decoration-none"
          >Alibi's Script Box</router-link
        >
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            <router-link to="/scriptpage" class="text-decoration-none"
              >劇本清單</router-link
            >
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/scriptdetail" class="text-decoration-none"
              >劇本資訊</router-link
            >
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/memberinfo" class="text-decoration-none"
              >個人資訊</router-link
            >
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/scriptpage" class="text-decoration-none"
              >Test</router-link
            >
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button size="sm" @click="$bvModal.show('login')"> 登入 </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- Login Modal -->
    <b-modal
      centered
      id="login"
      title="登入"
      ok-title="確定"
      ok-variant="success"
      header-bg-variant="dark"
      header-text-variant="white"
      cancel-title="取消"
      @ok="onSubmit"
    >
      <b-form ref="form" :inline="true" class="d-flex justify-content-center">
        <b-form-group
          id="account"
          label="帳號 : "
          label-for="account"
          class="mb-3"
        >
          <b-form-input
            id="account"
            v-model="login.Account"
            type="text"
            required
            class="ml-3"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="password" label="密碼 : " label-for="password">
          <b-form-input
            id="password"
            v-model="login.Password"
            type="text"
            required
            class="ml-3"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        Account: "123",
        Password: "456",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log(JSON.stringify(this.login));
      this.$nextTick(() => {
        this.$bvModal.hide("login");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  position: sticky;
  top: 0;
  z-index: 2;

  .navbar {
    a {
      color: white;

      &:hover {
        color: #aaa;
      }
    }
  }
}
</style>
