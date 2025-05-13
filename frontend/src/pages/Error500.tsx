import React from 'react'

type Props = {}

const Error500 = (props: Props) => {
  return (
    <div className="flex-1 w-full flex items-center justify-center  ">
      <div className='text-2xl text-red-700 bg-red-300 p-10 rounded-2xl'>Ошибка сервера!</div>

    </div>
  )
}

export default Error500