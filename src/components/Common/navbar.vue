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
            <router-link to="/scriptpage" class="text-decoration-none"
              >Test</router-link
            >
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-button size="sm" :to="{path: '/login'}" class="mr-3" v-show="!isLogin"> 登入 </b-button>

          <b-navbar-brand class="mr-0" v-show="isLogin">
            <div class="userImage rounded-circle"></div>
          </b-navbar-brand>

          <b-nav-item-dropdown right v-show="isLogin">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>我的資訊</em>
            </template>

            <b-dropdown-header id="dropdown-header-label">
              {{this.$store.state.auth.user.Name}}
            </b-dropdown-header>

            <b-dropdown-item>
              <router-link :to="{ path: '/MemberInfo/MyInfomation'}" class="text-decoration-none text-dark">個人資訊</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ path: '/MemberInfo/MyScript'}" class="text-decoration-none text-dark">我的劇本</router-link>
            </b-dropdown-item>
            <b-dropdown-item >
              <router-link :to="{ path: '/MemberInfo/CreateScript'}" class="text-decoration-none text-dark">新增劇本</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="logout">登出</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  </div>
</template>

<script>
export default {
  mounted(){
    let avatar = document.querySelector('.navbar-nav .navbar-brand .userImage');
    avatar.style.backgroundImage = `url(${this.$store.state.auth.user.Image})`
  },
  data() {
    return {
      isLogin:this.$store.state.auth.isLogin
    };
  },
  computed:{

  },
  methods: {
    onSubmit:function(event) {
      event.preventDefault();
      console.log(JSON.stringify(this.login));
      this.$nextTick(() => {
        this.$bvModal.hide("login");
      });
    },
    logout:function(){
      localStorage.removeItem('Flag');
      localStorage.removeItem('vuex');
      this.$router.go(this.$router.currentRoute.path)
    }
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
    .navbar-nav{
      .navbar-brand{
        .userImage{
          width: 30px;
          height: 100%;
          // background-color: blueviolet;
          background-image: url("../../../public/MrAlibi.png");
          background-size: cover;
        }
      }

      #dropdown-header-label{
        font-size: 18px;
      }
    }
  }
}
</style>
