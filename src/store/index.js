import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import cartSlice from './cart-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
  },
});

// if reducer is an object of slice reducers(auth, shopping-cart etc), then each reducer inside reducer(obj) will become a state that contains the other state managed by that reducer
// state => {auth: {isLoggedIn}, cart: {...}}
// - From Docs

// console.log(store);

export default store;
