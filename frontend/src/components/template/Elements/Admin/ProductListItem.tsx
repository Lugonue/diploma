import productApi from '@/api/endpoints/product'
import { Button } from 'components/ui/button'
import useAdminStore from 'hooks/stores/useAdminStore'
import { Product } from 'hooks/stores/useProductStor'

type Props = {
    product: Product
    openDialog?: () => void
}

const ProductListItem = (props: Props) => {
    const { fetchProducts } = useAdminStore();
    const onRemove = async () => {
        productApi.delete(props.product.id).then(() => fetchProducts())
    }
    return (
        <div className='border-t p-2 flex justify-between items-center'>
            <span>{props.product.name}</span>
            <div className="flex gap-2">
                <Button variant={'destructive'} onClick={() => { onRemove() }} >Удалить</Button>
                <Button onClick={() => { props.openDialog?.() }} >Изменить</Button>
            </div>
        </div>
    )
}

export default ProductListItem