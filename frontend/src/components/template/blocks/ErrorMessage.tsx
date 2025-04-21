import React from 'react'

type Props = {
    msg: string
}

const ErrorMessage = ({ msg }: Props) => {
    return (
        <div className='text-red-500 flex-1 border border-red-500 p-2 rounded grid place-content-center'>{msg}</div>
    )
}

export default ErrorMessage