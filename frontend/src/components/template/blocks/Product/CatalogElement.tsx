import { Card, CardContent } from 'components/ui/card'
import React from 'react'

type Props = {
    id?: number
    name?: string
    desctiptions?: string
    img?: string
}

const CatalogElement = ({ name, desctiptions, img }: Props) => {
    return (
        <Card className='hover:scale-105 transition-transform cursor-pointer'>
            <CardContent className="flex flex-col gap-3 lg:w-[200px] ">
                <span className="text-l font-bold p-2 bg-secondary rounded text-center">{name}</span>
                <p className='text-sm text-gray-400'>{desctiptions}</p>
                <img width={200} src={img} alt="" />
            </CardContent>
        </Card>
    )
}

export default CatalogElement