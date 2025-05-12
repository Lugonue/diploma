import { Outlet } from 'react-router'

type Props = {}

const AdminLayout = (props: Props) => {
  return (
    <div className='grid place-content-center my-auto bg-white'>
      <Outlet />
    </div>
  )
}

export default AdminLayout