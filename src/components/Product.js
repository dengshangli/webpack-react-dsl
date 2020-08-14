/*
 * @Author: 邓尚理
 * @Date: 2020-08-11 18:20:40
 * @LastEditTime: 2020-08-14 17:48:10
 * @LastEditors: 邓尚理
 * @Description:
 * @FilePath: \webpack-react-dsl\src\components\Product.js
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class Product extends Component {
  render() {
    const { price, quantity, title, action } = this.props;
    return (
      <div>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {title} - &#36;{price} {quantity ? `x ${quantity}` : null} {action}
      </div>
    );
  }
}

Product.propTypes = {
  // eslint-disable-next-line react/require-default-props
  price: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  quantity: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  action: PropTypes.node,
};
