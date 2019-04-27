<template>
  <div>
    <el-row class="Search">
      <el-col :span="2"><img src="https://img.51dodoniu.com/ico_07.png" alt="" class="Return" @click="Return"></el-col>
      <el-col :span="17">
        <input type="search" @focus="checkSearch" v-model="placeholder" placeholder="10W+一元起包邮商品任你选">
        <i v-if="IsSearch"><img src="https://img.51dodoniu.com/ico_06.png" alt=""></i>
      </el-col>
      <el-col :span="5"><span @click="Search">搜索</span></el-col>
    </el-row>
    <el-row class="list">
      <el-col :span="12" v-for="(v,k) in list" :key="k" :class="activeClass ==k?'active':''"><span @click="IsActive(k)">{{v.title}}</span>
      </el-col>
    </el-row>
    <div class="root">
    <div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
      <mt-loadmore :top-method="loadTop"
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded" ref="loadmore"
                   :autoFill="isAutoFill"
      >
        <div class="SearchList">
          <el-row v-for="(v,k) in HalfPricePerDay" :key="k">
            <router-link :to="{name:'SearchCommodityDatails',query:{id:v.goodsID}}">
           
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
    </div>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        IsSearch: true,
        placeholder: '',
        list: [
          {title: '天猫搜索(100w+)',ico:''},
          {title: '优惠推荐(包邮10w+)'},
        ],
        activeClass: 0,
        HalfPricePerDay: [],
        //可以进行上拉
        allLoaded: false,
        //是否自动触发上拉函数
        isAutoFill: false,
        wrapperHeight: 0,
        courrentPage: 1,
        SearchRecommend:[
          {item:'男鞋'},
          {item:'女鞋'},
          {item:'男装'},
          {item:'女装'},
          {item:'零食'},
        ]
      }
    },
    created() {
      // this.loadFrist0();

    },
    mounted() {
      // 父控件要加上高度，否则会出现上拉不动的情况
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;

    },

    methods: {
      checkSearch() {
        this.IsSearch  =''
        this.IsSearch = !this.IsSearch
      },
      Return() {
        this.$router.go(-1)
      },
      IsActive(k) {
        this.activeClass = k;
        if(k==1){
          this.loadFrist1();
        }else {
          this.loadFrist0();
        }
      },
      //   下拉刷新
      loadTop() {
        if (this.activeClass == 1) {
          this.loadFrist1();
        }else {
          this.loadFrist0();
        }

      },
      // 上拉加载
      loadBottom() {
        if (this.activeClass == 1) {
          this.loadFrist1();
        }else {
          this.loadMore0();
        }
      },
      // 下来刷新加载
      Search() {
        if (this.activeClass == 1) {
          this.HalfPricePerDay = []
          this.loadMore1();
        }else {
          this.HalfPricePerDay = []
          this.loadMore0();
        }
      },
//this.activeClass==1 为优惠搜
//this.activeClass==0 为全网搜
      loadFrist1() {
          const Qs = require('qs');
          this.$axios
          this.$axios.post('/goods/page', JSON.stringify(
            {"title": this.placeholder, "orderBycul": 0, 'pageNo': this.courrentPage, pageSize: 10},
          ))
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
      loadMore1() {
          this.courrentPage++;
          this.$axios
          this.$axios.post('/goods/page', JSON.stringify(
            {"title": this.placeholder, "orderBycul": 0, 'pageNo': this.courrentPage, pageSize: 10},
          ))
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
      loadFrist0() {
          const Qs = require('qs');
          this.$axios
          this.$axios.post('/serach/superSer/', JSON.stringify(
            {"keywords": this.placeholder, "orderBycul": 0, 'pageNo': this.courrentPage, pageSize: 10},
          ))
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
      loadMore0() {

          this.courrentPage++;
          this.$axios
          this.$axios.post('serach/superSer/', JSON.stringify(
            {"keywords": this.placeholder, "orderBycul": 0, 'pageNo': this.courrentPage, pageSize: 10},
          ))
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

    }
  }
</script>

<style scoped lang="less">
  .root{
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .main-body {
    /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
    overflow: scroll;
  }
  .mint-loadmore {
    /*margin-top: 15%;*/
  }
  .focus {
    text-indent: 1em;
  }

  .Search {
    padding: 12px;
    background: #f4f4f4;

    .Return {
      width: 70%;
      margin-top: 10%;
    }

    input {
      background: #ffffff;
      border: none;
      width: 100%;
      padding: 5px;
      border-radius: 20px;
      text-indent: 2.5em;
    }

    i {
      img {
        position: absolute;
        left: 12%;
        top: 20%;
        width: 8%;
      }
    }

    span {
      background: url("https://img.51dodoniu.com/pic_07.png") no-repeat center;
      background-size: 100% 100%;
      color: #ffffff;
      padding: 5px 10px;
      float: right;
    }
  }

  .list {
    background: #f4f4f4;
    line-height: 40px;
    text-align: center;

    .el-col-12:last-child {
      color: #333333;

    }
  }

  .active {
    border-bottom: 1px solid #FE4520;
    color: #FE4520;
  }

  .SearchList {
    img {
      width: 100%;
    }
  }

  .SearchList {
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
  .SearchRecommend {
    h4 {
      font-size: 14px;
      font-weight: 400;
      line-height: 40px;
      padding: 0 12px;
    }
     span {
      padding: 0.05rem 0.3rem;
      background: #f4f4f4;
      border-radius: 0.3rem;
      margin: 5px;
      color: #777;
       word-break: normal;
     }
  }
</style>
