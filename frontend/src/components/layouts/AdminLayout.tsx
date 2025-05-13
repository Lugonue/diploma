import { Outlet } from 'react-router'

type Props = {}

const AdminLayout = (props: Props) => {
  return (
    <div className='grid place-content-center min-h-screen bg-white pb-[30rem]'>
      <Outlet />
    </div>
  )
}

export default AdminLayout