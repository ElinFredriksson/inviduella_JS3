import React from 'react'
import { signInWithGoogle } from '../../store/features/auth/authSlice'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux'

const GoogleBtn = ({ setSubmitted }) => {

 const dispatch = useDispatch()

 const handleClick = async () => {
  dispatch(signInWithGoogle())
  setSubmitted(true)
 }

  return (
      <button type="button" onClick={handleClick} className="social_login_btn" >
        <FcGoogle />
      </button>
  )
}

export default GoogleBtn