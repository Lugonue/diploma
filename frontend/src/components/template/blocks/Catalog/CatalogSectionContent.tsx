import productApi from '@/api/endpoints/product';
import mockProducts from '@/mocks/Products';
import PaginationUI from 'components/ui/navigations/PaginationUI';
import useProductStore, { PaginationType } from 'hooks/stores/useProductStor';
import { useEffect } from 'react';
import { ProductCard } from '../Product/ProducCard';
import Empty from '../Utils/Empty';


const getSkeletons = () => {
    return Array.from({ length: 6 }).map((_, i) => <ProductCard key={i} skeleton />)
}


const CatalogSectionContent = () => {
    const { productList, setProductList, setPagination, pagination, requestProductParams, setRequestProductParams } = useProductStore();

    useEffect(() => {

        const fetch = async () => {
            const { data } = await productApi.getAll(requestProductParams)

            setProductList(data.data || mockProducts)
            setPagination({ total: data.total, page: data.page, lastPage: data.lastPage })
        }
        fetch()
    }, [requestProductParams])

    window.scrollTo(0, 0)

    return (
        <>
            <section className='flex flex-wrap gap-10 justify-center'>
                {productList ? (productList?.length === 0 ? <Empty /> : productList?.map((p) => <ProductCard {...p} key={p.id} />)) : getSkeletons()}
                <PaginationUI totalCount={pagination.lastPage || 1} currentPage={Number(pagination.page)} onPageChange={(page: number) => setRequestProductParams({ ...requestProductParams, page: page })} />
            </section>
        </>
    )
}

export default CatalogSectionContent