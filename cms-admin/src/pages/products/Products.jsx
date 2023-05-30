import ProductCard from '../../components/productCard/ProductCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../store/features/products/productListSlice'
// import Loader from '../../components/loader/Loader'

const Products = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const { products, loading, error } = useSelector(state => state.productList)

  return (
    <div className='products_container'>
        <h2 className="products-title">All our products</h2>

        <div className="products-collection">
           
            {
              products.map(product => <ProductCard key={product.id} product={product} />) 
            }
            
            
        </div>
    </div>
  )
}

export default Products