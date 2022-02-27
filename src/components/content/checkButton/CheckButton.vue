<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "Checkbutton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isChecked(val, oldVal) {
      if(val) {
        this.$emit('countCheck');
      }
    }
  }
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 1px solid #aaa;
}
.check {
  background-color: red;
  border: 1px solid #fff;
}
</style>