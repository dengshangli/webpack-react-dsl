import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductItem from './ProductItem';

import { addToCart } from '../actions';
import { getVisibleProducts } from '../reducers/products';

// eslint-disable-next-line react/prefer-stateless-function
class ProductList extends Component {
  render() {
    // eslint-disable-next-line no-shadow
    const { products, addToCart } = this.props;

    return (
      <div>
        <h3>Products</h3>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCartClicked={() => addToCart(product.id)}
          />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired,
    }),
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default connect((state) => ({ products: getVisibleProducts(state.products) }), {
  addToCart,
})(ProductList);
