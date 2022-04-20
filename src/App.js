import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Notification from './components/Notification';
import { uiActions } from './store/ui-slice';
let firstRender = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
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
    sendRequest().catch((err) => {
      // Send state as Error
      dispatch(
        uiActions.showNotification({
          open: true,
          type: 'error',
          message: 'Sending Request Failed',
        })
      );
    });
  }, [cart]);

  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
