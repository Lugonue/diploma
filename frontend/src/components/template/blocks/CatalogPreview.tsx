import React, { useEffect } from 'react'
import CatalogElement from './Catalog/CatalogElement'
import { Button } from 'components/ui/button'
import { useNavigate } from 'react-router'
import catalogApi from '@/api/endpoints/catalogApi'
import { Category } from 'hooks/stores/useCatalogStore'

type Props = {}

const CatalogPreview = (props: Props) => {
    const [categories, setCategories] = React.useState<Category[]>([])
    const navigator = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            const { data } = await catalogApi.getCategories()
            setCategories(data.slice(0, 4))
        }
        fetch()
    }, [])
    return (
        <div className='flex flex-col gap-5 items-center flex-1 p-5'>
            <h3 className='font-bold'>Наш каталог</h3>
            <div className="flex gap-4">
                {categories && categories.map((item, index) => (
                    <CatalogElement key={index} {...item} />
                ))}
            </div>
            <Button onClick={() => { navigator('/catalog') }}> Смотреть весь ассортимент</Button>
        </div>
    )
}

export default CatalogPreview