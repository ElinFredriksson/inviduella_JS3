import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminPanel = () => {

  const { admin } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!admin) {
      navigate('/login-admin')
    }
  }, [admin, navigate])

  return (
    <div className="login_sign_container">
      <div className="login_container">
        <h2>Welcome to the Admin Panel</h2>
        {admin ? (
        <>
        <h3>{admin.email}</h3>
        </> 
        )
        :
        (<></>)
        }
        <div className="info_login"></div>
        <hr />
      </div>
    </div>
  )
}

export default AdminPanel

