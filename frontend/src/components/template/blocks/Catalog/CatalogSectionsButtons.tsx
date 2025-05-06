import catalogApi from '@/api/endpoints/catalogApi';
import { Button } from 'components/ui/button';
import { Skeleton } from 'components/ui/skeleton';
import useCatalogtore from 'hooks/stores/useCatalogtore';
import { useEffect } from 'react';

type Props = {}
const skeleton = () => {
    const arr = new Array(10).fill(1)
    return (
        <>
            {arr.map((_, i) => (
                <Skeleton key={i} className="w-[100px] h-[36px] " />
            ))}
        </>
    )
}

const CatalogSectionsButtons = (props: Props) => {
    const { categories, setCategories, state, setCurrentCategoryId } = useCatalogtore();
    useEffect(() => {
        const fetch = async () => {
            const { data } = await catalogApi.getCategories()
            setCategories(data)
        }
        if (!categories) {
            fetch()
        }
        if (!state.currentCategoryId && categories) {
            setCurrentCategoryId(categories[0]?.id)
        }

    }, [categories])
    const getCN = (id: number) => `rounded-2xl bg-white ${id === state.currentCategoryId ? ' bg-accent text-white' : ''}`

    return (
        <div className='flex justify-center gap-4 w-full overflow-auto'>
            {categories ? categories.map((cat) => {
                return <Button className={getCN(cat.id)} variant='outline-2' key={cat.id} onClick={() => setCurrentCategoryId(cat.id)}> {cat.name}</Button>
            }) : skeleton()}
        </div>
    )
}

export default CatalogSectionsButtons