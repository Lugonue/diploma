import { User } from '@/types/User'
import { getFIO } from 'components/template/Header'
import { Button } from 'components/ui/button'

type Props = {
    user: User['data']
}

const UserListItem = (props: Props) => {
    return (
        <div className='border-t p-2 flex justify-between items-center'>
            <span>{getFIO(props.user)}</span>
            <div className="flex gap-2">
                <Button variant={'destructive'} >Удалить</Button>
                <Button >Изменить</Button>
            </div>

        </div>
    )
}

export default UserListItem