import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ useNavigate added
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { Carousel } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Initialize navigate
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!selectedSize && product?.sizes?.length > 0) {
      alert('Please select a size');
      return;
    }

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize: selectedSize || null,
      quantity
    }));

    // ✅ Redirect to checkout
    navigate('/checkout');
  };

  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (error) return <div className="container py-5 alert alert-danger">Error: {error}</div>;
  if (!product) return <div className="container py-5 alert alert-info">Product not found</div>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <Carousel>
            {[product.image, ...(product.additionalImages || [])].map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="col-md-6">
          <h1>{product.name}</h1>
          <div className="d-flex align-items-center mb-3">
            <div className="text-warning me-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className={`fas fa-star${i < Math.floor(product.rating) ? '' : '-half-alt'}`} />
              ))}
            </div>
            <span className="text-muted">({product.reviews} reviews)</span>
          </div>

          <div className="mb-3">
            {product.discount > 0 && (
              <span className="badge bg-danger me-2">{product.discount}% OFF</span>
            )}
            <span className="text-muted">Brand: {product.brand}</span>
          </div>

          <div className="mb-4">
            <h3 className="text-primary">
              ₹{product.price.toLocaleString()}
              {product.originalPrice && (
                <small className="text-muted text-decoration-line-through ms-2">
                  ₹{product.originalPrice.toLocaleString()}
                </small>
              )}
            </h3>
          </div>

          <p className="mb-4">{product.description}</p>

          {product.sizes?.length > 0 && (
            <div className="mb-4">
              <h5>Size</h5>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`btn btn-outline-secondary ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h5>Quantity</h5>
            <div className="input-group" style={{ width: '150px' }}>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="d-flex gap-3">
            <button
              className="btn btn-primary btn-lg flex-grow-1"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="btn btn-outline-primary btn-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {product.details && (
        <div className="row mt-5">
          <div className="col-12">
            <h3>Product Details</h3>
            <table className="table">
              <tbody>
                {Object.entries(product.details).map(([key, value]) => (
                  <tr key={key}>
                    <th scope="row" style={{ width: '30%' }}>{key}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductById } from '../../redux/slices/productSlice';
// import { addToCart } from '../../redux/slices/cartSlice';
// import { Carousel } from 'react-bootstrap';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { product, loading, error } = useSelector((state) => state.products);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     dispatch(fetchProductById(id));
//   }, [id, dispatch]);

//   const handleAddToCart = () => {
//     if (!selectedSize && product?.sizes?.length > 0) {
//       alert('Please select a size');
//       return;
//     }

//     dispatch(addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       selectedSize: selectedSize || null,
//       quantity
//     }));

//     navigate('/checkout');
//   };

//   if (loading) return <div className="container py-5 text-center">Loading...</div>;
//   if (error) return <div className="container py-5 alert alert-danger">Error: {error}</div>;
//   if (!product) return <div className="container py-5 alert alert-info">Product not found</div>;

//   return (
//     <div className="container py-5">
//       <div className="row">
//         <div className="col-md-6">
//           <Carousel>
//             {[product.image, ...(product.additionalImages || [])].map((img, index) => (
//               <Carousel.Item key={index}>
//                 <img
//                   className="d-block w-100"
//                   src={img}
//                   alt={`${product.name} ${index + 1}`}
//                 />
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         </div>

//         <div className="col-md-6">
//           <h1>{product.name}</h1>
//           <p>{product.description}</p>
//           <h4>Price: ₹{product.price.toLocaleString()}</h4>

//           {product.sizes?.length > 0 && (
//             <div className="mb-4">
//               <h5>Size</h5>
//               <div className="d-flex flex-wrap gap-2">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     className={`btn btn-outline-secondary ${selectedSize === size ? 'active' : ''}`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="mb-4">
//             <h5>Quantity</h5>
//             <div className="input-group" style={{ width: '150px' }}>
//               <button
//                 className="btn btn-outline-secondary"
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               >
//                 -
//               </button>
//               <input
//                 type="number"
//                 className="form-control text-center"
//                 value={quantity}
//                 min="1"
//                 onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//               />
//               <button
//                 className="btn btn-outline-secondary"
//                 onClick={() => setQuantity(quantity + 1)}
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           <button
//             className="btn btn-primary btn-lg"
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
