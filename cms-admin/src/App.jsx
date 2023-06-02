import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate

} from 'react-router-dom'
import './App.scss'
import { collection, query, where, getDocs } from 'firebase/firestore';

// Components
import Header from './components/header/Header'
import ProductDetails from './components/productDetails/ProductDetails'
import OrderDetails from './components/orderDetails/OrderDetails'
// ADMIN
import LoginAdmin from './pages/admin/loginAdmin/LoginAdmin'
import RegisterAdmin from './pages/admin/registerAdmin/RegisterAdminPage'
import Admin from './pages/admin/Admin'
import AddProduct from './pages/admin/addProduct/AddProduct'
import Products from './pages/products/Products'
import Orders from './pages/admin/orders/Orders'

import GuardedRoute from './RouterGuard';

// Firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebase/config'
import { useDispatch, useSelector } from 'react-redux'
import { authReady } from './store/features/auth/authSlice'
import Home from './pages/home/Home'
import { useState } from 'react'


const App = () => {
  const { authIsReady } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { admin } = useSelector((state) => state.auth)
  const state = useSelector((state) => state.auth)
  console.log('state', state);
  const [user, setUser] = useState(null)
  // const isAdmin = admin && admin.isAdmin

  // useEffect(() => {
  //   onAuthStateChanged(auth, async (_user) => {
  //     let admin = null
  //     const adminQuery = query(collection(db, 'admins'), where('uid', '==', _user?.uid));
  //     const querySnapshot = await getDocs(adminQuery);
  //     if (querySnapshot.docs.length === 0) {
  //       dispatch(authReady(admin))
  //       return;
  //     }

  //     if (_user) {
  //       admin = {
  //         uid: _user.uid,
  //         email: _user.email,
  //         isAdmin: true,
  //       }
  //     }

  //     dispatch(authReady(admin))
  //   })
  // }, [dispatch])

  // console.log('isAdmin', admin?.isAdmin);
  // console.log('Admin', admin);
  
  useEffect(() => {
    onAuthStateChanged(auth, async (_user) => {
      let admin = null
      if (!_user) {
        dispatch(authReady(admin))
        return;
      }
  
      const adminQuery = query(collection(db, 'admins'), where('uid', '==', _user.uid));
      const querySnapshot = await getDocs(adminQuery);
      if (querySnapshot.docs.length === 0) {
        dispatch(authReady(admin))
        return;
      }
  
      admin = {
        uid: _user.uid,
        email: _user.email,
        isAdmin: true,
      }
  
      dispatch(authReady(admin))
    })
  }, [dispatch])
  return (
    <>
      {authIsReady ? (
        <Router>
          <Header />
          
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/register-admin" element={<RegisterAdmin />}/>
           
           <Route
          path="/admin-panel"
          element={
            <GuardedRoute redirectPath={'/login-admin'}
            auth={admin?.isAdmin}>
             <Admin />
            </GuardedRoute>
          }
        />
           <Route
          path="/all-products"
          element={
            <GuardedRoute redirectPath={'/login-admin'}
            auth={admin?.isAdmin}>
             <Products />
            </GuardedRoute>
          }
        />
         <Route
          path="/product-details/:id"
          element={
            <GuardedRoute redirectPath={'/login-admin'}
            auth={admin?.isAdmin}>
             <ProductDetails />
            </GuardedRoute>
          }
        />
        <Route
          path="/order-details/:id"
          element={
            <GuardedRoute redirectPath={'/login-admin'}
            auth={admin?.isAdmin}>
             <OrderDetails />
            </GuardedRoute>
          }
        />
         <Route
          path="/addProduct"
          element={
            <GuardedRoute redirectPath={'/login-admin'}
            auth={admin?.isAdmin}>
             <AddProduct />
            </GuardedRoute>
          }
        />
        
         <Route
          path="/orders"
          element={
            <GuardedRoute redirectPath={'/login-admin'}
            auth={admin?.isAdmin}>
             <Orders />
            </GuardedRoute>
          }
        />

            
          </Routes>
        </Router>
      ) : null}
    </>
  )
}

export default App