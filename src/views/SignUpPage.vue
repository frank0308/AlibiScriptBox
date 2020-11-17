<template>
<div>
    <b-container>
        <b-row class="px-5 py-5 my-3 bg-light rounded">
            <h3 class="title mb-3 pb-2 w-100 text-left">註冊會員</h3>
            <b-form class="w-100 bg-white rounded py-3 px-5 d-flex" @submit="onSubmit">
                <div class="col-5">
                    <div class="d-flex flex-wrap justify-content-center">
                        <div class="avatar my-3 rounded-circle"></div>
                        <div class="w-100 text-left">
                            <b-form-group label="上傳頭像 :" label-for="avatar" label-cols-sm="12">
                                <b-form-file id="avatar" size="sm" accept=".gif,.jpg,.jpeg,.png" placeholder="" browse-text="瀏覽" @input="uploadImage"></b-form-file>
                            </b-form-group>
                        </div>
                    </div>
                </div>
                <div class="col-7">
                    <div class="w-100 text-left">
                        <b-form-group id="account-label" label="帳號 :" label-for="account">
                            <b-form-input id="account" v-model="userInfo.Account" placeholder="Enter Account" :state="IsValidAccount"></b-form-input>
                            <b-form-invalid-feedback :state="IsValidAccount">
                                不合法的帳號
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </div>
                    <div class="w-100 text-left">
                        <b-form-group id="password-label" label="密碼 :" label-for="password">
                            <b-form-input type="password" id="password" v-model="userInfo.Password" placeholder="Enter Password" :state="IsValidPassword"></b-form-input>
                            <b-form-invalid-feedback :state="IsValidPassword">
                                不合法的密碼
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </div>
                    <div class="w-100 text-left">
                        <b-form-group id="confirmPassword-label" label="確認密碼 :" label-for="confirmPassword">
                            <b-form-input type="password" id="confirmPassword" v-model="userInfo.ConfirmPassword" placeholder="Comfirm Password" :state="recheckPassword"></b-form-input>
                            <b-form-invalid-feedback :state="recheckPassword">
                                與密碼不一致
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </div>
                    <div class="w-100 text-left">
                        <b-form-group id="nickName-label" label="暱稱 :" label-for="nickName">
                            <b-form-input type="text" id="nickName" v-model="userInfo.Name" placeholder="Enter NickName" :state="IsValidNickname"></b-form-input>
                            <b-form-invalid-feedback :state="IsValidNickname">
                                不合法的暱稱
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </div>
                    <div class="w-100 text-left">
                            <b-form-group label="是否有管理劇本的需求？">
                                <b-form-radio-group v-model="userInfo.IsScriptOwner" name="is-script-owner">
                                    <b-form-radio value="false">否</b-form-radio>
                                    <b-form-radio value="true">是</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                    </div>
                    <div class="w-100 py-3 text-right">
                        <b-button type="submit" variant="success" class="text-right">註冊</b-button>
                    </div>
                </div>
            </b-form>
        </b-row>
    </b-container>
</div>
</template>

<script>

import axios from "axios";

export default {
    data() {
        return {
            userInfo: {
                Account: "",
                Password: "",
                ConfirmPassword: "",
                Name: "",
                Avatar: "https://i.imgur.com/kioNyff.png",
                IsScriptOwner: "false"
            },
            recheckPassword: null,
            IsValidAccount: null,
            IsValidPassword: null,
            IsValidNickname: null
        };
    },
    computed: {},
    methods: {
        onSubmit: function (event) {
            event.preventDefault();
            this.recheckPassword = this.userInfo.Password == this.userInfo.ConfirmPassword;
            this.IsValidAccount = this.userInfo.Account.length > 0;
            this.IsValidPassword = this.userInfo.Password.length > 0;
            this.IsValidNickname = this.userInfo.Name.length > 0;
            if (this.recheckPassword && this.IsValidAccount && this.IsValidNickname && this.IsValidPassword) {
                console.log(JSON.stringify(this.userInfo));
                axios.post("https://localhost:44382/api/User", this.userInfo)
                .then(() => {
                    this.$swal({
                        title: '註冊成功',
                        icon: 'success',
                        showConfirmButton: true,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: '確認'
                        }).then(() => {
                            this.$router.push('/')
                        })
                }).catch(() => {
                    this.$swal({
                        title: '此帳號已經被註冊囉',
                        icon: 'error',
                        showConfirmButton: true
                    })
                })
                
            }
        },
        uploadImage:function(file){
            let vm = this;
            if(file != null){
                let imgData;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    imgData = e.target.result.slice(e.target.result.indexOf(',') + 1);
                    let form = new FormData();
                    form.append("image", imgData);

                    axios({
                        "url": "https://api.imgur.com/3/image",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Authorization": "Client-ID 613256f2146a430"
                        },
                        "processData": false,
                        "mimeType": "multipart/form-data",
                        "contentType": false,
                        "data": form
                    }).then(response =>{
                        vm.userInfo.Avatar = response.data.data.link;
                        document.querySelector('.avatar').style.backgroundImage = `url(${response.data.data.link})`;
                    }).catch(function(response){
                        console.log(response)
                    })
                }
            }
        }
    }
};
</script>

<style scope>
.title {
    border-bottom: 2px solid #ccc;
}

label {
    font-size: 18px;
}

.avatar {
    width: 200px;
    height: 200px;
    background-image: url("https://i.imgur.com/kioNyff.png");
    background-size: cover;
}

.col-form-label {
    font-size: 18px;
}
</style>
