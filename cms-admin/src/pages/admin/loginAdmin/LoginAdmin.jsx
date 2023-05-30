import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginAdminUser,
  setError,
} from '../../../store/features/auth/authSlice'

import GoogleBtn from '../../../components/googleBtn/GoogleBtn'

const LoginAdmin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { admin, loading, error } = useSelector((state) => state.auth)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((data) => ({ ...data, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(loginAdminUser(formData))
    setSubmitted(true)
  }

  useEffect(() => {
    if (submitted && admin) {
      navigate('/admin-panel')
    }
  }, [submitted, admin, navigate])

  return (
    <div className="login_sign_container">
      <section className="login-wrap">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="login_container">
            <h2>Administrator login</h2>
          </div>
          <div className="user-details">
            <div className="input-box">
              <label htmlFor="email">
                Your Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          <button type="submit" className="submit-btn">
            Login
          </button>
          <div className="social_login">
            <h3>Login with Google</h3>
            <GoogleBtn setSubmitted={setSubmitted} />
          </div>
          <div className="terms">
            <p>
              You don't have an account? /{' '}
              <Link to="/register-admin">Register here</Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  )
}

export default LoginAdmin
