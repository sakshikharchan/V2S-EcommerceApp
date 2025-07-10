import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; // ✅ Correct
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Create payment intent on your server
      const { data: { clientSecret } } = await axios.post('http://localhost:3001/create-payment-intent', {
        amount: total * 100,
        currency: 'inr',
      });
      
      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: user.address,
              city: user.city,
              state: user.state,
              postal_code: user.pincode,
            },
          },
        },
      });
      
      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }
      
      if (paymentIntent.status === 'succeeded') {
        // Create order on your server
        await axios.post('http://localhost:5000/orders', {
          userId: user.id,
          items,
          total,
          paymentId: paymentIntent.id,
          address: {
            street: user.address,
            city: user.city,
            state: user.state,
            pincode: user.pincode,
          },
          status: 'processing',
        });
        
        // Clear cart and redirect to success page
        dispatch(clearCart());
        navigate('/order-success');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      
      <button 
        className="btn btn-primary w-100" 
        type="submit"
        disabled={!stripe || loading || items.length === 0 || !user}
      >
        {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
      </button>
    </form>
  );
};

export default CheckoutForm;