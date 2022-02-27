import {ADD_COUNTER, ADD_TO_CART} from './mitation-types'
export default {
  addCartss(context, payload) {
    return new Promise((resolve, reject) => {
      let oldPrice = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })
  
      if (oldPrice) {
        // oldPrice.count += 1
        context.commit(ADD_COUNTER, oldPrice)
        resolve('当前的商品数量+1')
      }else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}