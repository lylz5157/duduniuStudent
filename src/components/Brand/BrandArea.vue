<template>
  <div v-wechat-title="$route.meta.title" class="root">
        <el-row class="BrandArea">
          <el-col :span="6">
            <img :src="BrandArea.brand_img" alt="">
          </el-col>
          <el-col :span="18">
            <h4 class="brand_name">{{BrandArea.brand_name}}</h4>
            <p class="remark">{{BrandArea.remark}}</p>
          </el-col>
        </el-row>
    <div class="BrandAreaList">
      <div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
        <mt-loadmore :top-method="loadTop"
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded" ref="loadmore"
                     :autoFill="isAutoFill"
        >
        <el-row v-for="(v,k) in HalfPricePerDay" :key="k" class="HalfPricePerDay">
          <router-link :to="{name:'CommodityDatails',query:{id:v.goodsID}}">
          <el-col :span="8">
            <img :src="v.pic" alt="">
          </el-col>
          <el-col :span="16">
            <h4 class="d_title">{{v.d_title}}</h4>
            <p class="introduce">{{v.introduce}}</p>
            <p class="price"><small>￥</small>{{v.price}} <del>￥{{v.org_Price}}</del></p>
            <p class="sales_num"><span>包邮</span>月销{{v.sales_num}}万</p>
          </el-col>
          </router-link>
        </el-row>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BrandArea",
    data() {
      return {
        BrandArea: [],
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
        this.courrentPage++;
        this.$axios.get('/brand/page?pageSize=1&pageNo=1' + '&brand_type=2&did=' + this.$route.query.id)
          .then(res => {
            this.BrandArea = res.data.data.datalist[0]
            const Qs = require('qs');
            this.$axios.post('/goods/page', JSON.stringify({
              "pageSize": 20,
              "pageNo": +this.courrentPage,
              "cid": res.data.data.datalist[0].cid,
              "title": res.data.data.datalist[0].brand_name
            }))
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
          });
      },
      // 加载更多
      loadMore() {
        this.courrentPage++;
        this.$axios.get('/brand/page?pageSize=1&pageNo=1' + '&brand_type=2&did=' + this.$route.query.id)
          .then(res => {
            this.BrandArea = res.data.data.datalist[0]
            const Qs = require('qs');
            this.$axios.post('/goods/page', JSON.stringify({
              "pageSize": 20,
              "pageNo": +this.courrentPage,
              "cid": res.data.data.datalist[0].cid,
              "title": res.data.data.datalist[0].brand_name
            }))
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
          });
      }
    }
  }
</script>

<style scoped lang="less">
  .main-body {
    /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
    overflow: scroll;
  }
  .BrandArea {
    background: url("https://img.51dodoniu.com/pic_16.png") no-repeat center;
    background-size: 100% 100%;
    color: #ffffff;
    padding-bottom: 20%;


      .el-col-6,.el-col-18{
        padding: 12px;
        img {

        }
      }


    .brand_name {
      font-size: 18px;
      font-weight: 400;
    }

    .remark {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  .BrandAreaList {
    margin-top: -20%;
    z-index: 2;
  }
  .HalfPricePerDay {
    border: 2px solid #f2f2f2;
    padding: 12px;
    margin: 12px;
    border-radius: 10px;
    box-shadow: 0px 7px 10px #e4e4e4;
    margin-bottom: 20px;
    background: #ffffff;
    img {
      width: 100%;
    }
    .el-col-16 {
      padding-left: 5px;
      .d_title {
        font-size: 14px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        color: #333333;
      }
      .introduce {
        font-size: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 20px;
        color: #CCCCCC;
      }
      .price {
        color: #FF0000;
        font-size: 16px;
        margin: 3px 0;
        small {
          font-size: 12px;
        }
        del{
          font-size: 12px;
          color: #999999;
          margin-left: 10px;
        }
      }
      .sales_num {
        font-size: 12px;
        color: #999999;
        margin-top: 10px;
        span {
          color: #fd7d11;
          padding: 2px 5px;
          border-radius: 3px;
          border: 1px solid #fd7d11;
          font-size: 12px;
          margin-right: 10px;
        }
      }
    }

  }

</style>
