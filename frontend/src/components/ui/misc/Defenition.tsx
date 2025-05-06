import React from 'react'

type Props = {
    title: string;
    value: string | unknown[]
}

const Defenition = ({ title, value }: Props) => {
    return (
        <dl className='flex'>
            <dt className='font-semibold'>{title}</dt>
            <span className='border-b border-emerald-300 min-w-5'></span>
            <dd className='text-wrap break-all'>{Array.isArray(value) ? value.join(', ') : value}</dd>
        </dl>
    )
}

export default Defenition