import CatalogSectionContent from 'components/template/blocks/Catalog/CatalogSectionContent'
import CatalogSectionsButtons from 'components/template/blocks/Catalog/CatalogSectionsButtons'
import useBCStore from 'hooks/stores/useBCstore'
import { useEffect } from 'react'

type Props = {}

const Catalog = (props: Props) => {
    const { setBC } = useBCStore()

    useEffect(() => {
        setBC([{ link: '/', name: 'Главная' }, { link: '/catalog', name: 'Каталог' }])
    }, [])
    return (
        <div className='flex flex-col gap-5 py-10'>
            <CatalogSectionsButtons />
            <h2 className='text-center'>Наш каталог</h2>
            <CatalogSectionContent />
        </div>
    )
}

export default Catalog