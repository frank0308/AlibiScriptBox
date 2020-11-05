<template>
  <div class="sidebar accordion py-3 bg-dark text-white rounded" role="tablist">
    <b-card no-body v-for="(cate, index) in category" :key="index" class="card bg-dark border-0">
      <b-card-header header-tag="header" role="tab" class="py-2">
        <b-button squared block v-b-toggle="'accordion' + index" variant="dark">{{cate}}</b-button>
      </b-card-header>
      <b-collapse v-bind:id="'accordion'+index" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-list-group v-for="(person, index) in personNumber" :key="index" class="text-left">
            <b-list-group-item button class="bg-dark text-white border-0">{{person}}</b-list-group-item>
        </b-list-group>
        </b-card-body>
      </b-collapse>
    </b-card>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        category:["總覽", "推理本", "硬核本", "新手本", "情感本", "機制本", "歡樂本"],
        personNumber:["五人","六人","七人","八人","其他"]
      }
    }
  }
</script>

<style scope>
.card-header{
  padding: 0 20px;
}
.card-header button{
  font-size: 20px;
  margin: auto;
}
.card-header button:focus{
  box-shadow: none;
}
.card-header button:hover{
  border-bottom: 1px solid white;
}
.card-body{
  padding: 0 20px;
}
.list-group button{
  outline: none;
}
</style>