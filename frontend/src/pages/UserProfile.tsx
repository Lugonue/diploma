import useBCStore from '@/stores/useBCstore'
import UserInfo from 'components/template/blocks/User/UserInfo'
import UserOrders from 'components/template/blocks/User/UserOrders'
import { Separator } from 'components/ui/separator'
import React, { useEffect } from 'react'

type Props = {}

const UserProfile = (props: Props) => {

    const { setBC } = useBCStore()

    useEffect(() => {
        setBC([{ link: '/', name: 'Главная' }, { link: '/profile', name: 'Профиль' }])
    }, [])

    return (
        <div className="flex-1 bg-secondary/50 rounded-2xl p-5 flex ">
            <UserInfo />
            <Separator orientation="vertical" className='mx-auto border-amber-500' />
            <UserOrders />
        </div>
    )
}

export default UserProfile