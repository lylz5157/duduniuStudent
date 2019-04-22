<template>
    <div class="root">
      <!--      搜索-->
      <div class="search">
        <input type="search" placeholder="10W+一元起包邮商品任你选" @click="checkSearch">
        <i><img src="https://img.51dodoniu.com/ico_06.png" alt=""></i>
        <span>如何购买</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "MainSearch",
      data(){
          return{

          }
      },
      methods:{
        checkSearch() {
          this.$router.push({path: 'Search'})
        },
      }
    }
</script>

<style scoped lang="less">
  .root{
    background: url("https://img.51dodoniu.com/pic_16.png") no-repeat center;
    background-size: 100% 100%;
    .search {
      padding: 5px 0;
      width: 100%;

      input {
        width: 75%;
        border: none;
        background: #ffffff;
        padding: 7px 15px;
        text-indent: 2.5em;
        border-radius: 20px;
        margin-left: 2%;
        margin-right: 2%;
      }

      i {
        img {
          position: absolute;
          width: 8%;
          left: 5%;
          top: 1%;
        }
      }

      span {
        color: #ffffff;
        font-size: 15px;
      }
    }
  }

</style>
