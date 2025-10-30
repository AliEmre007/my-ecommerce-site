import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 1. Import useParams

function ProductScreen() {
  const [product, setProduct] = useState({}); // State for a single product object
  const { id: productId } = useParams(); // 2. Get the 'id' from the URL

  // 3. Fetch the single product
  useEffect(() => {
    // This API call uses the ID from the URL
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.log('Error fetching product:', err));
  }, [productId]); // Re-run this effect if the productId ever changes

  return (
    <div>
      {/* We'll add a 'Go Back' link later */}
      <a href="/">Go Back</a>
      
      <div>
        {/* We'll add the image later */}
      </div>
      <div>
        <h3>{product.name}</h3>
      </div>
      <div>
        <p>Price: ${product.price}</p>
      </div>
      <div>
        <p>Description: {product.description}</p>
      </div>
      <div>
        Status: {product.inStock > 0 ? 'In Stock' : 'Out of Stock'}
      </div>
      <div>
        {/* We'll add the 'Add to Cart' button later */}
        <button disabled={product.inStock === 0}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductScreen;