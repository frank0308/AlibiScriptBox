<template>
    <div class="text-left py-3 px-5">
        <h3 class="title my-4 pb-2">我的劇本</h3>
        <div class="d-flex flex-wrap">
            <div v-for="(script, index) in scripts" :key="index" class="col-6">
                <b-card :title="script.Name" :img-src="script.Image" img-alt="Image" img-height="250px" img-width="170px" img-left tag="article" class="mb-4">
                    <b-button href="#" variant="danger">編輯內容</b-button>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            scripts: [{
                    Name: "收容失效",
                    Image: "https://i.imgur.com/UpUhVcd.png"
                },
                {
                    Name: "已知死亡",
                    Image: "https://i.imgur.com/iZnG23Z.png"
                },
                {
                    Name: "已知死亡",
                    Image: "https://i.imgur.com/iZnG23Z.png"
                },
            ]
        }
    }
};
</script>

<style>
.title {
    border-bottom: 2px solid #ccc;
}
</style>
