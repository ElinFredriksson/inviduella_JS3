import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import {
//   doc,
//   collection,
//   getDocs,
//   getDoc,
//   updateDoc,
//   deleteDoc,
// } from 'firebase/firestore'
// import { db } from '../../../firebase/config'
import orderService from './orderService'

export const initialState = {
  orders: [],
  error: null,
  loading: false,
}

export const getOrders = createAsyncThunk(
  'orderList/getAll',
  async (_, thunkAPI) => {
    try {
      return await orderService.getAllAsync('orders')
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const updateOrderStatus = createAsyncThunk(
  'orderList/update',
  async (orderData, thunkAPI) => {
    try {
      await orderService.updateOrder(orderData)
      return orderData
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const orderSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        const { id, status } = action.payload
        const order = state.orders.find((order) => order.id === id)
        if (order) {
          order.status = status
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default orderSlice.reducer

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import orderService from './orderService'

// export const initialState = {
//   orders: [],
//   error: null,
//   loading: false,
// }

// export const getOrders = createAsyncThunk(
//   'orderList/getAll',
//   async (_, thunkAPI) => {
//     try {
//       return await orderService.getAllAsync('orders')
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message)
//     }
//   }
// )

// export const deleteCompletedOrder = createAsyncThunk(
//   'orderList/delete',
//   async (orderId, thunkAPI) => {
//     try {
//       const orderRef = doc(db, 'orders', orderId)
//       const orderSnapshot = await getDoc(orderRef)
//       const orderData = orderSnapshot.data()

//       if (orderData.status === 'completed') {
//         throw new Error("Cannot delete orders with a status of 'completed'.")
//       }

//       await deleteDoc(orderRef)
//       return orderId
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message)
//     }
//   }
// )

// export const updateOrderStatus = createAsyncThunk(
//   'orderList/update',
//   async (orderData, thunkAPI) => {
//     try {
//       await orderService.updateOrder(orderData)
//       return orderData
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message)
//     }
//   }
// )

// export const orderSlice = createSlice({
//   name: 'orderList',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getOrders.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(getOrders.fulfilled, (state, action) => {
//         state.loading = false
//         state.error = null
//         state.orders = action.payload
//       })
//       .addCase(getOrders.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })

//       .addCase(deleteCompletedOrder.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(deleteCompletedOrder.fulfilled, (state, action) => {
//         state.loading = false
//         state.error = null
//         state.orders = state.orders.filter(
//           (order) => order.id !== action.payload
//         )
//       })
//       .addCase(deleteCompletedOrder.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })

//       .addCase(updateOrderStatus.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(updateOrderStatus.fulfilled, (state, action) => {
//         state.loading = false
//         state.error = null
//         const { id, status } = action.payload
//         const order = state.orders.find((order) => order.id === id)
//         if (order) {
//           order.status = status
//         }
//       })
//       .addCase(updateOrderStatus.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })
//   },
// })

// // export const { updateOrderStatus } = orderSlice.actions
// export default orderSlice.reducer
