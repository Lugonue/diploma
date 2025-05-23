import OrderForm from 'components/template/forms/OrderForm'
import { Card, CardContent, CardHeader } from 'components/ui/card'
import useBCStore from 'hooks/stores/useBCstore'
import React, { useEffect } from 'react'

type Props = {}

const Order = (props: Props) => {
  const { setBC } = useBCStore()


  useEffect(() => {
    setBC([{ link: '/', name: 'Главная' }, { link: '/profile', name: 'Профиль' }, { link: '/profile/order', name: 'Оформление заказа' }])
  }, [])


  return (
    <div className='flex-1 flex justify-center gap-10 my-10'>
      <Card>
        <CardHeader>
          <h2>Оформление заказа</h2>
        </CardHeader>
        <CardContent>
          <div className="w-[30rem] rounded-2xl flex flex-col">
            <OrderForm />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Order