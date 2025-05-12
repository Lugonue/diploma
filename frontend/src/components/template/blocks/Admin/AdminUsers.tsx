import adminApi from '@/api/endpoints/adminApi'
import { User } from '@/types/User'
import UserListItem from 'components/template/Elements/Admin/UserListItem'
import React, { useEffect, useState } from 'react'

type Props = {}

const AdminUsers = (props: Props) => {
  const [users, setUsers] = useState<User['data'][]>([])
  useEffect(() => {
    const fetch = async () => {
      if (users.length) return
      const { data } = await adminApi.getAllUsers()
      setUsers(data)
    }
    fetch()
  })
  return (
    <div>
      {users.map(u => <UserListItem user={u} key={u?.lastName} />)}
    </div>
  )
}

export default AdminUsers