<template>
  <swiper class="detail-swiper">
    <swiper-item class="swiper-item" v-for="item in topImages" :key="item">
      <img :src="item" >
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
  name: "Detailswiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>