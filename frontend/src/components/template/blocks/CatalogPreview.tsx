import React from 'react'
import CatalogElement from './Catalog/CatalogElement'
import { Button } from 'components/ui/button'

type Props = {}

const CatalogPreview = (props: Props) => {
    const catalogItems = [
        {
            name: 'стельки',
            desctiptions: 'описание',
            img: 'https://via.placeholder.com/150'
        },
        {
            name: 'бандажи',
            desctiptions: 'описание',
            img: 'https://via.placeholder.com/150'
        },
        {
            name: 'корректоры',
            desctiptions: 'описание',
            img: 'https://via.placeholder.com/150'
        },
        {
            name: 'подушки',
            desctiptions: 'описание',
            img: 'https://www.belashoff.ru/image/cache/catalog/products/TC/tc-podushka-polu-puh-1000x1000.jpg'
        },
    ]
    return (
        <div className='flex flex-col gap-5 items-center flex-1 p-5'>
            <h3 className='font-bold'>Наш каталог</h3>
            <div className="flex gap-4">
                {catalogItems.map((item, index) => (
                    <CatalogElement key={index} {...item} />
                ))}
            </div>
            <Button>Смотреть весь ассортимент</Button>
        </div>
    )
}

export default CatalogPreview