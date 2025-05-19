import { Button } from 'components/ui/button'
import { Separator } from 'components/ui/separator'
import { ProductInCart } from '../Product/ProducCard'
import useUserStore from 'hooks/stores/useUserStore'

type Props = {}

const Cart = (props: Props) => {
    const { updateCart, userCart } = useUserStore();

    return (
        <div className='w-[25rem] flex flex-col gap-5'>
            <h2>Корзина</h2>
            <div className="flex flex-wrap gap-2">
                {userCart && userCart.map((p) => <ProductInCart key={p.id} {...p} />)}
            </div>
            <Separator className='mx-auto border-amber-500' />
            <h4>Итого {userCart.reduce((acc, p) => acc + +p.price, 0)}</h4>
            <Button>Перейти к оформлению</Button>
        </div>
    )
}

export default Cart