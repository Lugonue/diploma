import React, { useState } from 'react'
import { Button } from '../button';
import { Input } from '../input';
import useUserStore from 'hooks/stores/useUserStore';
import { Phone, User } from '@/types/User';
import { Address } from '@/api/endpoints/auth';

type Props = {
    title?: string;
    value?: string | Phone[] | Address[] | number
    field?: string,
    index?: number,
    mode?: 'obj' | 'array'
    onChange?: (args: any) => void,
    arrayFieldName?: string // для отрисовки значения внутри массива, если есть
}

const Defenition = ({ title, value, field }: Props) => {
    const { userForm, user, setUserForm } = useUserStore();
    const [input, setInput] = useState<boolean>(false)
    const setValue = (value: string) => {
        setUserForm({ [field!]: value })
    }
    const onWriteOnePhone = (v: string, index: number) => {
        const newPhones: Phone[] = [...userForm?.phones || []]
        newPhones[index] = { number: v }
        setUserForm({ phones: newPhones })
    }
    const onWriteOneAddress = (v: string, index: number) => {
        const newAd: Address[] = [...userForm?.addresses || []]
        newAd[index] = { street: v }
        setUserForm({ addresses: newAd })
    }
    const onRm = (index: number) => {
        if (!field || !userForm) return console.error('no filed or userFOrm')
        const newData: any[] = [...userForm[field] || []]
        newData.splice(index, 1)
        setUserForm({ [field as string]: newData })
    }


    const getFormComponent = () => {
        switch (field) {
            case 'phones':
                return (
                    <div className="flex flex-col p-5 border rounded-2xl relative gap-2">
                        {userForm?.phones && userForm.phones.map((p, index) => {
                            return (
                                <>
                                    <div className="flex gap-2">
                                        <label htmlFor="">{`#${index}`}</label>
                                        <Input value={p.number} onChange={(e) => onWriteOnePhone(e.target.value, index)} />
                                        <Button onClick={() => onRm(index)} variant={'danger-outline'}>-</Button>
                                    </div >
                                </>
                            )
                        })
                        }
                        <Button onClick={() => setUserForm({ ...userForm, phones: [...userForm?.phones || [], { number: '' }] })}> Добавить</Button>
                    </div >
                )
            case 'addresses':
                return (
                    <div className="flex flex-col p-5 border rounded-2xl relative gap-2">
                        {userForm?.addresses && userForm.addresses.map((p, index) => {
                            return (
                                <>
                                    <div className="flex gap-2">
                                        <label htmlFor="">{`#${index}`}</label>
                                        <Input value={p.street} onChange={(e) => onWriteOneAddress(e.target.value, index)} />
                                        <Button onClick={() => onRm(index)} variant={'danger-outline'}>-</Button>
                                    </div >

                                </>
                            )
                        })
                        }
                        <Button onClick={() => setUserForm({ ...userForm, addresses: [...userForm?.addresses || [], { street: '' }] })}> Добавить</Button>
                    </div >
                )
            default:
                return <Input className='h-6 p-0' autoFocus value={userForm![field as keyof User['data']]} onChange={(e) => setValue(e.target.value)} />
        }
    }

    const getValue = () => {
        if (field === 'phones') {
            return (value as Phone[]).map(i => i.number).join(', ')
        }
        if (field === 'addresses') {
            return (value as Address[]).map(i => i.street).join(', ')
        }
        return Array.isArray(value) ? value.join(', ') : value
    }
    return (
        <div className="flex gap-4  min-h-[60px] bg-secondary/50 rounded-2xl p-2 pt-1">
            <dl className='flex flex-col w-5/6'>
                <dt className='font-semibold text-sm'>{title}</dt>
                <dd className='text-sm text-gray-500 line-clamp-1 '>{input ? <span className='flex flex-col gap-4'>{getFormComponent()}</span> : <span>{getValue()}</span>}</dd>
            </dl>
            <div className="grid place-content-center">
                <Button className='rounded-2xl' variant={input ? 'danger-outline' : 'default'} onClick={() => { setInput(!input); setUserForm({ [field as any]: value }) }}>{input ? 'Отменить' : 'Изменить'}</Button>
            </div>
        </div >
    )
}

export default Defenition