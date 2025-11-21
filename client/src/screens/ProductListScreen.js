import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. Function to fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchProducts();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  // 2. Delete Handler
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        // Reload products after delete
        fetchProducts();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const createProductHandler = () => {
    // We will build this in the next step
    console.log('Create product');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Products</h1>
        <button onClick={createProductHandler}>+ Create Product</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>Category</td>
                <td>Brand</td>
                <td>
                  <button style={{ marginRight: '10px' }}>Edit</button>
                  <button 
                    onClick={() => deleteHandler(product._id)}
                    style={{ color: 'red' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductListScreen;