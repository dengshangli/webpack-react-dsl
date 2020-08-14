/*
 * @Author: 邓尚理
 * @Date: 2020-04-03 16:32:34
 * @LastEditTime: 2020-08-14 17:48:29
 * @LastEditors: 邓尚理
 * @Description: 
 * @FilePath: \webpack-react-dsl\src\reducers\index.js
 */
import { combineReducers } from 'redux';
import { ADD_TO_CART } from '../actions';
// eslint-disable-next-line import/no-named-default
import { default as cart, getQuantity, getAddedIds } from './cart';
// eslint-disable-next-line import/no-named-default
import { default as products, getProduct } from './products';

export function getCart(state) {
  return state.cart;
}

export function getCheckoutError(state) {
  return state.cart.checkoutStatus.error;
}

export function isCheckoutPending(state) {
  return state.cart.checkoutStatus.checkoutPending;
}

export function getTotal(state) {
  return getAddedIds(state.cart)
    .reduce(
      (total, id) => total + getProduct(state.products, id).price * getQuantity(state.cart, id),
      0,
    )
    .toFixed(2);
}

export function getCartProducts(state) {
  return getAddedIds(state.cart).map((id) => ({
    ...getProduct(state.products, id),
    quantity: getQuantity(state.cart, id),
  }));
}

const shoppingCart = combineReducers({
  cart,
  products,
});

export default function root(state, action) {
  if (action.type === ADD_TO_CART && state.products.byId[action.productId].inventory <= 0)
    return state;

  return shoppingCart(state, action);
}
