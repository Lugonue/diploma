import { Card, CardContent } from 'components/ui/card'
import { Category } from 'hooks/stores/useCatalogStore'
import useProductStore from 'hooks/stores/useProductStor'
import React from 'react'
import { useNavigate } from 'react-router'



const CatalogElement = ({ name, id }: Category) => {
    const { setRequestProductParams, requestProductParams } = useProductStore()
    const navigator = useNavigate()
    return (
        <Card className='hover:scale-105 transition-transform cursor-pointer'>
            <CardContent className="flex flex-col gap-3 lg:w-[200px] min-h-[200px] " onClick={() => { setRequestProductParams({ ...requestProductParams, categoryId: id }); navigator(`/catalog`) }}>
                <span className="text-l font-bold p-2 bg-secondary rounded text-center">{name}</span>
                {/* <p className='text-sm text-gray-400'>{}</p> */}
            </CardContent>
        </Card >
    )
}

export default CatalogElement