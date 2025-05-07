import mockOrders from '@/mocks/Orders'
import OrderItem from 'components/template/Elements/Orders/Order'
import React from 'react'

type Props = {}


const UserOrders = (props: Props) => {
  return (
    <div className='min-w-xs'>
      <h3 className='mb-2'>Мои заказы</h3>
      <div className="grid gap-2">
        {mockOrders && mockOrders.map((i) => <OrderItem key={i.id} {...i} />)}
      </div>
    </div>
  )
}

export default UserOrders