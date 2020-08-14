/*
 * @Author: 邓尚理
 * @Date: 2020-08-11 18:20:39
 * @LastEditTime: 2020-08-14 17:34:53
 * @LastEditors: 邓尚理
 * @Description:
 * @FilePath: \webpack-react-dsl\src\components\App.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import ProductList from './ProductList';
import Cart from './Cart';

const App = () => (
  <div>
    <h2>Shopping Cart Example</h2>
    <hr />
    <ProductList />
    <hr />
    <Cart />
  </div>
);

App.contextTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object,
};

export default App;
