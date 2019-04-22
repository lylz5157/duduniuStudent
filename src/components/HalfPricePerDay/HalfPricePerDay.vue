<template>
  <div v-wechat-title="$route.meta.title">
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
                <h4 class="title">{{v.d_title}}</h4>
                <p class="d_title">{{v.introduce}}</p>
                <div class="isTmall">
                  <span v-if="v.isTmall">天猫</span>
                  <span v-if="!v.isTmall" class="isTb">淘宝</span>
                </div>
                <div class="price">
                  <small>￥</small>
                  {{v.price}}
                </div>
                <div class="sales_num">
                  <span class="Postage">包邮</span>
                  <span class="quan_price"><span>劵</span> <span>优惠{{v.quan_price}}</span></span>
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
    name: "HalfPricePerDay",
    data() {
      return {
        HalfPricePerDay: [],
        //可以进行上拉
        allLoaded: false,
        //是否自动触发上拉函数
        isAutoFill: false,
        wrapperHeight: 0,
        courrentPage: 1,
      }
    },
    created() {
      this.loadFrist();
    },
    mounted() {
      // 父控件要加上高度，否则会出现上拉不动的情况
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
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
      // 下来刷新加载
      loadFrist() {
        this.$axios
          .get("/operate/halfDiscount?pageSize=10&pageNo=" + this.courrentPage)
          .then(res => {
            console.log(res.data.data.datalist)
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
        this.$axios.get("/operate/halfDiscount?pageSize=10&pageNo=" + this.courrentPage)
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
      }
    },
    components:{
      ReturnHome
    }
  }
</script>

<style scoped lang="less">
  .main-body {
    /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
    overflow: scroll;
  }

  .mint-loadmore-text {
    text-align: center;
    display: block;
    line-height: 40px;
  }

  .HalfPricePerDay {
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

        span {
          color: #999999;
          font-size: 12px;
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
</style>
