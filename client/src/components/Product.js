import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'; // Import Card

function Product({ product }) {
  return (
    // 'my-3' = margin-y: 1rem, 'p-3' = padding: 1rem
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;