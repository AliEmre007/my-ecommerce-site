import React, { useState, useEffect, useContext } from 'react'; // 1. Import useContext
import { useParams, useNavigate } from 'react-router-dom'; // 2. Import useNavigate
import CartContext from '../context/CartContext'; // 3. Import our context

function ProductScreen() {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();
  const navigate = useNavigate(); // 4. Initialize navigate

  // 5. Get the addToCart function from our global context
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.log('Error fetching product:', err));
  }, [productId]);

  // 6. Create a handler function
  const addToCartHandler = () => {
    addToCart(product); // Call the global function
    navigate('/cart'); // Redirect the user to the cart page
  };

  return (
    <div>
      <a href="/">Go Back</a>
      
      <div>
        {/* ... (image, name, price, description) ... */}
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>
      </div>

      <div>
        Status: {product.inStock > 0 ? 'In Stock' : 'Out of Stock'}
      </div>
      <div>
        {/* 7. Update the button to use our new handler */}
        <button 
          onClick={addToCartHandler} 
          disabled={product.inStock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductScreen;