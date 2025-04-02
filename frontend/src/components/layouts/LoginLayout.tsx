import Header from 'components/template/Header'
import React from 'react'
import { Outlet } from 'react-router'

type Props = {}

const LoginLayout = (props: Props) => {
  return (
    <div className='grid place-content-center flex-1 bg-emerald-100'>
      <Outlet />
    </div>
  )
}

export default LoginLayout