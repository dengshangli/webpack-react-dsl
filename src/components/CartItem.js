/*
 * @Author: 邓尚理
 * @Date: 2020-04-03 16:32:34
 * @LastEditTime: 2020-08-14 17:46:43
 * @LastEditors: 邓尚理
 * @Description:
 * @FilePath: \webpack-react-dsl\src\components\CartItem.js
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

// eslint-disable-next-line react/prefer-stateless-function
export default class CartItem extends Component {
  render() {
    const { price, quantity, title, onRemove } = this.props;

    return (
      <Product
        price={price}
        quantity={quantity}
        title={title}
        action={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <button type="button" onClick={onRemove}>
            {' X '}
          </button>
        }
      />
    );
  }
}

CartItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  price: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  quantity: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
};
