import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import Layout from './components/Layout';

function App() {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    fetch(
      'https://redux-http-demo-default-rtdb.firebaseio.com/cartItems.json',
      {
        method: 'PUT',
        body: JSON.stringify(cart),
      }
    );
  }, [cart]);

  return (
    <div className="App">
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
