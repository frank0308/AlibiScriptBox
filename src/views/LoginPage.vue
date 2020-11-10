<template>
    <b-container>
        <b-row class="px-5 py-5 my-3 bg-light rounded">
            <h3 class="title mb-3 pb-2 w-100 text-left">登入會員</h3>
            <b-form class="w-100 bg-white rounded py-3 px-5" @submit="onSubmit">
              <div class="w-50 text-left mx-auto">
                  <b-form-group id="account-label" label="帳號 :" label-for="account">
                      <b-form-input id="account" size="lg" v-model="login.Account" placeholder="Enter Account" :state="IsValidAccount"></b-form-input>
                      <b-form-invalid-feedback :state="IsValidAccount">
                          不合法的帳號
                      </b-form-invalid-feedback>
                  </b-form-group>
              </div>
              <div class="w-50 text-left mx-auto">
                  <b-form-group id="password-label" label="密碼 :" label-for="password">
                      <b-form-input type="password" id="password" size="lg" v-model="login.Password" placeholder="Enter Password" :state="IsValidPassword"></b-form-input>
                      <b-form-invalid-feedback :state="IsValidPassword">
                          不合法的密碼
                      </b-form-invalid-feedback>
                  </b-form-group>
              </div>
              <div class="w-50 text-left mx-auto">
                <b-form-checkbox
                  id="rememberMe"
                  name="rememberMe"
                  v-model="IsRememberMe"
                  value="true"
                  unchecked-value="false"
                >
                  記住我
                </b-form-checkbox>
              </div>
              <div class="w-50 py-3 text-right mx-auto">
                <b-button type="submit" variant="success" class="text-right">登入</b-button>
              </div>
            </b-form>
        </b-row>
    </b-container>
</template>

<script>
// import Axios from 'axios';
import axios from '../helpers/https'

export default {
  created(){
    if(localStorage.getItem('myInfo') != null){
      this.login = JSON.parse(localStorage.getItem('myInfo'));
    }
  },
  data(){
    return{
      login:{
        Account:"",
        Password:""
      },
      IsValidAccount:null,
      IsValidPassword:null,
      IsRememberMe:"false",
    }
  },
  methods:{
    onSubmit:function(event){
      event.preventDefault();
      this.IsValidAccount = this.login.Account.length > 0;
      this.IsValidPassword = this.login.Password.length > 0;

      if(this.IsRememberMe == "true"){
        let info = JSON.stringify(this.login)
        localStorage.setItem("myInfo", info)
      }

      if(this.IsValidAccount && this.IsValidPassword){
        axios("get","/Login", this.login)
        .then((response) => {
          let token = response.data;
          this.$store.dispatch('auth/setAuth', {
            token:token,
            isLogin:true,
            user:{
              Name:"",
              Image:""
            }
          })

          axios("get", '/User')
          .then((response) => {
            console.log(response);
            this.$store.dispatch('auth/setAuth', {
              token:token,
              isLogin:true,
              user:{
                Name:response.data.name,
                Image:response.data.image
              }
            })
            localStorage.setItem('Flag', 'isLogin')
            
            this.$swal({
            title: '登入成功',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '確認'
            }).then(() => {
                this.$router.go('/')
            })
          })
        })
      }
    }
  }
}
</script>

<style scope>
.title {
    border-bottom: 2px solid #ccc;
}
label {
    font-size: 20px;
}

</style>