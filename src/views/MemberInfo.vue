<template>
    <b-container>
        <b-row class="bg-light mt-3 rounded">
            <div class="col-3 bg-dark p-0 rounded-left text-white h-100">
                <div class="avatar-area mx-auto mt-4 rounded-circle bg-light">
                </div>
                <p class="member-name mt-3 mb-0 pb-3 border-bottom">Frank</p>
                <div class="sidebar-area bg-dark vh-100">
                    <b-list-group flush class="w-100 h-100">
                        <b-list-group-item variant="dark" href="#"><b-icon icon="file-earmark-person" class="h4 m-0 mr-2"></b-icon>個人資訊</b-list-group-item>
                        <b-list-group-item variant="dark" @click="informationPage='MyScript'" href="#"><b-icon icon="book-half" class="h4 m-0 mr-2"></b-icon>我的劇本</b-list-group-item>
                        <b-list-group-item variant="dark" @click="informationPage='CreateScript'" href="#"><b-icon icon="pencil-fill" class="h4 m-0 mr-2"></b-icon>新增劇本</b-list-group-item>
                    </b-list-group>
                </div>
            </div>
            <div class="col-9 bg-light rounded-right h-100">
                <component :is="informationPage"></component>
            </div>
        </b-row>
    </b-container>
</template>

<script>

import MyScript from "../components/MemberInfo/MyScript.vue"
import CreateScript from "../components/MemberInfo/CreateScript.vue"

export default {
    data(){
        return{
            informationPage:"MyScript"
        }
    },
    components:{
        MyScript,
        CreateScript
    },
}
</script>

<style scope>
.avatar-area{
    width: 200px;
    height: 200px;
    background-image: url("https://i.imgur.com/ZM5EvHg.png");
    background-size: cover;

}
.member-name{
    font-size: 24px;
}
.list-group-item{
    font-size: 20px;
}
</style>
