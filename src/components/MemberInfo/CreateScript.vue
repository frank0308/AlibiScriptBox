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
              :state="formCheck.IsValidName"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="formCheck.IsValidName">
              劇本名稱不得為空
            </b-form-invalid-feedback>
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
              :state="formCheck.IsValidIntro"
            ></b-form-textarea>
            <b-form-invalid-feedback :state="formCheck.IsValidIntro">
              劇本簡介字數不得 小於10字 或者 大於400字
            </b-form-invalid-feedback>
          </b-form-group>
        </div>
        <div class="w-100">
          <div>圖片介紹 :</div>
          <b-button size="sm" id="show-btn" @click="$bvModal.show('image-modal')">上傳圖片</b-button>
          <el-upload
            class="preview-image"
            action="#"
            :on-preview="handlePreview"
            :on-remove="handleRemoveForImages"
            :file-list="this.script.Images"
            :auto-upload="false"
            list-type="picture">
            <!-- <el-button size="small" type="info">上傳圖片</el-button> -->
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
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
              :state="formCheck.IsValidPlayerNum"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="formCheck.IsValidPlayerNum">
              劇本人數不得為空
            </b-form-invalid-feedback>
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
              :state="formCheck.IsValidTime"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="formCheck.IsValidTime">
              劇本時長不得為空
            </b-form-invalid-feedback>
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
            id="script-category-group"
            label="劇本類別 :"
            label-for="script-category"
          >
            <b-form-select
              v-model="script.Category"
              :options="CategoryOptions"
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
              :state="formCheck.IsValidPrice"
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
            <b-form-invalid-feedback :state="formCheck.IsValidPrice">
              劇本價格不得為空
            </b-form-invalid-feedback>
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
              :state="formCheck.IsValidGameMaster"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="formCheck.IsValidGameMaster">
              GM不得為空
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <div class="w-50 mb-5">
          <label for="tags">新增標籤 :</label>
          <b-form-tags input-id="tags" v-model="script.Tags" placeholder="" :limit="5"></b-form-tags>
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
            角色簡介長度不得小於0
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="character-image" label="角色頭像 : 敬請期待" label-for="character-image">
        </b-form-group>
      </b-form>
    </b-modal>

  <!-- Image Modal -->
  <b-modal id="image-modal" hide-footer hide-header>
    <b-overlay :show="isUploadingImage">
      <div class="d-block">
        <el-upload
          class="upload-image"
          ref="upload"
          action="#"
          :on-preview="handlePreview"
          :on-exceed="handleExceed"
          :before-upload="beforeUpload"
          :http-request="handleUpload"
          :file-list="fileList"
          :multiple="true"
          :auto-upload="false"
          :limit="3"
          list-type="picture">
          <el-button size="small" type="info">選擇圖片</el-button>
          <div slot="tip" class="el-upload__tip">單次上傳以三張為限，多圖可多次上傳，格式僅接受jpg/jpeg/png，且大小不超過500KB</div>
        </el-upload>
      </div>
      <b-button class="mt-3" block @click="submitImage" variant="success">確認上傳</b-button>
      <b-button class="mt-3" block @click="setImageOrder" variant="info">下一步</b-button>
      <b-button class="mt-3" block @click="$bvModal.hide('image-modal')">取消</b-button>
    </b-overlay>
  </b-modal>

  <!-- Order Modal -->
  <b-modal id="order-modal" hide-footer hide-header>
    <p class="text-danger">設定圖片顯示順序，由小至大排列，如設置為 1 則為封面圖</p>
    <div class="d-flex flex-wrap border">
      <div class="col-9 p-0">
        <p class="text-center border-right py-2 m-0">預覽圖片</p>
      </div>
      <div class="col-3 p-0">
        <p class="text-center py-2 m-0">排序</p>
      </div>
    </div>
    <div v-for="(image, index) in this.fileList" :key="index" class="d-flex flex-wrap border border-top-0">
      <div class="col-9 p-0 border-right">
        <div class="image-area py-2">
          <div class="image mx-auto h-100" :style="{ backgroundImage: 'url(' + image.url + ')' }"></div>
        </div>
      </div>
      <div class="col-3 p-0">
        <div class="order-area h-100 d-flex justify-content-center align-items-center">
          <b-form-input class="w-50" id="order-number" v-model="image.orderNum" type="number" min="1"></b-form-input>
        </div>
      </div>
    </div>
    <b-button class="mt-3" block @click="uploadImageComplete" variant="success">完成</b-button>
    <b-button class="mt-3" block @click="$bvModal.hide('order-modal')">取消</b-button>
  </b-modal>

  </div>
</template>


<script>

import axiosInstance from '../../helpers/https'
import axios from 'axios'

export default {
  // created(){
  //   let vm = this;
  // },
  data() {
    return {
      DifficultyOptions:[
          { value: 1, text: "無腦" },
          { value: 2, text: "簡單" },
          { value: 3, text: "普通" },
          { value: 4, text: "困難" },
          { value: 5, text: "地獄" },
      ],
      CategoryOptions:[
          { value: 1, text: "硬核" },
          { value: 2, text: "歡樂" },
          { value: 3, text: "情感" },
          { value: 4, text: "機制" },
          { value: 5, text: "恐怖" },
      ],
      script: {
        Name: "",
        Images: [],
        Characters: [{Name:"王美美", Intro:"超級機掰人"},{Name:"王美美", Intro:"超級機掰人"},],
        Intro: "",
        Difficulty:3,
        Category:1,
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
      },
      formCheck:{
        IsValidName:null,
        IsValidIntro:null,
        IsValidPlayerNum:null,
        IsValidPrice:null,
        IsValidTime:null,
        IsValidGameMaster:null,
      },
      isUploadingImage:false,
      fileList: [],
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
      this.formCheck.IsValidName = this.script.Name.length > 0;
      this.formCheck.IsValidIntro = this.script.Intro.length > 0 && this.script.Intro.length < 400;
      this.formCheck.IsValidPlayerNum = this.script.PlayerNum != null;
      this.formCheck.IsValidPrice = this.script.Price != null;
      this.formCheck.IsValidTime = this.script.Time != null;
      this.formCheck.IsValidGameMaster = this.script.GameMaster.length > 0;
      if(this.formCheck.IsValidName && this.formCheck.IsValidIntro && this.formCheck.IsValidPlayerNum && this.formCheck.IsValidPrice
      && this.formCheck.IsValidTime && this.formCheck.IsValidGameMaster){        
        console.log(this.script)
        axiosInstance('post', '/Script', this.script)
        .then((response) => {
          console.log(response)
          this.$swal({
            title: '劇本資訊創建成功',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '確認'
            }).then(() => {
              this.$router.push({ path: '/MemberInfo/MyScript'});
            })
        })
      }
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
    },
    setImageOrder:function(){
      this.$bvModal.hide('image-modal');
      this.$bvModal.show('order-modal');
    },
    uploadImageComplete:function(){
      this.script.Images = this.fileList;
      this.$bvModal.hide('order-modal');
      this.fileList = [];
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleRemoveForImages(file, fileList) {
      this.script.Images = fileList;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed() {
      this.$swal({
        title: '單次上傳圖片不得超過3張',
        icon: 'warning',
        showConfirmButton: true
      })
    },
    beforeUpload(){
      this.isUploadingImage = true;
    },
    handleUpload:function(response){
      let vm = this;
      console.log(response)
      let reader = new FileReader();
      reader.readAsDataURL(response.file);
      reader.onload = function (e) {
        let imgData = e.target.result.slice(e.target.result.indexOf(',') + 1);
        let form = new FormData();
        form.append("image", imgData);
        form.append('type', 'base64')

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
        }).then(function(response){
            let obj = {
              name : "上傳成功",
              url : response.data.data.link,
              orderNum : null
            };
            vm.fileList.push(obj);
            vm.isUploadingImage = false;
        }).catch(function(response){
          console.log(response)
          vm.$swal({
            title: '糟糕！圖片上傳好像出了點問題，再試一次吧',
            icon: 'error',
            showConfirmButton: true
          });
        })
      }
    },
    submitImage:function(){
      this.$refs.upload.submit();
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
.preview-image .el-upload{
  display:none
}
.el-button{
  background-color: #6c757d!important;
  font-size: 14px;
  padding: 7px 9px!important;
}
#order-modal p{
  font-size:14px;
}
#order-modal .image-area{
  height: 150px;
}
#order-modal .image-area .image{
  width: 30%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.tags .badge{
  font-size: 18px;
}
</style>