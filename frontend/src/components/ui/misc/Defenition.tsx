import React, { useState } from 'react'
import { Button } from '../button';
import { Input } from '../input';
import useUserStore from 'hooks/stores/useUserStore';
import { User } from '@/types/User';

type Props = {
    title: string;
    value: string | unknown[]
    field: string
}

const Defenition = ({ title, value, field }: Props) => {
    const { userForm, setUserForm } = useUserStore();
    const [input, setInput] = useState<boolean>(false)
    const setValue = (value: string) => {
        setUserForm({ [field]: value })
    }
    return (
        <div className="flex gap-4  min-h-[60px] bg-secondary/50 rounded-2xl p-2 pt-1">
            <dl className='flex flex-col w-5/6'>
                <dt className='font-semibold text-sm'>{title}</dt>
                <dd className='text-sm text-gray-500 line-clamp-1 '>{input ? <Input className='h-6 p-0' autoFocus value={userForm![field as keyof User['data']]} onChange={(e) => setValue(e.target.value)} /> : <span>{Array.isArray(value) ? value.join(', ') : value}</span>}</dd>
            </dl>
            <div className="grid place-content-center">
                <Button className='rounded-2xl' variant={input ? 'danger-outline' : 'default'} onClick={() => { setInput(!input); setUserForm({ [field]: value }) }}>{input ? 'Отменить' : 'Изменить'}</Button>
            </div>

        </div >

    )
}

export default Defenition