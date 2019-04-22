<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(v,k) in bannerList" :key="k">
          <img :src="v.pic"/>
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
          loop: true,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
          },

        },
      }
    },
    props: {
      bannerList: {
        type: [Array, Object],
        default: []
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="less" >
  .banner {
    img {
      width: 100%;
    }
  }
</style>
