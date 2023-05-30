import { configureStore } from '@reduxjs/toolkit'
import productListSlice from './features/products/productListSlice'
import authSlice from './features/auth/authSlice'
import orderSlice from './features/orders/orderSlice'

export const store = configureStore({
    reducer: {
        productList: productListSlice,
        orders: orderSlice,
        auth: authSlice,
    }
})

