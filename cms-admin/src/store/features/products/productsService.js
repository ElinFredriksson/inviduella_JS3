import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../../../firebase/config'

const createProduct = async (productData) => {
  const collectionRef = collection(db, 'products')
  const docRef = await addDoc(collectionRef, productData)

  if (!docRef.id) throw new Error('Something went wrong')

  console.log(docRef)
  return { id: docRef.id, ...productData }
}

const getAllAsync = async (col) => {
  const colRef = collection(db, col)
  const querySnapshot = await getDocs(colRef)

  const products = []
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() })
  })

  return products
}

const updateProduct = async (productData) => {
  const { id, ...data } = productData
  const productRef = doc(db, 'products', id)

  await updateDoc(productRef, data)
}

const deleteProduct = async (productId) => {
  const productRef = doc(db, 'products', productId)
  await deleteDoc(productRef)
}

const productService = {
  createProduct,
  getAllAsync,
  deleteProduct,
  updateProduct,
}

export default productService

// import { db } from "../../../firebase/config"
// import { addDoc, collection, getDocs, getDoc } from 'firebase/firestore';

// const createProduct = async (productData) => {
//     const collectionRef = collection(db, 'products')
//     const docRef = await addDoc(collectionRef, productData)

//     if(!docRef.id) throw new Error('Something went wrong')

//     console.log(docRef)
//     return {id: docRef.id, ...productData}

// }

// const getAllAsync = async (col) => {
//     const colRef = collection(db, col )
//     const querySnapshot = await getDocs(colRef)

//     const products = []
//     querySnapshot.forEach(doc => {
//         products.push({id: doc.id, ...doc.data()})
//     })

//     return products
// }

// const productService = {
//     createProduct,
//     getAllAsync

// }

// export default productService
