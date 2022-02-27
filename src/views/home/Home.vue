<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-comtrol
        ref="tabCon"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-comtrol>
      <goods-list :goods="showGoods"></goods-list>
      <div class="dataEmpty" v-show="isShowEpty">
        <p>没有数据可以加载了....</p>
      </div>
    </scroll>

    <tab-comtrol
        ref="tabCon2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        v-show="isTabFixed"
        class="tab-control"
      ></tab-comtrol>
    <back-top @click.native="backClick" v-show="isShowBackScroll"></back-top>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from "network/home";

import NavBar from "components/common/navbar/NavBar.vue";
import TabComtrol from "components/content/tabControl/TabComtrol.vue";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import Scroll from "components/common/scroll/Scroll.vue";

import {itemListennerMixin, backTopMixin} from 'common/mixin'

export default {
  name: "Home",
  components: {
    NavBar,
    TabComtrol,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    GoodsList,
    Scroll,
  },
  mixins: [itemListennerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowEpty: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListenner: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomedata();
    this.getHomeMethodGoods("pop");
    this.getHomeMethodGoods("new");
    this.getHomeMethodGoods("sell");
    
  },
  mounted() { 
  },

  methods: {
    /* 
     *事件监听 
     */

    // 监听tab栏切换
    tabClick(index) {
      this.isShowEpty = false;
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabCon.currentIndex = index;
      this.$refs.tabCon2.currentIndex = index;
    },

   
    // 监听滚动事件
    contentScroll(position) {
      this.getPosition(position)
      this.isTabFixed = -position.y > this.tabOffsetTop
    },

    // 下拉加载更多
    pullingUp() {
      this.getHomeMethodGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
      this.$refs.scroll.refresh()
    },
    // 监听轮播图片加载
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabCon.$el.offsetTop;
    },

    /* 
     *网络请求相关方法
     */
    getHomedata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeMethodGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        try {
          const data = res.data.list;
          this.goods[type].list.push(...data);
          this.goods[type].page += 1;
        } catch (err) {
          this.isShowEpty = true;
        }
      });
    },
  },

  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()

    this.$bus.$off('itemImageLoad', this.itemImgListenner)
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 6;
}
.tab-control {
  position: sticky;
  top: 43px;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 43px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.dataEmpty {
  line-height: 40px;
  text-align: center;
  color: rgb(71, 65, 65);
}
</style>