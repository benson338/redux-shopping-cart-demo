import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Notification from './components/Notification';
import { fetchData, sendCartData } from './store/cart-actions';
let firstRender = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchData());
    // it will cause a rerender
    // console.log('fetchdata-regular-render');
  }, [dispatch]);
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    if (cart.changed) dispatch(sendCartData(cart));
  }, [cart, dispatch]);

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
