import UserListItem from 'components/template/Elements/Admin/UserListItem'
import useAdminStore from 'hooks/stores/useAdminStore'
import { useEffect } from 'react'

type Props = {}


const AdminUsers = (props: Props) => {
  const { users, fetchUsers } = useAdminStore()
  useEffect(() => {
    fetchUsers(users || [])
  }, [])
  return (
    <div>
      {users?.map(u => <UserListItem user={u} key={u?.lastName} />)}
    </div>
  )
}

export default AdminUsers