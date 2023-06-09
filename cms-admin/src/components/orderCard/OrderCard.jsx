import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  updateOrderStatus,
} from '../../store/features/orders/orderSlice'
import { MdModeEdit } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import OrderDetails from '../orderDetails/OrderDetails'

const OrderCard = ({ order }) => {
  // Corrected prop name
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editedStatus, setEditedStatus] = useState(order.status)

  const handleEdit = () => {
    if (isEditing) {
      // Save the edited values
      dispatch(
        updateOrderStatus({
          id: order.id, // Corrected variable name
          status: editedStatus,
        })
      )
    }

    setIsEditing(!isEditing)
  }

  const handleStatusChange = (e) => {
    setEditedStatus(e.target.value)
  }

  return (
    <div className="order_item">
      <div className="left_box">
        <div className="order-name">
          {isEditing ? (
            <select value={editedStatus} onChange={handleStatusChange}>
              <option className="pending" value="pending">
                Pending
              </option>
              <option className="inProgress" value="inProgress">
                In Progress
              </option>
              <option className="canceled" value="canceled">
                Canceled
              </option>
              <option className="completed" value="completed">
                Completed
              </option>
            </select>
          ) : (
            <>
              <h5>{order.status}</h5>

              {order.item.map((item, i) => (
                <div key={i}>
                  <Link className="link" to={`/order-details/${order.id}`}>
                    <img src={item.imageURL} alt={item.name} />
                    <p>Name: {item.name}</p>
                    <p>Price: {item.price} kr</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="right_box">
        <div className="order-description">
          <p>{order.name}</p>

          <div className="orderList-btns">
            <button className="edit-btn" onClick={handleEdit}>
              {isEditing ? <FaCheck /> : <MdModeEdit />} Edit Status
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard


