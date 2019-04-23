<template>
  <div class="NavList">
    <el-row>
      <el-col :span="21">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide
            v-for="(v,k) in List" :key="k" :did="v.did">
              <span
                @click="swiperTo(v,k)"
                :class="{isActive:v.did==status}"
                :id="v.did"
              >{{v.item_name}}</span>

          </swiper-slide>
        </swiper>
      </el-col>
<!--      <el-col :span="3">-->
<!--        <img src="https://img.51dodoniu.com/ico_08.png" alt="" @click="Popup" v-show="!IsActive">-->
<!--        <img src="https://img.51dodoniu.com/ico_21.png" alt="" @click="Popup" v-show="IsActive">-->
<!--      </el-col>-->
    </el-row>
    <el-row class="PopupCont" v-show="IsActive">
      <el-col :span="6" v-for="(v,k) in List" :key="k" :did="v.did">
        <img :src="v.item_img" alt="" @click="swiperTo(v,k)">
        <span @click="swiperTo(v,k)">{{v.item_name}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Nav",
    data() {
      return {
        swiperOption: {

          pagination: {
            el: '.swiper-pagination',
          },
          slidesPerView: 6,
        },
        active: false,
        status: '',
        did: '',
        IsActive: false,
      }
    },
    props: {
      List: {
        type: [Array, Object],
        default: []
      }
    },
    methods: {
      swiperTo(v, k) {
        this.status = v.did
        console.log(v.did)
        this.$router.push({name: 'List', query: {id: v.did}})
      },
      Popup() {
        this.IsActive = !this.IsActive
      }
    }
  }
</script>

<style scoped lang="less">
  .isActive {
    border-bottom: 2px solid #ffffff;
    font-size: 16px;
  }

  .NavList {
    line-height: 40px;

    .swiper-slide {
      text-align: center;
      color: #ffffff;
      font-size: 15px !important;
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

  /*.IsActive{*/
  /*  display: block;*/
  /*}*/
</style>
