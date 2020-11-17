<template>
    <div class="text-left py-3 px-5">
        <h3 class="title my-4 pb-2">我的劇本</h3>
        <div class="d-flex flex-wrap">
            <div v-for="(script, index) in scripts" :key="index" class="col-6">
                <b-card :title="script.name" :img-src="script.image" img-alt="Image" img-height="250px" img-width="170px" img-left tag="article" class="mb-4">
                    <b-button href="#" variant="success" class="mb-3">編輯內容</b-button>
                    <b-button href="#" variant="danger">刪除劇本</b-button>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>

import axiosInstance from '../../helpers/https'

export default {
    created(){
        axiosInstance('get', '/User/GetMyScript')
        .then((response) => {
            console.log(response);
            this.$data.scripts = response.data
        })
    },
    data() {
        return {
            scripts: []
        }
    }
};
</script>

<style scope>
.title {
    border-bottom: 2px solid #ccc;
}
</style>
