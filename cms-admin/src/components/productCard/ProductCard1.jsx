// import React from 'react'
// import '../../pages/products/Products.module.scss'
// import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { BsTrash, BsPencilSquare } from 'react-icons/bs'

// const ProductCard = ({ product }) => {
//   const dispatch = useDispatch()

//   return (
//     <div>
//       <div className="product_item">
//         <Link className='link' to={`/product-details/${product.id}`}>
//           <div className="product_img">
//             <img src={product.imageURL} alt={product.name} />
//           </div>

//           <div className="product-name">
//             <h5>{product.name}</h5>
//           </div>

//           {/* <div className="product-description">
//             <h5>{product.description}</h5>
//           </div> */}
//           <div className='product-price'>
//             <span>{product.price} kr</span>
//           </div>
//           </Link>

//           <div className='productList-btns'>
//             <button className='edit-btn'> <BsPencilSquare /> </button>
            
//             <button className='delete-btn'> <BsTrash /> </button>
//           </div>
//       </div>
//   </div>
//   )
// }

// export default ProductCard