import mockProducts from '@/mocks/Products';
import useProductStore from 'hooks/stores/useProductStor';
import { useEffect } from 'react';
import { ProductCard } from '../Product/ProducCard';
import Empty from '../Utils/Empty';
import productApi from '@/api/endpoints/product';


const getSkeletons = () => {
    return Array.from({ length: 6 }).map((_, i) => <ProductCard key={i} skeleton />)
}


const CatalogSectionContent = () => {
    const { productList, setProductList } = useProductStore();
    useEffect(() => {
        const fetch = async () => {
            const { data } = await productApi.getAll()

            setProductList(data || mockProducts)
        }
        if (!productList) {
            fetch()
        }
    }, [])

    return (
        <>
            <section className='flex flex-wrap gap-10 justify-center'>
                {productList ? (productList?.length === 0 ? <Empty /> : productList?.map((p) => <ProductCard {...p} />)) : getSkeletons()}
            </section>
        </>
    )
}

export default CatalogSectionContent