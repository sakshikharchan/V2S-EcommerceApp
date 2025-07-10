import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Checkout from './src/components/Checkout/Checkout';
import { clearCart } from './src/redux/slices/cartSlice';

const mockStore = configureStore([]);

describe('Checkout Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          { id: 1, name: 'Blue T-Shirt', price: 20 },
          { id: 2, name: 'Red Sneakers', price: 50 },
        ],
      },
    });
    store.dispatch = jest.fn();
  });

  test('should display cart items and total, and complete purchase', () => {
    render(
      <Provider store={store}>
        <Checkout />
      </Provider>
    );

    expect(screen.getByText('Blue T-Shirt - $20')).toBeInTheDocument();
    expect(screen.getByText('Red Sneakers - $50')).toBeInTheDocument();
    expect(screen.getByText('Total: $70')).toBeInTheDocument();

    const purchaseButton = screen.getByText('Complete Purchase');
    fireEvent.click(purchaseButton);

    expect(store.dispatch).toHaveBeenCalledWith(clearCart());
  });
});