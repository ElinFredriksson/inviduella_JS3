import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../../store/features/orders/orderSlice'
import OrderCard from '../../../components/orderCard/OrderCard'
import { useNavigate } from 'react-router-dom'


const Orders = () => {
  const { admin } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!admin){
      navigate('/login-admin')
    }
    dispatch(getOrders())
  }, [admin, dispatch, navigate])

  const { orders, loading, error } = useSelector((state) => state.orders)

  return (
    <div className="order_container">
      <h2 className="order-title">All Orders</h2>
      <div className="order-collection">
        {orders.map((order, i) => (
          <OrderCard
            key={i}
            order={order}
          />
        ))}
      </div>
    </div>
  )
}

export default Orders