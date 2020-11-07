<template>
  <div class="text-left py-3 px-5">
    <h3 class="title my-4 pb-2">新增劇本</h3>
    <div>
      <b-form class="bg-white rounded py-3 px-5" @submit="onSubmit">
        <div class="w-50">
          <b-form-group
            id="script-name-group"
            label="劇本名稱 :"
            label-for="script-name"
          >
            <b-form-input
              id="script-name"
              type="text"
              v-model="script.Name"
              required
            >
            </b-form-input>
          </b-form-group>
        </div>

        <div class="w-100">
          <b-form-group
            id="script-intro-group"
            label="劇本簡介 :"
            label-for="script-intro"
          >
            <b-form-textarea
              id="script-intro"
              v-model="script.Intro"
              rows="4"
              max-rows="8"
              required
            ></b-form-textarea>
          </b-form-group>
        </div>

        <div class="w-100">
          <div>角色介紹 :</div>
          <b-button size="sm" class="my-1" @click="$bvModal.show('create-character-modal')">添加角色</b-button>
          <div class="character-area rounded w-100 my-2" :class="{'border': IsAnyCharacter}">
            <div v-for="(character, index) in script.Characters" :key="index" class="character w-100 d-flex">
              <div class="character-image-wrapper p-2">
                <div class="character-image rounded-circle"></div>
              </div>
              <div class="character-intro w-100 mx-2">
                <h6 class="my-2">{{character.Name}}</h6>
                <p>{{character.Intro}}</p>
                <div class="d-flex justify-content-end pb-2">
                  <b-button size="sm" variant="danger" @click="deleteCharacter(index)">刪除</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-50">
          <b-form-group
            id="script-person-group"
            label="劇本人數 :"
            label-for="script-person"
          >
            <b-form-input
              id="script-person"
              type="number"
              v-model="script.PlayerNum"
              required
            >
            </b-form-input>
          </b-form-group>
        </div>

        <div class="w-50">
          <b-form-group
            id="script-time-group"
            label="劇本時長 :"
            label-for="script-time"
          >
            <b-form-input
              id="script-time"
              type="number"
              v-model="script.Time"
              required
            >
            </b-form-input>
          </b-form-group>
        </div>

        <div class="w-50">
          <b-form-group
            id="script-difficulty-group"
            label="劇本難度 :"
            label-for="script-difficulty"
          >
            <b-form-select
              v-model="script.Difficulty"
              :options="DifficultyOptions"
              required
            ></b-form-select>
          </b-form-group>
        </div>

        <div class="w-50">
          <b-form-group
            id="script-price-group"
            label="價格 :"
            label-for="script-price"
          >
            <b-form-input
              id="script-price"
              type="number"
              v-model="script.Price"
              required
            ></b-form-input>
            <b-form-checkbox
              id="script-isPlace"
              v-model="script.IsPlace"
              name="script-isPlace"
              :value="true"
              :unchecked-value="false"
              class="mt-1"
            >
              包含場地費
            </b-form-checkbox>
          </b-form-group>
        </div>

        <div class="w-50">
          <b-form-group
            id="script-gameMaster-group"
            label="GM :"
            label-for="script-gameMaster"
          >
            <b-form-input
              id="script-gameMaster"
              type="text"
              v-model="script.GameMaster"
              required
            >
            </b-form-input>
          </b-form-group>
        </div>

        <div class="w-50">
          <b-form-group
            id="script-tags-group"
            label="添加標籤 :"
            label-for="script-tag"
          >
            <b-input-group>
              <b-form-input id="script-tag" type="text"></b-form-input>

              <b-input-group-append>
                <b-button variant="secondary" @click="addTag">確認</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <p class="d-inline">現有標籤 : {{previewTags}}</p>
        </div>

        <div class="text-right">
          <b-button type="submit" variant="success">完成編輯</b-button>
        </div>

      </b-form>
    </div>

    <!-- Character Modal -->
    <b-modal
      centered
      id="create-character-modal"
      title="建立角色資訊"
      ok-title="確定"
      ok-variant="success"
      header-bg-variant="dark"
      header-text-variant="white"
      cancel-title="取消"
      @ok="createCharacter"
    >
      <b-form ref="form" class="px-5">
        <b-form-group
          id="character-name"
          label="角色名稱 : "
          label-for="character-name"
          class="mb-3"
        >
          <b-form-input
            id="character-name"
            type="text"
            v-model="newCharacterInfo.Name"
            :state="IsValidCharacterName"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="IsValidCharacterName">
            角色名稱長度不得小於0
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="character-intro" label="角色簡介 : " label-for="character-intro">
          <b-form-textarea
              id="character-intro"
              v-model="newCharacterInfo.Intro"
              :state="IsValidCharacterIntro"
              required
          ></b-form-textarea>
          <b-form-invalid-feedback :state="IsValidCharacterIntro">
            角色簡介長度不得小於10
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="character-image" label="角色頭像 : 敬請期待" label-for="character-image">
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DifficultyOptions:[
          { value: 1, text: "無腦" },
          { value: 2, text: "簡單" },
          { value: 3, text: "普通" },
          { value: 4, text: "困難" },
          { value: 5, text: "地獄" },
      ],
      script: {
        Name: "",
        Images: [],
        Characters: [{Name:"王美美", Intro:"超級機掰人"},{Name:"王美美", Intro:"超級機掰人"},],
        Intro: "",
        Difficulty:3,
        PlayerNum: null,
        Time: null,
        Price: null,
        IsPlace: false,
        Tags: [],
        GameMaster: "",
        Owner: "",
      },
      newCharacterInfo:{
        Name:"",
        Intro:"",
      }
    };
  },
  computed:{
    previewTags:function(){
      return this.script.Tags.length == 0 ? "無" : this.script.Tags.join(',');
    },
    IsAnyCharacter(){
      return this.script.Characters.length > 0;
    },
    IsValidCharacterName(){
      return this.newCharacterInfo.Name.length > 0;
    },
    IsValidCharacterIntro(){
      return this.newCharacterInfo.Intro.length > 9;
    }
  },
  methods:{
    onSubmit: function(event){
      event.preventDefault();
      console.log(JSON.stringify(this.script));
    },
    addTag: function(){
      if(document.getElementById('script-tag').value.length > 0){
        this.script.Tags.push(document.getElementById('script-tag').value);
      }
      document.getElementById('script-tag').value = "";
    },
    createCharacter: function(e){
      e.preventDefault();

      if(this.IsValidCharacterName && this.IsValidCharacterIntro){
        this.script.Characters.push({
          Name : document.getElementById('character-name').children[1].children[0].value,
          Intro : document.getElementById('character-intro').children[1].children[0].value
        });
        this.$nextTick(() => {
          this.newCharacterInfo.Name = "";
          this.newCharacterInfo.Intro = "";
          this.$bvModal.hide("create-character-modal");
        });
      }
    },
    deleteCharacter: function(index){
      this.script.Characters.splice(index, 1);
    }
  }
};
</script>

<style scope>
.title {
  border-bottom: 2px solid #ccc;
}
.character:not(:last-child){
  border-bottom: 1px solid #ddd;
}
.character-image{
  width: 100px;
  height: 100px;
  background-image: url("https://i.imgur.com/ZM5EvHg.png");
  background-size: cover;
}
.character-intro p{
  font-size: 14px;
}
</style>