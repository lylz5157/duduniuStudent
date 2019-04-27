import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = ()  => import('@/components/Index/Index')  // 首页
const CommodityDatails = ()  => import('@/components/Commodity/CommodityDatails')  // 商品详情
const SearchCommodityDatails = ()  => import('@/components/Commodity/SearchCommodityDatails')  // 搜索详情
const RushToBuy = ()  => import('@/components/RushToBuy/RushToBuy')  // 疯抢排行榜
const HalfPricePerDay = ()  => import('@/components/HalfPricePerDay/HalfPricePerDay')  // 每日半价
const Capping = ()  => import('@/components/Capping/Capping')  // 30元封顶
const FreeShipping = ()  => import('@/components/FreeShipping/FreeShipping')  // 30元封顶
const List = ()  => import('@/components/List/List')  // 分类列表
const Search = ()  => import('@/components/Index/Search')  // 搜索
const Brand = ()  => import('@/components/Brand/Brand')  // 超级品牌
const BrandArea = ()  => import('@/components/Brand/BrandArea')  // 品牌专区
const More = ()  => import('@/components/Index/More')  // 更多



const router = new Router({
  mode: 'history',
  routes: [
    // { path: '/',name: 'Index', component: Index, meta:{title:'首页'}},
    { path: '/CommodityDatails',name: 'CommodityDatails', component: CommodityDatails, meta:{title:'商品详情'}},
    { path: '/SearchCommodityDatails',name: 'SearchCommodityDatails', component: SearchCommodityDatails, meta:{title:'商品详情',keepAlive:false}},//搜索详情
    { path: '/RushToBuy',name: 'RushToBuy', component: RushToBuy, meta:{title:'疯抢排行榜'}},
    { path: '/HalfPricePerDay',name: 'HalfPricePerDay', component: HalfPricePerDay, meta:{title:'每日半价'}},
    { path: '/Capping',name: 'Capping', component: Capping, meta:{title:'30元封顶'}},
    { path: '/FreeShipping',name: 'FreeShipping', component: FreeShipping, meta:{title:'9.9包邮'}},
    { path: '/',name: 'List', component: List, meta:{title:'分类列表'}},
    { path: '/Search',name: 'Search', component: Search, meta:{title:'搜索',keepAlive:true}},
    { path: '/Brand',name: 'Brand', component: Brand, meta:{title:'超级品牌'}},
    { path: '/BrandArea',name: 'BrandArea', component: BrandArea, meta:{title:'品牌专区'}},
    { path: '/More',name: 'More', component: More, meta:{title:'更多'}},
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({name: from.name, query: to.query}) : next({
      path: '/',
      query: to.query
    });
  } else {
    next();
  }
});

export default router

