<template>
  <div class="Categorynavbar">
    <nav-bar>
      <div slot="center">商品分类</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  components: { NavBar },
  name: 'Categorynavbar',
};
</script>

<style scoped>
.Categorynavbar {
  background-color: var(--color-tint);
  color: white;
}
</style>