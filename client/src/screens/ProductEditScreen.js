import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProductEditScreen() {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(0);
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message);

        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setInStock(data.inStock);
        setDescription(data.description);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          name,
          price,
          image,
          brand,
          category,
          description,
          inStock,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert('Product Updated!');
      navigate('/admin/productlist');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="profile-container">
      <Link to="/admin/productlist">Go Back</Link>
      
      <div className="profile-form">
        <h1>Edit Product</h1>
        {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
          <form onSubmit={submitHandler}>
            <div>
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label>Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <label>Image URL</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div>
              <label>Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div>
              <label>Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
              <label>Count In Stock</label>
              <input type="number" value={inStock} onChange={(e) => setInStock(e.target.value)} />
            </div>
            <div>
              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProductEditScreen;