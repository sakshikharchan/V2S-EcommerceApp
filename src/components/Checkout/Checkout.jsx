import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart, addToCart } from '../../redux/slices/cartSlice';

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle quantity change
  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;

    if (newQuantity < 1) {
      dispatch(removeFromCart(item.id)); // remove item if quantity goes to 0
    } else {
      dispatch(addToCart({ ...item, quantity: delta }));
    }
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    dispatch(clearCart());
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Checkout</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="d-flex align-items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        width="60"
                        height="60"
                        style={{ objectFit: 'cover' }}
                      />
                      <strong>{item.name}</strong>
                    </td>
                    <td>{item.selectedSize || 'No size'}</td>
                    <td>₹{item.price.toLocaleString()}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleQuantityChange(item, -1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleQuantityChange(item, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="mt-4">Total: ₹{total.toLocaleString()}</h4>

          <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
