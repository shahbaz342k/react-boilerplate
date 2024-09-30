import React, { useEffect } from 'react'
import Login  from './Login'

const Logout = () => {

    useEffect(() => {
        localStorage.clear();
    })
  return (
    <>
        <Login />
    </>
  )
}

export default Logout