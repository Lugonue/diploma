import mockProducts from '@/mocks/Products'
import { Button } from 'components/ui/button'
import { Separator } from 'components/ui/separator'
import { ProductInCart } from '../Product/ProducCard'

type Props = {}

const Cart = (props: Props) => {
    return (
        <div className='w-[25rem] flex flex-col gap-5'>
            <h2>Корзина</h2>
            <div className="flex flex-wrap gap-2">
                {mockProducts.map((p) => <ProductInCart key={p.id} {...p} />)}
            </div>
            <Separator className='mx-auto border-amber-500' />
            <h4>Итого {123}</h4>
            <Button>Перейти к оформлению</Button>
        </div>
    )
}

export default Cart