// THUNK PATTERN: An alternative where we should have the logics & all of the data & action creators inside the Redux only
// - to keep your components clean

import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        'https://redux-http-demo-default-rtdb.firebaseio.com/cartItems.json'
      );
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          type: 'error',
          message: 'Failed to Fetch Data',
        })
      );
    }
  };
};

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
