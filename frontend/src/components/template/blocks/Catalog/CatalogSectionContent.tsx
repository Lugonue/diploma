import productApi from '@/api/endpoints/product';
import useProductStore, { Product } from 'hooks/stores/useProductStor';
import { useEffect } from 'react';
import { ProductCard } from '../Product/ProducCard';
import Empty from '../Utils/Empty';


const getSkeletons = () => {
    return Array.from({ length: 6 }).map((_, i) => <ProductCard key={i} skeleton />)
}


const CatalogSectionContent = () => {
    const { productList, setProductList } = useProductStore();
    useEffect(() => {
        const fetch = async () => {
            // const { data } = await productApi.getAll()
            const data: Product =
            {
                id: 0,
                name: 'name',
                brand: 'brand',
                price: 10000,
                category: {
                    id: 1,
                    name: 'name',
                    products: []
                },
                number_of_purchases: 10000,
                description: 'description',
                type: {
                    id: 1,
                    name: 'string',
                    products: ['string'],
                },
                color: 'color',
                image_url: '/img/logo.png'
            }

            setProductList(Array.from({ length: 6 }).fill(data) as Product[])
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