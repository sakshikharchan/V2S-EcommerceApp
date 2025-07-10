


import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: '250px', objectFit: 'cover' }}
        />
      </Link>

      <div className="card-body">
        <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
          <h5 className="card-title">{product.name}</h5>
        </Link>
        <p className="mb-1 fw-bold">₹{product.price.toLocaleString()}</p>
        {product.originalPrice && (
          <p className="text-muted text-decoration-line-through mb-2">
            ₹{product.originalPrice.toLocaleString()}
          </p>
        )}
        <p className="text-warning mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <i
              key={i}
              className={`fa-star ${i < Math.floor(product.rating) ? 'fas' : 'far'}`}
            />
          ))}
        </p>
        <button
          className="btn btn-outline-primary w-100"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
