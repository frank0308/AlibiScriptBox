<template>
    <div class="d-flex mt-3">
        <div class="col-2">
            <Sidebar />
        </div>
        <div class="col-10">
            <ScriptList />
        </div>
    </div>
</template>

<script>

import Sidebar from "../components/ScriptPage/Sidebar.vue";
import ScriptList from "../components/ScriptPage/ScriptList.vue";

export default {
    components:{
        Sidebar,
        ScriptList
    }
}
</script>

<style>

</style>