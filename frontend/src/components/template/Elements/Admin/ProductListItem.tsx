import { Button } from 'components/ui/button'
import { Product } from 'hooks/stores/useProductStor'

type Props = {
    product: Product
}

const ProductListItem = (props: Props) => {
    return (
        <div className='border-t p-2 flex justify-between items-center'>
            <span>{props.product.name}</span>
            <div className="flex gap-2">
                <Button variant={'destructive'} >Удалить</Button>
                <Button >Изменить</Button>
            </div>

        </div>
    )
}

export default ProductListItem