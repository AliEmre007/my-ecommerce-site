import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom'; // 1. Import Link

function Product({ product }) {
  return (
    // 2. Wrap the card in a Link to the product's page
    // We use a template literal (backticks ``) to build the URL
    <Link to={`/product/${product._id}`} className="product-link">
      <div className="product-card">
        <div className="product-card-body">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default Product;