import userApi from '@/api/endpoints/userApi'
import OrderItem from 'components/template/Elements/Orders/Order'
import useUserStore from 'hooks/stores/useUserStore'
import { useEffect } from 'react'

type Props = {}


const UserOrders = (props: Props) => {
  const { setOrders, userOrders } = useUserStore()
  useEffect(() => {
    const fetch = async () => {
      const { data } = await userApi.getOrders()
      setOrders(data || [])
    }
    if (!userOrders.length) {
      fetch()
    }
  }, [])
  return (
    <div className='min-w-xs'>
      <h3 className='mb-2'>Мои заказы</h3>
      <div className="grid gap-2">
        {userOrders.map((i) => <OrderItem key={i.id} {...i} />)}
      </div>
    </div>
  )
}

export default UserOrders