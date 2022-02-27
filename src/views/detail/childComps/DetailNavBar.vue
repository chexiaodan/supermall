<template>
  <div id="detail">
    <nav-bar>
      <div slot="left" @click="backClick">
        <img class="detailBack" src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" @click="itemClick(index)" :class="{active: currendIndex === index}" class="title-item" :key="item">
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "Detailnavbar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currendIndex: 0,
      isActive:false 
    };
  },
  methods: {
    itemClick(index) {
      this.currendIndex = index
      this.$emit('titleCilck', index);
    },
    backClick() {
      this.$router.back()
    }
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.detailBack {
  position: relative;
  top: 5px;
}
</style>