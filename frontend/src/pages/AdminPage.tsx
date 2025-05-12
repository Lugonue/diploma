import AdminProducts from 'components/template/blocks/Admin/AdminProducts'
import AdminUsers from 'components/template/blocks/Admin/AdminUsers'
import { Card, CardContent, CardHeader } from 'components/ui/card'
import TabsUI, { TabsContentType, TabsTriggerType } from 'components/ui/navigations/TabsUI'
import useBCStore from 'hooks/stores/useBCstore'
import React, { useEffect } from 'react'

type Props = {}

const AdminPage = (props: Props) => {

    const { setBC } = useBCStore()

    useEffect(() => {
        setBC([{ link: '/', name: 'Главная' }, { link: '/admin', name: 'Панель администратора' }])
    }, [])

    const tabs: TabsTriggerType[] = [
        {
            key: 'users',
            label: 'Пользователи'
        },
        {
            key: 'products',
            label: 'Товары'
        },
    ]
    const tabsContents: TabsContentType[] = [
        {
            key: 'users',
            contents: <AdminUsers />
        },
        {
            key: 'products',
            contents: <AdminProducts />
        },
    ]

    return (
        <div className="flex-1 grid place-content-center my-10">
            <Card>
                <CardHeader>
                    <h2>Панель Администратора</h2>
                </CardHeader>
                <CardContent>
                    <div className="w-[30rem] rounded-2xl flex flex-col">
                        <TabsUI tabsTriggers={tabs} defaultValue='users' tabsContents={tabsContents} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminPage