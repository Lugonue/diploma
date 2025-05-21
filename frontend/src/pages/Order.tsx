import OrderForm from 'components/template/forms/OrderForm'
import { Card, CardContent, CardHeader } from 'components/ui/card'
import React from 'react'

type Props = {}

const Order = (props: Props) => {
  return (
    <div>
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