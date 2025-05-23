import { Button } from 'components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { Skeleton } from 'components/ui/skeleton'
import { Product } from 'hooks/stores/useProductStor'
import { ImgCarousel } from '../ActionsCarousel'
import useUserStore from 'hooks/stores/useUserStore'
import { toast } from 'sonner'
import { Checkbox } from 'components/ui/checkbox'
import { cn } from '@/lib/utils'



export const ProductCard = ({ imageUrl, name, price, skeleton, description, ...props }: Product & { skeleton?: boolean }) => {

    if (skeleton) {
        return <Skeleton className='w-[15rem] h-[20rem]' />
    }
    return (
        <div className='flex flex-col w-[15rem] relative'>
            {/* <img src={image_url} width={300} height={200} className='rounded-lg' /> */}
            <div className='w-full aspect-square rounded-lg' style={{ background: `center/cover url(${imageUrl})` }}></div>

            <h4>{name}</h4>
            <p id='price'>{price}</p>
            <div className="flex">
                <Popover>
                    <PopoverTrigger><Button variant='outline-2' >Подробнее</Button></PopoverTrigger>
                    <PopoverContent className='w-auto'><ProductExtended {...{ imageUrl, price, name, description, ...props }} /></PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

const ProductExtended = ({ imageUrl, name, description, ...props }: Product) => {
    const { updateCart, userCart } = useUserStore();
    const onAddProduct = () => {
        updateCart('addOne', { imageUrl, name, description, ...props })
        toast.success('Товар добавлен в корзину')
    };
    return (
        <div className="flex flex-col items-center w-[15rem] mx-10 gap-5">
            <ImgCarousel imgWidth={200} imgs={Array.from({ length: 10 }).fill(imageUrl) as string[]} />
            <div className="flex flex-col gap-1 rounded bg-secondary w-full p-3">
                <h4>{name}</h4>
                <p className='line-clamp-6 text-gray-600 leading-5' dangerouslySetInnerHTML={{ __html: description as string }}></p>
            </div>
            <Button disabled={userCart.some(p => p.name === name)} className='rounded-2xl' onClick={() => onAddProduct()}>{userCart.some(p => p.name === name) ? 'В корзине' : 'Добавить в корзину'}</Button>
        </div>
    )
}

type ProductInCartProps = Product &
{
    orderType?: boolean, inOrder?: any, onPick?: (id: number) => void, onRemove?: (id: number) => void, onQuantityChange?: (id: number, quantity: number) => void
}
export const ProductInCart = ({ name, price, imageUrl, id, orderType, inOrder, onPick, onRemove }: ProductInCartProps) => {
    const { updateCart, userCart } = useUserStore();

    return (
        <div className={cn(["flex justify-between w-[12rem] gap-2", orderType && 'w-full'])}>
            <div className="grid relative">
                <img src={imageUrl} alt="" width={50} />
                {orderType &&
                    <div className="absolute bottom-0 left-0">
                        <Checkbox checked={inOrder} onCheckedChange={(checked) => {
                            if (checked) {
                                onPick!(id)
                            } else {
                                onRemove!(id)
                            }
                        }} id="terms1" />
                    </div>
                }
            </div>
            <div className="grid">
                <span className={cn(['text-sm line-clamp-1', orderType && 'line-clamp-5'])}>{name}</span>
                <span className='text-xs'>{price}</span>
            </div>
            <div className="grid" >
                {orderType ? <div></div> : <Button variant={'ghost'} onClick={() => updateCart('removeOne', id)} >X</Button>}
            </div>
        </div>
    )
}