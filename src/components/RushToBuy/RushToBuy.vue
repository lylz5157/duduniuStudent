<template>
  <div v-wechat-title="$route.meta.title">
    <div class="time">
      距离下次排名更新还有
    </div>
    <div class="RushToBuy">
      <el-row v-for="(v,k) in RushToBuy" :key="k">
        <router-link :to="{name:'CommodityDatails',query:{id:v.goodsID}}">
        <el-col :span="8"><img :src="v.pic" alt=""></el-col>
          <el-col :span="16">
            <h4 class="title">{{v.d_title}}</h4>
            <p class="d_title">{{v.introduce}}</p>
            <p class="org_Price">天猫价 ￥ {{v.org_Price}}</p>
            <span class="Postage">包邮</span>
            <div class="price"><small>￥</small>{{v.price}} <el-button>立抢</el-button></div>
          </el-col>
        </router-link>
      </el-row>
    </div>
    <ReturnHome></ReturnHome>
  </div>
</template>

<script>
  import ReturnHome from '../../views/ReturnHome'
  export default {
    name: "RushToBuy",
    data() {
      return {
        RushToBuy:[]
      }
    },
    mounted() {
      this.$axios.get('/top100/page?pageSize=8&pageNo=1')
        .then(res => {
          this.RushToBuy = res.data.data
          console.log(this.RushToBuy)
        });
    },
    components:{
      ReturnHome
    }
  }
</script>

<style scoped lang="less">
  .time {
    text-align: center;
    line-height: 40px;
    background: #f4f4f4;
  }
  .RushToBuy {
    .el-row{
      margin-bottom: 2%;
    }
    padding: 12px;
      .el-col-8{
        img {
          width: 100%;
        }
    }
    .el-col-16{
      padding: 0 5px;
      .Postage {
        color: #fd7d11;
        padding: 2px 5px;
        border-radius: 3px;
        border: 1px solid #fd7d11;
        font-size: 12px;
        margin-top: 3%;
        display: inline-block;
      }
      .title{
          overflow-y: hidden; /* 超出内容不可见 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis;
          font-weight: 300;
          color: #333333;
          vertical-align:middle;
      }
      .d_title {
        color: #999999;
        line-height: 200%;
        overflow-y: hidden; /* 超出内容不可见 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis;
      }
      .price {
        margin-top: 5%;
        color: #FF0000;
        font-size: 16px;

      }
      .org_Price {
        color: #999999;
        font-size: 12px;
      }
      img {
        width: 10%;
        margin-top: 4%;
      }
      button {
        background: #FE4520;
        color: #ffffff;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 15px;
        padding: 5px 10px;
        font-size: 13px;
        float: right;
      }
    }
  }
</style>
