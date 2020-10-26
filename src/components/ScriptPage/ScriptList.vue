<template>
<div>
    <div class="d-flex flex-wrap mx-auto">
        <div class="my-3 mx-4" v-for="script in Scripts" :key="script.Id">
            <a href="#" class="script text-decoration-none text-dark">
                <b-card :title="script.Title" :img-src="script.Image" img-alt="Image" img-height="370px" img-top tag="article" style="max-width: 20rem;" class="text-left">
                    <div class="tags d-flex flex-wrap">
                        <div  v-for="tag in script.Tags" :key="tag">
                            <b-badge class="mr-2">{{tag}}</b-badge>
                        </div>
                    </div>
                    <p class="feature my-2"><b-icon icon="people-fill" variant="success"></b-icon><span class="ml-2">{{script.People}} 人</span></p>
                    <p class="feature my-2"><b-icon icon="clock-fill" variant="success"></b-icon><span class="ml-2">{{script.Time}} 小時</span></p>
                    <p class="feature my-2"><b-icon icon="cash" variant="success"></b-icon><span class="ml-2">{{script.Price}}</span></p>
                </b-card>
            </a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            Scripts:[
                {
                    Id:"1",
                    Title:"收容失效",
                    Image:"https://i.imgur.com/UpUhVcd.png",
                    Tags:["硬核", "變格", "SCP"],
                    People:"5",
                    Time:"5",
                    Price:"350（含場）"
                },
                {
                    Id:"2",
                    Title:"已知死亡",
                    Image:"https://i.imgur.com/iZnG23Z.png",
                    Tags:["硬核", "本格", "孤島求生"],
                    People:"6",
                    Time:"5",
                    Price:"350（含場）"
                },
                {
                    Id:"2",
                    Title:"已知死亡",
                    Image:"https://i.imgur.com/iZnG23Z.png",
                    Tags:["硬核", "本格", "孤島求生"],
                    People:"6",
                    Time:"5",
                    Price:"350（含場）"
                },
                {
                    Id:"2",
                    Title:"已知死亡",
                    Image:"https://i.imgur.com/iZnG23Z.png",
                    Tags:["硬核", "本格", "孤島求生"],
                    People:"6",
                    Time:"5",
                    Price:"350（含場）"
                },
                {
                    Id:"2",
                    Title:"已知死亡",
                    Image:"https://i.imgur.com/iZnG23Z.png",
                    Tags:["硬核", "本格", "孤島求生"],
                    People:"6",
                    Time:"5",
                    Price:"350（含場）"
                },
            ]
        }
    }
};
</script>

<style scope>
.script{
    cursor: pointer;
}
.script:hover .card-body{
    background-color: #eee;
}
.card-body .card-title{
        margin: 15px 0px 5px;
        font-weight: bold;
}
.tags .badge{
    font-size: 16px;
}
.bi{
    font-size: 20px;
}
.feature span{
    font-size: 14px;
}
</style>
