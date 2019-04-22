<template>
  <div>
      <el-row>
        <el-col :span="24"><img :src="snackstitle.ico" alt="" class="ico">{{snackstitle.title}} <router-link :to="{name:'More',query:{id:snackstitle.cid}}">查看更多 <img src="https://img.51dodoniu.com/ico_01.png" alt=""></router-link></el-col>
      </el-row>
  </div>
</template>

<script>
  export default {
    name: "Title",
    data() {
      return {}
    },
    props: {
      snackstitle:{
        type: [Array, Object],
      }
    },
  }
</script>

<style scoped lang="less">
    .el-row {
      padding: 0 12px;
      line-height: 40px;
      .el-col-24 {
        font-size: 15px;
        color: #333333;
        font-weight: 400;
        vertical-align: middle;
        a {
          font-size: 12px;
          float: right;
          font-weight: 100;
          color: #CCCCCC;
          text-align: right;
          img {
            width: 10%;
          }

        }
        .ico {
          width: 6%;
          margin-right: 10px;
          vertical-align:middle
        }
      }
    }
</style>
