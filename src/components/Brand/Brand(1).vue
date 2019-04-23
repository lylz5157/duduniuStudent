<template>
    <div v-wechat-title="$route.meta.title" class="root">
        <MainSearch></MainSearch>
        <div class="Brand">
            <div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
                <mt-loadmore :top-method="loadTop"
                             :bottom-method="loadBottom"
                             :bottom-all-loaded="allLoaded" ref="loadmore"
                             :autoFill="isAutoFill"
                >

                    <el-row v-for="(v,k) in HalfPricePerDay" :key="k" class="BrandCont">
                        <div class="BrandContTitle" v-show="v.goodsList.length !=0">
                            <el-col :span="4"><img :src="v.brand_img" alt=""></el-col>
                            <el-col :span="16">
                                <h4>{{v.brand_name}}官方旗舰店</h4>
                                <p>>> 品牌直销 <<</p>
                            </el-col>
                            <el-col :span="4">
                                <span @click="BrandArea(v)">更多 ></span>
                            </el-col>
                        </div>
                        <el-row class="BrandList">

                            <el-col :span="8" v-for="(item,k) in v.goodsList" :key="k">
                                <router-link :to="{name:'CommodityDatails',query:{id:item.goodsID}}">
                                    <el-row>
                                        <el-col :span="24">
                                            <img :src="item.pic" alt="">
                                        </el-col>
                                        <el-col :span="24">
                                            <h4>{{item.d_title}}</h4>
                                            <p class="price">
                                                <small>￥</small>
                                                {{item.price}}
                                            </p>
                                        </el-col>
                                    </el-row>
                                </router-link>
                            </el-col>

                        </el-row>
                    </el-row>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>

<script>
    import MainSearch from '../../views/MainSearch'

    export default {
        name: "Brand",
        data() {
            return {
                HalfPricePerDay: [],
                //可以进行上拉
                allLoaded: false,
                //是否自动触发上拉函数
                isAutoFill: false,
                wrapperHeight: 0,
                courrentPage: 1,
                handler:function(e){e.preventDefault(); e.stopPropagation()}, // 禁止默认事件
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
                this.closeTouch();
                this.loadFrist();
            },
            // 上拉加载
            loadBottom() {
                this.closeTouch();
                this.loadMore();
            },
            // 下来刷新加载
            loadFrist() {
                this.$axios.get('/brand/page?pageSize=8&pageNo=' + this.courrentPage + '&brand_type=2')
                    .then(res => {
                        console.log(res.data.data.datalist)
                        this.courrentPage == 1;
                        this.allLoaded = false; // 可以进行上拉
                        this.HalfPricePerDay = res.data.data.datalist;

                        this.openTouch();
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
                // this.$axios.get('/brand/page?pageSize=8&pageNo=1' + this.courrentPage + '&brand_type=2')
                this.$axios.get('/brand/page?pageSize=8&pageNo=' + this.courrentPage + '&brand_type=2')
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
            BrandArea(v) {
                this.$router.push({path: 'BrandArea', query: {id: v.did}})
            },
            /*解决iphone页面层级相互影响滑动的问题*/
            closeTouch: function () {
                document.getElementsByTagName("body")[0].addEventListener('touchmove',
                    this.handler, {passive: false});//阻止默认事件
            },
            openTouch: function () {
                document.getElementsByTagName("body")[0].removeEventListener('touchmove',
                    this.handler, {passive: false});//打开默认事件
            }
        },

        components: {
            MainSearch
        },
    }
</script>

<style scoped lang="less">
    .main-body {
        /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
        overflow: scroll;
    }

    .root {
        .BrandCont {
            border: 2px solid #f2f2f2;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            margin: 12px;
            box-shadow: 0px 7px 10px #e4e4e4;

            .BrandContTitle {
                background: #893E22;
                height: 40px;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                text-align: center;
                color: #ffffff;
                vertical-align: middle;
                line-height: 20px;
                padding: 5px;
                font-weight: 100;

                h4 {
                    font-weight: 100;
                }

                p {
                    font-size: 12px;
                }

                span {
                    font-size: 12px;
                    line-height: 40px;
                }

                img {
                    width: 69%;
                    text-align: center;
                    vertical-align: middle;
                }
            }

            .BrandList {
                img {
                    width: 100%;
                }

                .el-row {
                    padding: 12px;
                    line-height: 20px;

                    h4 {
                        overflow-y: hidden; /* 超出内容不可见 */
                        white-space: nowrap; /* 不换行 */
                        text-overflow: ellipsis;
                        font-size: 12px;
                        font-weight: 400;
                        color: #333333;
                    }

                    .price {
                        color: #FF0000;
                        font-size: 16px;

                        small {
                            font-size: 10px;
                        }
                    }
                }
            }
        }

    }
</style>
