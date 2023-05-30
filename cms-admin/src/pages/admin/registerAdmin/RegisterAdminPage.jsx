import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  registerAdminUser,
  setError,
} from '../../../store/features/auth/authSlice'
import GoogleBtn from '../../../components/googleBtn/GoogleBtn'

const RegisterAdminPage = () => {
  const { admin, loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((data) => ({ ...data, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.passwordConfirm) {
      dispatch(setError('Passwords do not match'))
      return
    }
    await dispatch(registerAdminUser(formData))
    setSubmitted(true)
  }

  useEffect(() => {
    if (submitted && admin ) {
      navigate('/admin-panel')
    }
  }, [submitted, admin, navigate])

  return (
    <div className="login_sign_container">
      <section className="login-wrap">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="login_container">
            <h2>Register as an Administrator</h2>
          </div>
          {error && <p className="error">{error}</p>}
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

              <label htmlFor="passwordConfirm">
                Confirm Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="passwordConfirm"
                className="form-control"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}

          <button type="submit" className="submit-btn">
            Login
          </button>
          <div className="social_login">
            <h3>Register with Google</h3>
            <GoogleBtn setSubmitted={setSubmitted} />
          </div>
          <div className="terms">
            <p>
              Already an administrator? /{' '}
              <Link to="/login-admin">Login here</Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  )
}

export default RegisterAdminPage

// import { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import {
//   registerAdminUser,
//   setError,
// } from '../../../store/features/auth/authSlice'
// import GoogleBtn from '../../../components/loginForm/GoogleBtn'

// const registerAdminPage = () => {
//   const { user, loading, error } = useSelector(state => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [submitted, setSubmitted] = useState(false)
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     passwordConfirm: '',
//   })

//   const handleChange = (e) => {
//     const { id, value } = e.target
//     setFormData((data) => ({ ...data, [id]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (formData.password !== formData.passwordConfirm) {
//       dispatch(setError('Passwords do not match'))
//       return
//     }
//     await dispatch(registerAdminUser(formData))
//     setSubmitted(true)
//   }

//   // useEffect(() => {
//   //   if (submitted && user) {
//   //     navigate('/admin-panel')
//   //   }
//   // }, [submitted, user, navigate])

//   useEffect(() => {
//     if (submitted && user && user.isAdmin) {
//       navigate('/admin-panel')
//     }
//   }, [submitted, user, navigate])

//   return (
//     <div className="login_sign_container">
//       <section className="login-wrap">
//         <form onSubmit={handleSubmit} className="contact-form">
//           <div className="login_container">
//             <h2>Register as an Administrator</h2>
//           </div>
//           {error && <p className="error">{error}</p>}
//           <div className="user-details">
//             <div className="input-box">
//               <label htmlFor="email">
//                 Your Email <span className="required">*</span>
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />

//               <label htmlFor="password">
//                 Password <span className="required">*</span>
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />

//               <label htmlFor="passwordConfirm">
//                 Confirm Password <span className="required">*</span>
//               </label>
//               <input
//                 type="password"
//                 id="passwordConfirm"
//                 className="form-control"
//                 value={formData.passwordConfirm}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           {loading && <p>Loading...</p>}
//           {error && <p>{error}</p>}

//           <button type="submit" className="submit-btn">
//             Login
//           </button>
//           <div className="social_login">
//             <h3>Register with Google</h3>
//             <GoogleBtn setSubmitted={setSubmitted} />
//           </div>
//           <div className="terms">
//             <p>
//               Already administrator? / <Link to="/login-admin">Login here</Link>
//             </p>
//           </div>
//         </form>
//       </section>
//     </div>
//   )
// }

// export default registerAdminPage
