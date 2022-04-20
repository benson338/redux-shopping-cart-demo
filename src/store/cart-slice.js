import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload; // will be an obj
      // to check if item is already available
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      }
      state.totalQuantity++;
    },
    removeFromCart(state, action) {
      const id = action.payload; // will be just an id
      const existingItem = state.itemsList.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

// THUNK PATTERN: An alternative where we should have the logics & all of the data & action creators inside the Redux only
// - to keep your components clean

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      // Send state as Sending request
      dispatch(
        uiActions.showNotification({
          open: true,
          type: 'warning',
          message: 'Sending Request',
        })
      );
      const res = await fetch(
        'https://redux-http-demo-default-rtdb.firebaseio.com/cartItems.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
      // eslint-disable-next-line no-unused-vars
      const data = await res.json();
      // Send state as Request successful
      dispatch(
        uiActions.showNotification({
          open: true,
          type: 'success',
          message: 'Send Request To Database Successfully',
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          type: 'error',
          message: 'Sending Request Failed',
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
