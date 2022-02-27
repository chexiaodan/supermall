<template>
  <div class="bottom-bar">
    <div class="checked-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="selectAll"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算: ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue';
export default {
  name: "Cartbottombar",
  components: { 
    CheckButton,
  },
  data() {
    return {
      isChecked: false,
    };
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.ptice * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll() {
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    selectAll() {
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(item => item.checked = false);
      }else {
         this.$store.state.cartList.forEach(item => item.checked = true);
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('购物车为空', 1000)
      }
    }
  },
  
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  position: relative;
  line-height: 40px;
  background-color: #eee;
  display: flex;
  font-size: 14px;
}
.checked-content {
 display: flex;
 align-items: center;
 margin-left: 10px;
 width: 60px;
}
.check-button {
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin-right: 4px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  background-color: red;
  width: 80px;
  text-align: center;
  color: white;
}
</style>