import useBCStore from '@/stores/useBCstore'
import React, { useEffect } from 'react'

type Props = {}

const Catalog = (props: Props) => {
    const { setBC } = useBCStore()

    useEffect(() => {
        setBC([{ link: '/', name: 'Главная' }, { link: '/catalog', name: 'Каталог' }])
    }, [])
    return (
        <div>Catalog</div>
    )
}

export default Catalog