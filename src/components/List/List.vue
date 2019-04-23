<template>
  <div class="root">
    <div class="top">
      <!--      搜索-->
      <div class="search">
        <input type="search" placeholder="10W+一元起包邮商品任你选" @click="checkSearch">
        <i><img src="https://img.51dodoniu.com/ico_06.png" alt=""></i>
        <span>如何购买</span>
      </div>
      <div class="code">
        <el-row>
          <el-col :span="18">
            每天为您精选淘宝天猫内部优惠券的包邮超值折扣商品，购物先领大额内部优惠券，省钱买好货，轻松打造品质生活！
          </el-col>
          <el-col :span="6"><img src="https://img.51dodoniu.com/code.png" alt=""></el-col>
        </el-row>
      </div>
      <!--      导航-->
      <div class="NavList">
        <el-row>
          <el-col :span="24">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide
                v-for="(v,k) in nav" :key="k" :did="v.did">
                <span
                  @click="swiperTo(v,k)"
                  :class="{isActive:v.did==status}"
                  :id="v.did"
                >{{v.item_name}}</span>
              </swiper-slide>
            </swiper>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-row class="PopupCont" v-show="IsActive">
      <el-col :span="6" v-for="(v,k) in nav" :key="k" :did="v.did">
        <img v-lazy="v.item_img" alt="" @click="swiperTo(v,k)">
        <span @click="swiperTo(v,k)">{{v.item_name}}</span>
      </el-col>
    </el-row>
    <!--列表-->
    <div class="roots">
      <div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
        <mt-loadmore :top-method="loadTop"
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded" ref="loadmore"
                     :autoFill="isAutoFill"
        >
          <div class="HalfPricePerDay">

            <el-row v-for="(v,k) in HalfPricePerDay" :key="k">

              <router-link :to="{name:'CommodityDatails',query:{id:v.goodsID}}">
                <el-col :span="8"><img v-lazy="v.pic" alt=""></el-col>
                <el-col :span="16">
                  <h4 class="title isTmall">
<!--                    <span v-if="v.isTmall">天猫</span>-->
                    <img v-if="v.isTmall" src="https://img.51dodoniu.com/ico_40.png">
                    <img v-if="!v.isTmall" src="https://img.51dodoniu.com/ico_41.png">
<!--                    <span v-if="!v.isTmall" class="isTb">淘宝</span>-->
                    {{v.d_title}}</h4>
                  <p class="d_title">{{v.introduce}}</p>

                  <div class="price">
                    <small>￥</small>
                    {{v.price}}
                    <del>
                      <small>￥</small>
                      {{v.org_Price}}
                    </del>
                    <span class="Postage">包邮</span>
                  </div>
                  <div class="sales_num">
                    <span>月销{{v.sales_num}}万</span>
                  </div>
                </el-col>
              </router-link>
            </el-row>
          </div>
        </mt-loadmore>
      </div>
    </div>
<!--    <ReturnHome></ReturnHome>-->
  </div>

</template>

<script>
  import ReturnHome from '../../views/ReturnHome'

  export default {
    name: "List",
    data() {
      return {
        nav: [],
        swiperOption: {

          pagination: {
            el: '.swiper-pagination',
          },
          slidesPerView: 6,
        },
        active: false,
        status: 6,
        HalfPricePerDay: [],
        //可以进行上拉
        allLoaded: false,
        //是否自动触发上拉函数
        isAutoFill: false,
        wrapperHeight: 0,
        courrentPage: 1,
        IsActive: false,
      }
    },
    created() {
      this.loadFrist();
      console.log(this.wrapperHeight)
    },
    methods: {
      //   下拉刷新
      loadTop() {
        this.loadFrist();
      },
      // 上拉加载
      loadBottom() {
        this.loadMore();
      },
      checkSearch() {
        this.$router.push({path: 'Search'})
      },
      // 下来刷新加载
      loadFrist() {
        this.courrentPage = 1
        this.$axios.get('/operate/page?pageNo=' + this.courrentPage + '&pageSize=10&item_id=' + this.status)
          .then(res => {
            this.courrentPage == 1;
            this.allLoaded = false; // 可以进行上拉
            this.HalfPricePerDay = res.data.data.datalist;
            this.$refs.loadmore.onTopLoaded();
          })
          .catch(error => {
            console.log(error);
            alert("网络错误，不能访问");
          });
      },
      // 加载更多
      loadMore() {
        this.courrentPage++;
        this.$axios.get('/operate/page?pageNo=' + this.courrentPage + '&pageSize=10&item_id=' + this.status)
          .then(res => {
            // concat数组的追加
            this.HalfPricePerDay = this.HalfPricePerDay.concat(res.data.data.datalist);
            if (this.courrentPage >= res.data.data.total / res.data.data.pageSize) {
              this.allLoaded = true; // 若数据已全部获取完毕
            }
            this.$refs.loadmore.onBottomLoaded();
          })
          .catch(error => {
            console.log(error);
            alert("网络错误，不能访问");
          });
      },
      swiperTo(v, k) {
        this.status = v.did
        console.log(v.did)
        this.$axios.get('/operate/page?pageNo=1&pageSize=10&item_id=' + v.did)
          .then(res => {
            this.HalfPricePerDay = []
            this.loadMore()
            this.loadFrist()
          })
      },
      Popup() {
        this.IsActive = !this.IsActive
      }
    },
    mounted() {
      //分类
      this.$axios.get('/menuItem/list/1')
        .then(res => {
          this.nav = res.data.data
          // console.log(this.nav)
        })
// 父控件要加上高度，否则会出现上拉不动的情况
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
    },
    components: {
      ReturnHome
    }
  }
</script>

<style scoped lang="less">
  .roots {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .root {
    .top {
      background-image: url("https://img.51dodoniu.com/pic_14.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding-bottom: 5px;
    }


    .banner {
      overflow: hidden;
      padding: 15px;

      img {
      }
    }

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

  .isActive {
    border-bottom: 2px solid #ffffff;
    font-size: 16px;
  }

  .NavList {
    line-height: 40px;

    .swiper-slide {
      text-align: center;
      color: #ffffff;
      font-size: 16px;
      width: 16.66%;
      span {
        padding-bottom: 5px;
      }

      a {
        text-align: center;
        color: #ffffff;
      }
    }

    .el-row {
      vertical-align: middle;

      .el-col-3 {
        padding-right: 12px;

        img {
          width: 44%;
          text-align: center;
          line-height: 40px;
          float: right;
          margin-top: 34%;
        }
      }
    }
  }

  .main-body {
    /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
    overflow: scroll;
    margin-top: 4%;
  }

  .mint-loadmore-text {
    text-align: center;
    display: block;
    line-height: 40px;
  }

  .HalfPricePerDay {
    /*margin-top: 20%;*/

    .el-row {
      padding: 12px;
    }

    .el-col-8 {
      img {
        width: 100%;
        border-radius: 5px;
      }
    }

    .el-col-16 {
      padding: 0 5px;
      padding-left: 12px;
      .title {
        font-weight: 300;
        color: #333333;
        vertical-align: middle;
        font-size: 15px;
      }

      .d_title {
        color: #999999;
        line-height: 180%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /*display: -webkit-box;*/
        /*-webkit-box-orient: vertical;*/
        /*-webkit-line-clamp: 2;*/
        /*overflow: hidden;*/
        font-size: 12px;
      }

      .price {
        margin-top: 3%;
        color: #FF0000;
        font-size: 16px;
        margin-bottom: 3%;

        del {
          font-size: 12px;
          color: #999999;
        }

      }

      .isTmall {
        img {
          width: 5%;
        }
        span {
          background: #FF0000;
          color: #ffffff;
          padding: 2px 5px;
          border-radius: 3px;
          font-size: 12px;
        }

        .isTb {
          background: #fb4c2b;
        }
      }
      .Postage {
        color: #ffffff;
        padding: 1px 2px;
        border-radius: 3px;
        font-size: 10px;
        margin-left: 2%;
        background: #FF0000;
      }
      .sales_num {


        span:last-child {
          color: #999999;
          font-size: 12px;
          /*float: right;*/
        }
      }

      .quan_price {
        padding: 2px 5px;
        color: #ff6345 !important;
        border: 1px solid #fd7d11;

        span {
          color: #ff6345 !important;
        }

        span:first-child {
          color: #ff6345 !important;
          padding-right: 5px;
          border-right: 1px dashed #fd7d11;
        }
      }
    }
  }

  .PopupCont {
    position: absolute;
    top: 80px;
    z-index: 2;
    background: #ffffff;
    padding-top: 4%;
    padding-bottom: 4%;
    box-shadow: 0px 7px 10px #e4e4e4;
    /*display: none;*/

    .el-col-6 {
      padding: 2.5% 5%;
      vertical-align: middle;
      text-align: center;
      line-height: 20px;

      img {
        width: 100%;
      }
    }
  }

  .code {
    .el-col-18 {
      text-align: center;

      font-size: 12px;
      color: #fff;
      z-index: 99;
      line-height: 150%;
      padding: 0 12px;
      margin-top: 3%;

    }
    .el-col-6 {
      img {
        margin-left: 15%;
        width: 60%;
        margin-top: 10%;
      }
    }
  }

</style>
