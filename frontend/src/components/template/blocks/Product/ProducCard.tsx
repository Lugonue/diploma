import { Button } from 'components/ui/button'
import { Skeleton } from 'components/ui/skeleton'
import { Product } from 'hooks/stores/useProductStor'



export const ProductCard = ({ image_url, name, price, skeleton }: Partial<Product> & { skeleton?: boolean }) => {


    if (skeleton) {
        return <Skeleton className='w-[20rem] h-[20rem]' />
    }


    return (
        <div className='flex flex-col w-[30rem] relative'>
            <img src={image_url} width={300} className='rounded-lg' />
            <h4>{name}</h4>
            <p id='price'>{price}</p>
            <Button variant='outline-2' >Подробнее</Button>
        </div>
    )
}

export const ProductExtended = () => {

}