import {
  doc,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore'
import { db } from '../../../firebase/config'

const updateOrder = async (orderData) => {
  const { id, status, ...data } = orderData
  const orderRef = doc(db, 'orders', id)

  await updateDoc(orderRef, { status, ...data })
}

const getAllAsync = async (col) => {
  const colRef = collection(db, col)
  const querySnapshot = await getDocs(colRef)

  const orders = []
  querySnapshot.forEach((doc) => {
    orders.push({ id: doc.id, ...doc.data() })
  })

  return orders
}

const orderService = {
  updateOrder,
  getAllAsync,
}

export default orderService
