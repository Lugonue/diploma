import React from 'react'

type Props = {
    msg?: string
}

const Empty = ({ msg }: Props = { msg: 'Ничего не найдено' }) => {
    return (
        <>
            <div className='flex-1 grid place-content-center text-2xl'>{msg}</div>
        </>
    )
}

export default Empty