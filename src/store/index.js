import {configureStore} from '@reduxjs/toolkit';
import AuthLogin from './login-auth'
import FoodItems from './foodItem-auth';
import CartAuth from './cart-auth';
const store=configureStore({
    reducer:{
        login:AuthLogin.reducer,
        food:FoodItems.reducer,
        cart:CartAuth.reducer,
    }
})
export default store;