import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from './productsService'

const initialState = {
  products: [],
  error: null,
  loading: false,
}

export const addProduct = createAsyncThunk(
  'product-list/add',
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData)
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const getProducts = createAsyncThunk(
  'product-list/getAll',
  async (_, thunkAPI) => {
    try {
      return await productService.getAllAsync('products')
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'product-list/delete',
  async (productId, thunkAPI) => {
    try {
      await productService.deleteProduct(productId)
      return productId
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'product-list/update',
  async (productData, thunkAPI) => {
    try {
      await productService.updateProduct(productData)
      return productData
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const productListSlice = createSlice({
  name: 'Product-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.products = [...state.products, action.payload]
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        )
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        )
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default productListSlice.reducer

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import productService from "./productsService";

// const initialState = {
//     products: [],
//     error: null,
//     loading: false
// }

// export const addProduct = createAsyncThunk('product-list/add', async (productData, thunkAPI) => {
//     try {
//         return await productService.createProduct(productData)
//     } catch (err) {
//         return thunkAPI.rejectWithValue(err.message)
//     }
// })

// export const getProducts = createAsyncThunk('product-list/getAll', async (_, thunkAPI) => {
//   try {
//       return await productService.getAllAsync('products')
//   } catch (err) {
//       return thunkAPI.rejectWithValue(err.message)
//   }
// })

// export const productListSlice = createSlice({
//     name: 'Product-list',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//           .addCase(addProduct.pending, (state) => {
//             state.loading = true;
//           })
//           .addCase(addProduct.fulfilled, (state, action) => {
//             state.loading = false;
//             state.error = null;
//             state.products = [...state.products, action.payload];
//           })
//           .addCase(addProduct.rejected, (state, action) => {
//             state.loading = false
//             state.error = action.payload
//           })

//           .addCase(getProducts.pending, (state) => {
//             state.loading = true;
//           })
//           .addCase(getProducts.fulfilled, (state, action) => {
//             state.loading = false;
//             state.error = null;
//             state.products = action.payload;
//           })
//           .addCase(getProducts.rejected, (state, action) => {
//             state.loading = false
//             state.error = action.payload
//           })
//     }
// })

// export default productListSlice.reducer
