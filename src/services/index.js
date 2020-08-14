/*
 * @Author: 邓尚理
 * @Date: 2020-04-03 16:32:34
 * @LastEditTime: 2020-08-14 17:44:27
 * @LastEditors: 邓尚理
 * @Description: 
 * @FilePath: \webpack-react-dsl\src\services\index.js
 */
/**
 * Mocking client-server processing
 */
import _products from './products';

const TIMEOUT = 100;
const MAX_CHECKOUT = 2; // max different items

// eslint-disable-next-line import/prefer-default-export
export const api = {
  getProducts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(_products), TIMEOUT);
    });
  },

  buyProducts(cart) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Object.keys(cart.quantityById).length <= MAX_CHECKOUT) resolve(cart);
        // eslint-disable-next-line prefer-promise-reject-errors
        else reject(`You can buy ${MAX_CHECKOUT} items at maximum in a checkout`);
      }, TIMEOUT),
    );
  },
};
