import { User } from '@/types/User'
import Button from 'components/atoms/button'

type Props = { id?: string, user: User }

const Header = (props: Props) => {
  console.log(props)
  return (
    <header className="pt w-full">
      <div className='flex items-center justify-between bg-gradient-to-t from-gray-200 to-gray-300 py-5 px-10 rounded '>
        <span className='text-primary-100'> Название сайта</span>
        <span className='text-black'> {props.user.data.name}</span>
        <Button color='primary' additionalClasses='rounded' > Заказать звонок</Button>
      </div>
    </header >
  )
}

export default Header