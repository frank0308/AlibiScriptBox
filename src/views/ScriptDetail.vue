<template>
<b-container class="mt-3">
    <b-row>
        <div class="col-4 py-3 bg-dark rounded-left text-white">
            <b-carousel id="carousel-1" :interval="0" controls indicators background="#ababab"
            img-width="600" img-height="750" style="text-shadow: 1px 1px 2px #333;">
                <!-- Slides with image only -->
                <b-carousel-slide v-for="(img, index) in script.Images" :key="index" :img-src="img"></b-carousel-slide>
            </b-carousel>
            <h3 class="my-3">{{script.Name}}</h3>
            <div class="script-detail px-4 d-flex flex-wrap justify-content-between text-left">
                <div class="col-12 p-0">
                    <p class="difficulty w-100 text-left">
                        <span>劇本難度 : </span>
                        <b-icon icon="star-fill" variant="warning"></b-icon>
                        <b-icon v-if="script.Hard > 1" icon="star-fill" variant="warning"></b-icon>
                        <b-icon v-if="script.Hard > 2" icon="star-fill" variant="warning"></b-icon>
                        <b-icon v-if="script.Hard > 3" icon="star-fill" variant="warning"></b-icon>
                        <b-icon v-if="script.Hard > 4" icon="star-fill" variant="warning"></b-icon>
                    </p>
                </div>
                <div class="col-12 p-0">
                    <p class="w-100 text-left">價格 : {{script.Price}} /人<span v-if="script.IsPlace">（含場）</span></p>
                </div>
                <div class="col-6 p-0">
                    <b-icon icon="people-fill" variant="warning"></b-icon><p class="d-inline"> : {{script.PlayerNum}} 人</p>
                </div>
                <div class="col-6 p-0">
                    <b-icon icon="hourglass-split" variant="warning"></b-icon><p class="d-inline"> : {{script.Time}} Hours</p>
                </div>
                <div class="col-6 p-0">
                    <b-icon icon="emoji-sunglasses" variant="warning"></b-icon><p class="d-inline"> : {{script.GameMaster}}</p>
                </div>
                <div class="col-6 p-0">
                    <b-icon icon="info-circle-fill" variant="warning"></b-icon><p class="d-inline"> : {{script.Owner}}</p>
                </div>
            </div>
        </div>
        <div class="col-8 text-left px-5 bg-light rounded-right">
            <div class="introduce-area">
                <h3 class="my-3 py-1 w-50">劇本簡介</h3>
                <p class="intro-content px-4">{{script.Intro}}</p>
            </div>
            <div class="character-area">
                <h3 class="my-3 py-1 w-50">角色介紹</h3>
                <div v-for="person in script.Characters" :key="person.Name" class="character-list">
                    <div class="character w-100 my-2 py-3 d-flex flex-wrap align-items-center justify-content-center">
                        <div class="character-image-wrapper col-2 h-100">
                            <div class="character-image rounded-circle">
                            </div>
                        </div>
                        <div class="character-intro col-10 px-4">
                            <h5 class="my-2">{{person.Name}}</h5>
                            <p style="">{{person.Intro}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </b-row>
</b-container>
</template>

<script>
let script = {
                Name:"已知死亡",
                Images:["https://i.imgur.com/iZnG23Z.png", "https://i.imgur.com/xMCb1FL.png",],
                Characters:[
                    {
                        Name:"王美美",
                        Intro:"美麗動人的女子，但是個性有點基八",
                        Image:""
                    },
                    {
                        Name:"張帥帥",
                        Intro:"帥氣有形的男子，但是個性非常基八",
                        Image:""
                    },
                    {
                        Name:"劉公公",
                        Intro:"性別是劉公公，而且個性超級基八",
                        Image:""
                    },
                ],
                Intro:"一間空曠卻又略顯凌亂的船艙里， 幾位身著統一制服的人逐漸從昏迷中醒來，卻似乎都想不起自己為何會出現在這裡。 沈寂的荒島訴說著沈默的故事不斷拍打著沙灘的海浪裡裹挾著隱隱的哀鳴， 漆黑的樹林中傳來誘人芳香，盤旋的海鷗發出聒噪的嘶鳴， 猶如一群叫好的觀眾。 電閃雷鳴之下，血腥的海上舞台已為眾人搭好， 只等你在這荒誕的劇目里， 上演最後的「精彩」謝幕... 如果說死亡是我們每個人都必須償還的債，那明天我就將離去， 那我欠下的債只有下輩子來還了... 明天我們將會死亡...",
                Hard:4,
                PlayerNum:6,
                Time:5,
                Price:350,
                IsPlace:true,
                Tags:["硬核", "本格", "孤島求生"],
                GameMaster:"Frank",
                Owner:"Frank"
                
            };



export default {
    data() {
        return {
            script:script,
        }
    },
}
</script>

<style scope>
.carousel-item img {
    height:70vh;
}
.script-detail{
    font-size: 20px;
}
.script-detail p{
    margin-bottom: 10px;
}
.intro-content{
    line-height: 2;
    text-indent: 32px;
}
.introduce-area h3, .character-area h3{
    border-bottom: 2px solid #aaa;
}
.character{
    border-bottom: 1px dotted #ddd;
}
.character-area .character-list .character .character-image{
    background-image: url("https://i.imgur.com/ZM5EvHg.png");
    /* background-position: center; */
    background-size: cover;
    height: 100px;
    width: 100px;
}
.character-intro h5{
    font-weight: bold;
}
</style>
