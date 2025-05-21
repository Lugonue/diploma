import UserInfo from 'components/template/blocks/User/UserInfo'
import UserOrders from 'components/template/blocks/User/UserOrders'
import { Card, CardContent, CardHeader } from 'components/ui/card'
import { Separator } from 'components/ui/separator'
import useBCStore from 'hooks/stores/useBCstore'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

type Props = {}

const UserProfile = (props: Props) => {

    const { setBC } = useBCStore()

    useEffect(() => {
        setBC([{ link: '/', name: 'Главная' }, { link: '/profile', name: 'Профиль' }])
    }, [])

    return (
        <div className="flex-1 flex justify-center gap-10 my-10">
            <Card>
                <CardHeader>
                    <h2>Мой профиль</h2>
                </CardHeader>
                <CardContent>
                    <div className="w-[30rem] rounded-2xl flex flex-col">
                        <UserInfo />
                        <Separator orientation="vertical" className='mx-auto border-amber-500' />
                        <UserOrders />
                    </div>
                </CardContent>
            </Card>

            <Outlet />
           

        </div>
    )
}

export default UserProfile