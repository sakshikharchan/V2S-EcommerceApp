import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Checkout from '../src/pages/Checkout';
import cartReducer from '../src/features/cart/cartSlice';
import authReducer from '../src/features/auth/authSlice';

// Mock Stripe Elements
jest.mock('@stripe/stripe-react', () => ({
  Elements: ({ children }) => <div>{children}</div>,
  CardElement: () => <div>CardElement</div>,
  useStripe: () => ({
    confirmCardPayment: jest.fn(() => Promise.resolve({
      error: null,
      paymentIntent: { status: 'succeeded', id: 'pi_123' }
    }))
  }),
  useElements: () => ({
    getElement: jest.fn()
  })
}));

// Mock axios
jest.mock('axios');
const axios = require('axios');

describe('Checkout Process', () => {
  let store;
  
  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
        auth: authReducer
      },
      preloadedState: {
        auth: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            address: '123 Test St',
            city: 'Test City',
            state: 'Test State',
            pincode: '123456',
            phone: '9876543210'
          }
        },
        cart: {
          items: [
            {
              product: {
                id: 1,
                name: 'Test Product',
                price: 999,
                image: 'test.jpg'
              },
              quantity: 1,
              selectedSize: 'M'
            }
          ],
          total: 999
        }
      }
    });
    
    axios.post.mockResolvedValueOnce({ 
      data: { clientSecret: 'test_secret' } 
    }).mockResolvedValueOnce({ 
      data: { id: 1 } 
    });
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      </Provider>
    );
  });
  
  it('renders checkout page correctly', () => {
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('Delivery Address')).toBeInTheDocument();
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('₹999')).toBeInTheDocument();
  });
  
  it('processes payment successfully', async () => {
    fireEvent.click(screen.getByText('Pay ₹999'));
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(2);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/create-payment-intent',
        { amount: 99900, currency: 'inr' }
      );
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/orders',
        expect.objectContaining({
          userId: 1,
          total: 999,
          paymentId: 'pi_123'
        })
      );
    });
  });
  
  it('shows error when payment fails', async () => {
    const errorMessage = 'Payment failed';
    axios.post.mockReset();
    axios.post.mockRejectedValueOnce(new Error(errorMessage));
    
    fireEvent.click(screen.getByText('Pay ₹999'));
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});