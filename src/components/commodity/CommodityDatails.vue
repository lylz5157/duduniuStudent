<template>
  <div v-wechat-title="$route.meta.title">
    <!--    <img src="https://img.51dodoniu.com/pic_17.png" alt="" width="100%" v-if="CommodityDatails !=[]">-->
    <div>
      <swiper :options="swiperOption" class="banner">
        <swiper-slide v-for="(v,k) in CommodityDatails.images" :key="k">
          <img :src="v"/>
        </swiper-slide>
      </swiper>
      <div class="CommodityDatails">
        <h4 class="price">
          <small>￥</small>
          {{CommodityDatails.price}} <span>包邮</span></h4>
        <el-row class="title">
          <el-col :span="3">
            <span v-if="CommodityDatails.isTmall ==1" class="isTmall">天猫</span>
            <span v-if="CommodityDatails.isTmall !=1" class="isTB">淘宝</span>
          </el-col>
          <el-col :span="21"> {{CommodityDatails.title}}</el-col>
        </el-row>
        <el-row class="express">
          <el-col :span="8">快递：0.00</el-col>
          <el-col :span="8" class="volume">月销：{{CommodityDatails.volume}}</el-col>
          <el-col :span="8" class="provcity">产地：{{CommodityDatails.provcity}}</el-col>
        </el-row>
        <el-row class="Coupon">
          <el-col :span="16">
            <el-row>
              <el-col :span="24" class="quan_price">
                {{CommodityDatails.quan_price}}优惠券
                <span class="quan_time">有效期{{CommodityDatails.quan_time}}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8" v-show="isCopy">
          <span class="Receive"
                v-clipboard:copy="CommodityDatails.tb_token"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
          >立即领取</span>
          </el-col>
          <el-col :span="8" v-show="isCopy==false">
          <span class="Receive"
                v-clipboard:copy="CommodityDatails.tb_token"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
          >已领取</span>
          </el-col>
        </el-row>
        <el-row class="shop">
          <el-col :span="6">
            <img src="https://img.51dodoniu.com/pic_11.png" alt="" v-if="CommodityDatails.isTmall ==1">
            <img src="https://img.51dodoniu.com/pic_10.png" alt="" v-if="CommodityDatails.isTmall !=1">
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="24" class="nick">{{CommodityDatails.nick}}</el-col>
              <el-col :span="8">商品描述 {{CommodityDatails.dsr}}</el-col>
              <el-col :span="8">店铺评分 {{CommodityDatails.shop_dsr}}</el-col>
              <el-col :span="8">卖家等级 {{CommodityDatails.ratesum}}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <img src="https://img.51dodoniu.com/pic_13.png" alt="" width="100%">
      <img src="https://img.51dodoniu.com/pic_12.png" alt="" width="100%">
      <div v-for="(v,k) in DetailMap" :key="k" class="DetailMap">
        <img :src="v" alt="">
      </div>
      <el-row class="Fotter">
        <el-col :span="7">
          <span @click="ToIndex">返回</span>
        </el-col>
        <el-col :span="17" v-show="isCopy">
        <span
          v-clipboard:copy="CommodityDatails.tb_token"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >领劵购买</span>
        </el-col>
        <el-col :span="17" v-show="isCopy ==false">
        <span
          v-clipboard:copy="CommodityDatails.quan_link"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >已领取</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  inject:['reload']
  import wx from 'weixin-js-sdk'

  export default {
    name: "CommodityDatails",
    data() {
      return {
        CommodityDatails: [],
        DetailMap: '',
        isCopy: true,
        swiperOption: {
          loop: true,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
          },

        },
      }
    },
    watch:{
      '$route'(to, from) {
        if(to.name === 'CommodityDatails'){
          this.$axios.get('/operate/goodsdetail/' + this.$route.query.id)
            .then(res => {
              this.CommodityDatails = res.data.data
              console.log(this.CommodityDatails)
            })
          this.$axios.get('/goods/findGoodsDetailUrl/' + this.$route.query.id)
            .then(res => {
              this.DetailMap = res.data.data
              console.log(res)
            })
        }
      }

    },
    mounted() {
      this.$axios.get('/operate/goodsdetail/' + this.$route.query.id)
        .then(res => {
          this.CommodityDatails = res.data.data
          console.log(this.CommodityDatails)
        })
      this.$axios.get('/goods/findGoodsDetailUrl/' + this.$route.query.id)
        .then(res => {
          this.DetailMap = res.data.data
          console.log(res)
        })
      //微信分享
      // this.$axios.get('/api/remote/getWxShareParam?targetUrl=' + 'https:buy.51duduniu.com')
      const Qs = require('qs');
      this.$axios.post('/remote/getWxShareParam',JSON.stringify({
        targetUrl:window.location.href
      }))
      // this.$axios.get('/remote/getWxShareParam?targetUrl=' + )
        .then(res => {
          this.wxlink = window.location.href
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature,// 必填，签名，见附录1
            jsApiList: [
              'onMenuShareAppMessage',
              'onMenuShareTimeline',
              'onMenuShareQQ', 'onMenuShareQZone','translateVoice'
            ],
          });
          wx.ready(() => {
            wx.onMenuShareTimeline({
              title: this.CommodityDatails.title,
              link: this.wxlink,
              desc: this.CommodityDatails.introduce,
              imgUrl: this.CommodityDatails.pic,
              success: function () {
                alert("分享成功");
              },
              cancel: function () {
                alert('你没有分享到朋友圈');
              }
            });
            wx.onMenuShareAppMessage({
              title: this.CommodityDatails.title,
              link: this.wxlink,
              desc: this.CommodityDatails.introduce,
              imgUrl: this.CommodityDatails.pic,
              success: function () {
                alert("分享成功");
              },
              cancel: function () {
                alert('你没有分享给朋友');
                // 用户取消分享后执行的回调函数
              }
            });
            wx.onMenuShareQQ({
              title: this.CommodityDatails.title,
              link: this.wxlink,
              desc: this.CommodityDatails.introduce,
              imgUrl: this.CommodityDatails.pic,
              success: function () {
                alert("分享成功");
              },
              cancel: function () {
                alert('你没有分享给朋友');
                // 用户取消分享后执行的回调函数
              }
            });
            wx.onMenuShareQZone({
              title: this.CommodityDatails.title,
              link: this.wxlink,
              desc: this.CommodityDatails.introduce,
              imgUrl: this.CommodityDatails.pic,
              success: function () {
                alert("分享成功");
              },
              cancel: function () {
                alert('你没有分享到朋友圈');
                // 用户取消分享后执行的回调函数
              }
            });
          })
        })
//
    },
    methods: {
      onCopy(e) {
        this.isCopy = false
        alert('已自动复制口令'+this.CommodityDatails.tb_token+'，请打开手机淘宝购买')

      },
      // 复制失败
      onError(e) {
        this.$message.error('复制失败！');
      },
      ToIndex() {
        this.$router.push({path:'/'})
      }
    }
  }
</script>

<style scoped lang="less">
  .banner {
    .swiper-slide {
      img {
        width: 100%;
        font-size: 0;
      }
    }
  }

  .Coupon {
    height: 150px;
    background: url("https://img.51dodoniu.com/pic_09.png") no-repeat center;
    background-size: 100% 100%;
    border-bottom: 10px solid #F4F4F4;

    .quan_price {
      margin-top: 15%;
      text-align: center;
      font-size: 24px;
      color: #ffffff;
    }

    .quan_time {
      background: #ffbe92;
      color: #f77f35;
      top: 1400%;
      text-align: center;
      font-size: 10px;
      display: inline-block;
      padding: 2px 5px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
    }

    .Receive {
      background: #ffbe92;
      color: #f77f35;
      padding: 8px 13px;
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
      position: absolute;
      top: 35%;
      right: 8%;
    }

  }

  .CommodityDatails {
    padding: 0 12px;
  }

  .price {
    color: #FF0000;
    font-size: 20px;
    line-height: 200%;

    span {
      border: 1px solid #FD7D11;
      color: #FD7D11;
      font-weight: 100;
      padding: 2px 5px;
      border-radius: 3px;
      font-size: 10px;
    }
  }

  .title {
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    line-height: 150%;

    .isTmall {
      background: #FF0000;
      color: #ffffff;
      padding: 2px 5px;
      border-radius: 3px;
      font-size: 12px;
    }

    .isTB {
      background: #fb4c2b;
      color: #ffffff;
      padding: 2px 5px;
      border-radius: 3px;
      font-size: 12px;
    }
  }

  .express {
    color: #999999;
    line-height: 150%;
    font-size: 10px;
    margin-top: 2%;

    .volume {
      text-align: center;
    }

    .provcity {
      text-align: right;
    }

  }

  .shop {
    border-bottom: 1px solid #E1E1E1;
    padding: 2% 0;

    .el-col-6:first-child {
      /*text-align: center;*/
      margin-top: 0;

    }

    .nick {
      font-size: 16px;
      line-height: 200%;
    }

    .el-col-8 {
      font-size: 12px;
      margin-top: 5%;
    }

  }

  .Fotter {
    position: fixed;
    left: 0;
    bottom: 0;
    line-height: 50px;
    width: 100%;
    text-align: center;
    color: #ffffff;

    .el-col-7 {
      background: #FD7D11;
    }

    .el-col-17 {
      background: #FE4520;
    }
  }

  .DetailMap {
    img {
      width: 100%;
    }
  }
</style>
