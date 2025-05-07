import { cn } from '@/lib/utils'
import { Button } from 'components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { format } from 'date-fns'
import { Order, OrderStatus } from 'hooks/stores/useOrderStore'
import React from 'react'

type Props = {}

export const getStatusClasses = (status: OrderStatus) => {
    switch (status) {
        case 'Новый':
            return 'text-primary font-semibold'
        case 'В обработке':
            return 'text-yellow-400'
        case 'Отправлен':
            return 'text-violet-400'
        case 'Завершен':
            return 'text-green-400'
        case 'Отменен':
            return 'text-red-400'
        default:
            return ''

    }
}

const OrderItem = (props: Order) => {

    return (
        <div className='border-t p-2 flex justify-between items-center'>
            <span className='text-sm'>{`Заказ от ${format(new Date(props.createdAt), 'dd.MM.yyyy')}`}</span>
            <span className={cn(getStatusClasses(props.status))}>{`${props.status}`}</span>
            <div className="flex">
                <Popover>
                    <PopoverTrigger><Button variant={'outline-2'}>Подробности</Button></PopoverTrigger>
                    <PopoverContent className='w-auto'><OrderExtended {...props} /></PopoverContent>
                </Popover>
            </div>
        </div>
    )
}


const OrderExtended = (props: Order) => {
    return (
        <div className='w-[30rem]'>

        </div>
    )
}

export default OrderItem