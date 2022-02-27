<template>
  <div class="category">
    <category-nav-bar></category-nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll class="categoryContent" ref="scroll">
        <tab-content-category :subcategories="showSubcategory" @categoryImageLoad="categoryImageLoad"></tab-content-category>
        
        <goods-list :goods="showCategoryDetail"></goods-list>
      </scroll>
    </div>
    
  </div>
</template>

<script>
import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
import CategoryNavBar from './childComs/CategoryNavBar.vue';
import TabMenu from './childComs/TabMenu.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
import TabContentCategory from './childComs/TabContentCategory.vue';
import {POP, SELL, NEW} from "common/const";
import GoodsList from '../../components/content/goods/GoodsList.vue';
export default {
  name: "Category",
  components: { 
    CategoryNavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    GoodsList,
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
    };
  },
  created() {
      this._getCategory()
	    this.$bus.$on('itemImageLoad', () => {
		    this.$refs.scroll.refresh()
	    })
    },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
		  return this.categoryData[this.currentIndex].categoryDetail[POP]
    }
  },
  methods: {
	  _getCategory() {
	    getCategory().then(res => {
	      // 1.获取分类数据
	      this.categories = res.data.category.list
		    // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index;
	    const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type) {
	    // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
	    getCategoryDetail(miniWallkey, type).then(res => {
	      // 3.将获取的数据保存下来
	      this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index)
    },

    categoryImageLoad() {
     this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
.category {
  height: 100vh;
  position: relative;
}
.content{
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom:54px;
  overflow: hidden;
  display: flex;
}
.categoryContent {
  flex: 1;
  height: calc(100%);
}
</style>