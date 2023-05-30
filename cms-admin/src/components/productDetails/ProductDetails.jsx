import React from 'react'
import useDoc from '../../hooks/useDoc'
import { Link, useParams } from 'react-router-dom'
import Loader from '../loader/Loader'

const Details = () => {

  const { id } = useParams()
  const { data, error, loading } = useDoc('products', id)

  if(!data) return (
    <div>
      { loading && <Loader />}
      { error && <p>{error}</p>}
    </div>
  )

  return (
    <div className='details_container'>
          <div className="product_picture">
            <img src={data.imageURL} alt={data.name} />
          </div>
          <div className="right">
            <h2>{data.name}</h2>
            <h4 className="product_description">
              Description:  {data.description}
            </h4> 

            <p>{data.price} SEK</p>
              <Link to={`/admin-panel`}>
                <button className='btn-back'>Back to Admin-panel</button>
              </Link>
          </div>
    </div>
  )
}

export default Details