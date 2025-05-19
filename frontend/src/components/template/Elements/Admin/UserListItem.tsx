import userApi from '@/api/endpoints/userApi'
import { User } from '@/types/User'
import UserForm from 'components/template/forms/UserForm'
import { getFIO } from 'components/template/Header'
import { Button } from 'components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog'
import useAdminStore from 'hooks/stores/useAdminStore'
import { Suspense, useState } from 'react'

type Props = {
    user: User['data']

}

const UserListItem = (props: Props) => {
    const {  fetchUsers } = useAdminStore()

    const [open, setOpen] = useState(false)
    return (
        <div className='border-t p-2 flex justify-between items-center'>
            <span>{getFIO(props.user)}</span>
            <div className="flex gap-2">
                <Button variant={'destructive'} onClick={() => { userApi.delUser(props.user?.id || 0); fetchUsers() }} >Удалить</Button>
                <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
                    <DialogTrigger><Button > Изменить</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Добавить новый товар</DialogTitle>
                        </DialogHeader>
                        <Suspense fallback={<div>Loading...</div>}>
                            <UserForm user={props.user} closeDialog={() => setOpen(false)} />
                        </Suspense>
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    )
}

export default UserListItem