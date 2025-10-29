import React, { useState, useEffect } from 'react';
import Product from '../components/Product'; // Note the '../' to go up one folder

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log('Error fetching products:', err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;