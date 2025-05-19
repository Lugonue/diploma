import mockProducts from '@/mocks/Products';
import useProductStore from 'hooks/stores/useProductStor';
import { useEffect } from 'react';
import { ProductCard } from '../Product/ProducCard';
import Empty from '../Utils/Empty';
import productApi from '@/api/endpoints/product';
import useCatalogStore from 'hooks/stores/useCatalogStore';
import { useLocation, useNavigate, useParams } from 'react-router';


const getSkeletons = () => {
    return Array.from({ length: 6 }).map((_, i) => <ProductCard key={i} skeleton />)
}


const CatalogSectionContent = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const { productList, setProductList } = useProductStore();
    const { state: catalogState, setCurrentCategoryId } = useCatalogStore();

    useEffect(() => {

        if (searchParams.get('category')) {
            const params = Object.fromEntries(searchParams)
            setCurrentCategoryId(+params.category)
        }
        const fetch = async () => {
            const { data } = await productApi.getAll({ categoryId: catalogState.currentCategoryId || undefined })

            setProductList(data || mockProducts)
        }
        fetch()
    }, [catalogState.currentCategoryId])

    window.scrollTo(0, 0)

    return (
        <>
            <section className='flex flex-wrap gap-10 justify-center'>
                {productList ? (productList?.length === 0 ? <Empty /> : productList?.map((p) => <ProductCard {...p} />)) : getSkeletons()}
            </section>
        </>
    )
}

export default CatalogSectionContent