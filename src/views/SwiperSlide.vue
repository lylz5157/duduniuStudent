<template>
  <div class="SwiperSlide">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(v,k) in SwiperList" :key="k">
        <router-link :to="{name:'CommodityDatails',query:{id:v.goodsID}}">
        <img :src="v.pic"/>
        <h4>{{v.d_title}}</h4>
        <p><small>￥</small>9.9 <span>到手</span></p>
        <del>19.9</del>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: "banner",
    data() {
      return {
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
    props: {
      SwiperList: {
        type: [Array, Object],
        default: []
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="less" >
  .SwiperSlide {
    border-bottom: 4px solid #f4f4f4;
    padding: 0 12px 12px 12px;
      h4 {
        font-size: 12px;
        font-weight: 400;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #333333;
      }
    img {
      width: 100%;
    }
    p {
      font-size: 14px;
      color: #ff0000;
      small {
        font-size: 10px;
      }
      span {
        font-size: 10px;
      }
    }
    del {
      font-size: 12px;
      color: #CCCCCC;
    }
  }
</style>
