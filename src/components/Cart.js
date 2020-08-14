/*
 * @Author: 邓尚理
 * @Date: 2020-08-11 18:20:39
 * @LastEditTime: 2020-08-14 17:37:40
 * @LastEditors: 邓尚理
 * @Description: 
 * @FilePath: \webpack-react-dsl\src\components\Cart.js
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import { checkout, removeFromCart } from '../actions';
import { getTotal, getCartProducts, getCheckoutError, isCheckoutPending } from '../reducers';

// eslint-disable-next-line react/prefer-stateless-function
class Cart extends Component {
  render() {
    const { products, total, error, checkoutPending, checkout, removeFromCart } = this.props;

    const hasProducts = products.length > 0;
    const checkoutAllowed = hasProducts && !checkoutPending;

    const nodes = !hasProducts ? (
      <em>Please add some products to cart.</em>
    ) : (
      products.map((product) => (
        <CartItem
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          key={product.id}
          onRemove={() => removeFromCart(product.id)}
        />
      ))
    );

    return (
      <div>
        <h3>Your Cart</h3>
        <div>{nodes}</div>
        <p>
          Total: &#36;
          {total}
        </p>
        <button type="button" onClick={checkout} disabled={checkoutAllowed ? '' : 'disabled'}>
          Checkout
        </button>
        <div style={{ color: 'red' }}>{error}</div>
      </div>
    );
  }
}

Cart.propTypes = {
  // data
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  // eslint-disable-next-line react/require-default-props
  total: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  error: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  checkoutPending: PropTypes.bool,

  // actions
  checkout: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    products: getCartProducts(state),
    total: getTotal(state),
    error: getCheckoutError(state),
    checkoutPending: isCheckoutPending(state),
  }),
  { checkout, removeFromCart },
)(Cart);
