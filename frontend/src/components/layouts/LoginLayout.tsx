import React from 'react'
import { Outlet } from 'react-router'

type Props = {}

const LoginLayout = (props: Props) => {
  return (
    <div className='grid place-content-center w-screen h-screen bg-emerald-100'>
      <Outlet />
    </div>
  )
}

export default LoginLayout