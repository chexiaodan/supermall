<template>
  <div class="goods">
    <div class="goods-list-item">
      <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item" class="goods-list-item" ></goods-list-item>
    </div>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';
export default {
  name: "Goodslist",
  components: { 
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  
};
</script>

<style scoped>
  .goods-list-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>