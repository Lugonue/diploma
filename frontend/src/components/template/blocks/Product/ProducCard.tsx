import { Button } from 'components/ui/button'
import { Card, CardContent } from 'components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { Skeleton } from 'components/ui/skeleton'
import { Product } from 'hooks/stores/useProductStor'
import { ImgCarousel } from '../ActionsCarousel'



export const ProductCard = ({ image_url, name, price, skeleton, description }: Partial<Product> & { skeleton?: boolean }) => {


    if (skeleton) {
        return <Skeleton className='w-[15rem] h-[20rem]' />
    }


    return (
        <div className='flex flex-col w-[15rem] relative'>
            <img src={image_url} width={300} height={200} className='rounded-lg' />
            <h4>{name}</h4>
            <p id='price'>{price}</p>
            <div className="flex">
                <Popover>
                    <PopoverTrigger><Button variant='outline-2' >Подробнее</Button></PopoverTrigger>
                    <PopoverContent className='w-auto'><ProductExtended image_url={image_url} name={name} description={description} /></PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

const ProductExtended = ({ image_url, name, description }: Partial<Product>) => {
    return (
        <div className="flex flex-col items-center w-[15rem] mx-10 gap-5">
            <ImgCarousel imgWidth={200} imgs={Array.from({ length: 10 }).fill('/img/logo.png') as string[]} />
            <div className="flex flex-col gap-1 rounded bg-secondary w-full p-3">
                <h4>{name}</h4>
                <p className='line-clamp-6 text-gray-600 leading-5'>{description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae cum eaque nostrum aut voluptatem architecto porro, cupiditate veniam accusantium dolorum provident nulla sit incidunt magni a dolorem natus omnis corrupti.</p>
            </div>
            <Button className='rounded-2xl' >Добавить в корзину</Button>
        </div>
    )
}