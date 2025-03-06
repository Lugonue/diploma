import Button from 'components/atoms/button'

type Props = { id?: string }

const Header = (props: Props) => {
  console.log(props)
  return (
    <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <div className='flex items-center justify-between bg-gradient-to-l from-gray-200 to-gray-300 py-5 px-10 rounded '>
        <span className='text-primary-Light'> Название сайта</span>
        <Button color='primary' additionalClasses='rounded' > Заказать звонок</Button>
      </div>
    </header >
  )
}

export default Header