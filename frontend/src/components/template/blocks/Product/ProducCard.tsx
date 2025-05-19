import { Button } from 'components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { Skeleton } from 'components/ui/skeleton'
import { Product } from 'hooks/stores/useProductStor'
import { ImgCarousel } from '../ActionsCarousel'



export const ProductCard = ({ imageUrl, name, price, skeleton, description }: Partial<Product> & { skeleton?: boolean }) => {

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
                    <PopoverContent className='w-auto'><ProductExtended imageUrl={imageUrl} name={name} description={description} /></PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

const ProductExtended = ({ imageUrl, name, description }: Partial<Product>) => {
    return (
        <div className="flex flex-col items-center w-[15rem] mx-10 gap-5">
            <ImgCarousel imgWidth={200} imgs={Array.from({ length: 10 }).fill(imageUrl) as string[]} />
            <div className="flex flex-col gap-1 rounded bg-secondary w-full p-3">
                <h4>{name}</h4>
                <p className='line-clamp-6 text-gray-600 leading-5'>{description} </p>
            </div>
            <Button className='rounded-2xl' >Добавить в корзину</Button>
        </div>
    )
}

export const ProductInCart = ({ name, price, imageUrl }: Product) => {
    return (
        <div className="flex justify-between w-[12rem] gap-2">
            <div className="grid">
                <img src={imageUrl} alt="" width={50} />
            </div>
            <div className="grid">
                <span className='text-sm line-clamp-1'>{name}</span>
                <span className='text-xs'>{price}</span>
            </div>
            <div className="grid">
                <Button variant={'ghost'}>X</Button>
            </div>
        </div>
    )
}