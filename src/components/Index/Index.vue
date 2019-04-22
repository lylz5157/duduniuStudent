<template>
  <div v-wechat-title="$route.meta.title">
    <div class="root">
      <!--      搜索-->
      <div class="search">
        <input type="search" placeholder="10W+一元起包邮商品任你选" @click="checkSearch">
        <i><img src="https://img.51dodoniu.com/ico_06.png" alt=""></i>
        <span>如何购买</span>
      </div>

      <NavList :List="nav"></NavList>
      <!--      轮播-->
      <Banner :bannerList="banner"></Banner>
      <!--      九宫格-->
<!--      <el-row class="group">-->
<!--        <router-link :to="{name:'RushToBuy'}">-->
<!--          <el-col :span="6">-->
<!--            <img src="https://img.51dodoniu.com/ico_02.png" alt="">-->
<!--            <span>疯抢排行</span>-->
<!--          </el-col>-->
<!--        </router-link>-->
<!--        <router-link :to="{name:'HalfPricePerDay'}">-->
<!--          <el-col :span="6">-->
<!--            <img src="https://img.51dodoniu.com/ico_03.png" alt="">-->
<!--            <span>每日半价</span>-->
<!--          </el-col>-->
<!--        </router-link>-->
<!--        <router-link :to="{name:'Capping'}">-->
<!--          <el-col :span="6">-->
<!--            <img src="https://img.51dodoniu.com/ico_04.png" alt="">-->
<!--            <span>30元封顶</span>-->
<!--          </el-col>-->
<!--        </router-link>-->
<!--        <router-link :to="{name:'FreeShipping'}">-->
<!--          <el-col :span="6">-->
<!--            <img src="https://img.51dodoniu.com/ico_05.png" alt="">-->
<!--            <span>9.9包邮</span>-->
<!--          </el-col>-->
<!--        </router-link>-->
<!--      </el-row>-->
      <!--      广告位-->
<!--      <el-row>-->
<!--        <el-col :span="24">-->
<!--          <router-link :to="{name:'Brand'}">-->
<!--            <img src="https://img.51dodoniu.com/home_super_brand.png" alt="" width="100%">-->
<!--          </router-link>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <!--      零食标题-->
      <Title :snackstitle="snackstitle"></Title>
      <!--      零食推荐-->
      <SwiperSlide :SwiperList="snacks"></SwiperSlide>
      <!--      美妆标题-->
      <Title :snackstitle="makeuptitle"></Title>
      <!--      美妆推荐-->
      <SwiperSlide :SwiperList="makeup"></SwiperSlide>
      <!--      母婴标题-->
      <Title :snackstitle="MotherAndInfanttitle"></Title>
      <!--      母婴推荐-->
      <SwiperSlide :SwiperList="MotherAndInfant"></SwiperSlide>
      <!--      热门推荐-->
      <img src="https://img.51dodoniu.com/pic_02.png" alt="" width="100%">
      <div class="GoodStuffRecommendation">
        <el-row v-for="(v,k) in GoodStuffRecommendation" :key="k">
          <router-link :to="{name:'CommodityDatails',query:{id:v.goodsID}}">
            <el-col :span="8"><img :src="v.pic" alt=""></el-col>
            <el-col :span="16">
              <h4 class="title"><span>天猫</span>{{v.d_title}}</h4>
              <p class="d_title">{{v.introduce}}</p>
              <span class="Postage">包邮</span>
              <p class="price"><small>￥</small>{{v.price}}</p>
              <div>
                <del class="org_Price"><small>￥</small>{{v.org_Price}}</del>
                <span class="quan_receive">{{v.quan_receive}}人已付款</span>
              </div>
            </el-col>
          </router-link>
        </el-row>
      </div>
    </div>


  </div>
</template>
<script>
  import Banner from '../../views/banner'
  import Title from '../../views/Title'
  import SwiperSlide from '../../views/SwiperSlide'
  import NavList from './Nav'
  export default {
    name: "Index",
    data() {
      return {
        value: '',
        banner: [],
        nav: [],
        snackstitle: {
          title: '零食推荐',
          cid: 6,
          ico:'https://img.51dodoniu.com/pic_18.png'

        },
        makeuptitle: {
          title: '美妆推荐',
          cid: 3,
          ico:'https://img.51dodoniu.com/pic_19.png'
        },
        MotherAndInfanttitle: {
          title: '母婴推荐',
          cid: 2,
          ico:'https://img.51dodoniu.com/pic_20.png'
        },
        snacks: [],
        makeup: [],
        MotherAndInfant: [],
        GoodStuffRecommendation: [],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            loop: true,
          },
          slidesPerView:3.5,
          spaceBetween : 20,
        },
      }
    },
    methods: {
      checkSearch(){
        this.$router.push({path:'Search'})
      }
    },

    mounted() {
      this.$wxSDK._wxSDk(this)
      //轮播
      this.$axios.get('/banner/list?pageSize=3&pageNo=1')
        .then(res => {
          this.banner = res.data.data
        })
      //分类
      this.$axios.get('/menuItem/list/1')
        .then(res => {
          this.nav = res.data.data
        })
      //零食推荐
      this.$axios.get('/current/page?pageSize=10&pageNo=1&cid=6')
        .then(res => {

          this.snacks = res.data.data
        })
      //美妆推荐
      this.$axios.get('/current/page?pageSize=10&pageNo=1&cid=3')
        .then(res => {
          this.makeup = res.data.data
        })
      //母婴推荐
      this.$axios.get('/current/page?pageSize=10&pageNo=1&cid=2')
        .then(res => {
          this.MotherAndInfant = res.data.data

        })
      this.$axios.get('/goods/wanderful_Goods?pageSize=10&pageNo=1')
        .then(res => {
          this.GoodStuffRecommendation = res.data.data
        })
    },
    components: {
      Banner,
      Title,
      SwiperSlide,
      NavList
    },


  }
</script>

<style scoped lang="less">

  .root {

    background-image: url("https://img.51dodoniu.com/pic_01.png");
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


    .group {
      padding-bottom: 15px;

      a {
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #333333;

        img {
          width: 60%;
          padding: 0 20%;
          text-align: center;
        }
      }
    }

    .GoodStuffRecommendation {
      padding: 12px;

      .el-row {
        margin-bottom: 12px;
        .el-col-8 {
          img {
            width: 100%;
          }
        }

        .el-col-16 {
          padding-left: 12px;

          h4 {
            overflow-y: hidden; /* 超出内容不可见 */
            white-space: nowrap; /* 不换行 */
            text-overflow: ellipsis;
            font-weight: 400;
            color: #333333;
            vertical-align:middle;
            padding: 2px 5px;
            span {
              background: #FF0000;
              color: #ffffff;
              padding: 2px 5px;
              font-size: 12px;
              margin-right: 5px;
              border-radius: 3px;
            }
          }
          .Postage {
            border: 1px solid #fd7216;
            color: #fd7216;
            padding: 1px 4px;
            font-size: 12px;
            border-radius: 3px;
            margin-left: 4px;
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
          .quan_receive {
            float: right;
            color: #999999;
            font-size: 12px;
          }
          img {
            width: 10%;
          }
        }
      }
    }
  }
</style>
