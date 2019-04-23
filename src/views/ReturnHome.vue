<template>
    <div>
      <router-link :to="{name:'List'}" class="ReturnHome">
        <img src="https://img.51dodoniu.com/pic_15.png" alt="" >
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "ReturnHome"
    }
</script>

<style scoped lang="less">
  .ReturnHome {
    position: fixed;
    bottom: 9%;
    right: -3%;
    img {
      width: 60%;
    }
  }
</style>
