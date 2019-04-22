<template>

    <div class="root">
      <!--      搜索-->
      <div class="search">
        <input type="search" placeholder="10W+一元起包邮商品任你选" @click="checkSearch">
        <i><img src="https://img.51dodoniu.com/ico_06.png" alt=""></i>
        <span>如何购买</span>
      </div>
      <!--      导航-->
      <div class="NavList">
        <el-row>
          <el-col :span="21">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide
                v-for="(v,k) in nav" :key="k" :did="v.did">
                <!--            <router-link :to="{name:'Index',query:{id:v.goodsID}}">-->
                <span
                  @click="swiperTo(v,k)"
                  :class="{isActive:v.did==status}"
                  :id="v.did"
                >{{v.item_name}}</span>
                <!--            </router-link>-->
              </swiper-slide>
            </swiper>
          </el-col>
<!--          <el-col :span="3">-->
<!--            <img src="https://img.51dodoniu.com/ico_08.png" alt="" @click="Popup" v-show="!IsActive">-->
<!--            <img src="https://img.51dodoniu.com/ico_21.png" alt="" @click="Popup" v-show="IsActive">-->
<!--          </el-col>-->
        </el-row>
      </div>
      <el-row class="PopupCont" v-show="IsActive">
        <el-col :span="6" v-for="(v,k) in nav" :key="k" :did="v.did" >
          <img :src="v.item_img" alt=""  @click="swiperTo(v,k)">
          <span  @click="swiperTo(v,k)">{{v.item_name}}</span>
        </el-col>
      </el-row>
      <!--列表-->
      <div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
        <mt-loadmore :top-method="loadTop"
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded" ref="loadmore"
                     :autoFill="isAutoFill"
        >
          <div class="HalfPricePerDay">

            <el-row v-for="(v,k) in HalfPricePerDay" :key="k">

              <router-link :to="{name:'CommodityDatails',query:{id:v.goodsID}}">
                <el-col :span="8"><img :src="v.pic" alt=""></el-col>
                <el-col :span="16">
                  <h4 class="title isTmall">
                      <span v-if="v.isTmall">天猫</span>
                      <span v-if="!v.isTmall" class="isTb">淘宝</span>
                    {{v.d_title}}</h4>
                  <p class="d_title">{{v.introduce}}</p>

                  <div class="price">
                    <small>￥</small>
                    {{v.price}}
                    <del><small>￥ </small>{{v.org_Price}}</del>
                  </div>
                  <div class="sales_num">
                    <span class="Postage">包邮</span>

                    <span>月销{{v.sales_num}}万</span>
                  </div>
                </el-col>
              </router-link>
            </el-row>
          </div>
        </mt-loadmore>
      </div>

      <ReturnHome></ReturnHome>
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
        status: '',
        HalfPricePerDay: [],
        //可以进行上拉
        allLoaded: false,
        //是否自动触发上拉函数
        isAutoFill: false,
        wrapperHeight: 0,
        courrentPage: 1,
        IsActive:false,
      }
    },
    created() {
      this.loadFrist();
    },
    methods: {
      //   下拉刷新
      loadTop() {
        this.loadFrist();
        this.closeTouch()
      },
      // 上拉加载
      loadBottom() {
        this.loadMore();
        this.closeTouch()
      },
      checkSearch() {
        this.$router.push({path: 'Search'})
      },
      // 下来刷新加载
      loadFrist() {
        this.$axios.get('/operate/page?pageNo='+this.courrentPage+'&pageSize=10&item_id=' + this.status+'' )
          .then(res => {
            this.courrentPage == 1;
            this.allLoaded = false; // 可以进行上拉
            this.HalfPricePerDay = res.data.data.datalist;
            this.openTouch()
            this.$refs.loadmore.onTopLoaded();
            console.log(this.HalfPricePerDay)
          })
          .catch(error => {
            console.log(error);
            alert("网络错误，不能访问");
          });
      },
      // 加载更多
      loadMore() {
        this.courrentPage++;
        this.$axios.get('/operate/page?pageNo='+this.courrentPage+'&pageSize=10&item_id=' + this.status+'' )
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
      /*解决iphone页面层级相互影响滑动的问题*/
      closeTouch: function () {
        document.getElementsByTagName("body")[0].addEventListener('touchmove',
          this.handler, {passive: false});//阻止默认事件
      },
      openTouch: function () {
        document.getElementsByTagName("body")[0].removeEventListener('touchmove',
          this.handler, {passive: false});//打开默认事件
      },
      swiperTo(v, k) {
        this.status = v.did
        console.log(v.did)
        this.$axios.get('/operate/page?pageNo=1&pageSize=10&item_id=' + v.did)
          .then(res => {
            console.log(res)
            this.loadMore()
            this.loadFrist()
          })
      },
      Popup(){
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
    components:{
      ReturnHome
    }
  }
</script>

<style scoped lang="less">

  .root {
    background-image: url("https://img.51dodoniu.com/pic_14.png");
    background-size: 100%;
    background-repeat: no-repeat;

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
    margin-top: 3%;
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
      }
    }

    .el-col-16 {
      padding: 0 5px;

      .title {
        overflow-y: hidden; /* 超出内容不可见 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis;
        font-weight: 300;
        color: #333333;
        vertical-align: middle;
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
        margin-bottom: 5%;
        del {
          font-size: 12px;
          color: #999999;
        }

      }

      .isTmall {
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

      .sales_num {
        .Postage {
          color: #fd7d11;
          padding: 2px 5px;
          border-radius: 3px;
          border: 1px solid #fd7d11;
          font-size: 12px;
        }

        span:last-child {
          color: #999999;
          font-size: 12px;
          float: right;
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
    box-shadow: 0px 7px 10px #e4e4e4 ;
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
</style>
