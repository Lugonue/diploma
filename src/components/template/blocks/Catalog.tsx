import Button from 'components/atoms/button'

type Props = {}

const Catalog = (props: Props) => {
    return (
        <div className='grid grid-cols-2 gap-2'>
            <div className="flex">
                <h4>Ортопедические товарыдля комфортной жизни</h4>
                <span>Стельки, бандажи, корректоры осанки, ортопедические подушки – всё, что нужно для здоровья и удобства. Доставка по всей России.</span>
                <Button color='primary' additionalClasses='rounded' > Смотреть каталог</Button>
            </div>

        </div>
    )
}

export default Catalog