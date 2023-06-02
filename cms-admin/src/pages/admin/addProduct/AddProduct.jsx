import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../../store/features/products/productListSlice'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  
  const { admin } = useSelector(state => state.auth)
  // const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()
  

  useEffect(() => {
    if (!admin) {
      navigate('/login-admin')
    }
  }, [admin, navigate])

  const dispatch = useDispatch()
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    imageURL: '',
    description: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setProductData((product) => {
      return {
        ...product,
        [id]: value,
      }
    })
  }
  // +productData.price converts a string to a number, only reason why we are doing the data object
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      ...productData,
      price: +productData.price,
    }
    dispatch(addProduct(data))
    setProductData({
    name: '',
    price: '',
    imageURL: '',
    description: '',
  })
  }

  return (
    <div className="add_product_container">
      <form noValidate onSubmit={handleSubmit}>
        <h1>Add a new product</h1>
        <div className="add_product-details">
          <div className="input-box">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Product Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={productData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Product price:
              </label>
              <input
                type="text"
                inputMode="decimal"
                className="form-control"
                id="price"
                value={productData.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageURL" className="form-label">
                Image Url:
              </label>
              <input
                type="text"
                className="form-control"
                id="imageURL"
                value={productData.imageURL}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Product Description:
              </label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                value={productData.description}
                onChange={handleChange}
              />
            </div>
            <button>ADD PRODUCT</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
