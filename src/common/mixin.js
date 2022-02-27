import { debounce } from "common/utils";
import BackTop from 'components/content/backTop/BackTop.vue';
export const itemListennerMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListenner = () => {
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListenner);
  }
  
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackScroll: false,
      
    };
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    getPosition(position) {
      this.isShowBackScroll = -position.y > 1000;
    }
  },
}