import { cn } from '@/lib/utils'
import { User } from '@/types/User'
import { Button } from 'components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import useClickOutside from 'hooks/onClickOutside'
import useUserStore from 'hooks/stores/useUserStore'
import { MenuIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import Cart from './blocks/User/Cart'

type Props = { id?: string, user?: User }

export const getFIO = (user: User['data']) => {
  if (!user) {
    console.error('no user!')
    return ''
  }
  return `${user.lastName} ${user.firstName?.slice(0, 1)}. ${user.middleName ? (user.middleName.slice(0, 1) + '.') : ''}`
}

const CurrentLoginUser = () => {
  const navigate = useNavigate()
  const { user, logout } = useUserStore();
  if (!user.data) {
    return null
  }

  return (
    <div className="flex gap-2 items-center">
      <Button variant={'link'} className='text-grey-400' onClick={() => navigate('/profile')}>{getFIO(user.data)}</Button>
      <Button variant={'outline'} onClick={() => { logout(); navigate('/auth/login') }}>Выйти</Button>
    </div>
  )
}


const Header = (props: Props) => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation('header');
  const [lang, setLang] = useState(i18n.language?.split('-')[0] || 'ru');
  const { user, setUser } = useUserStore();
  const [open, setOpen] = useState(false);

  // Создаем ref для элемента, который нужно отслеживать
  const menuRef = useRef<HTMLDivElement>(null);
  // Используем хук для закрытия меню при клике вне его
  useClickOutside(menuRef, () => {
    if (open) setOpen(false);
  });

  if (!user.data && user.hasAuth) {
    setUser()
  }

  return (
    <header className="pt w-full">
      <div className='flex items-center justify-between bg-gradient-to-t from-gray-200 to-gray-300 py-5 px-10 rounded '>
        <div className="flex items-center ">
          <img width={30} src="/img/logo.png" alt="" />
          <span className='text-primary-100 cursor-pointer font-bold' onClick={() => navigate('/')}> {t('title')}</span>

        </div>
        <MenuIcon className='md:hidden text-gray-700' onClick={() => setOpen(!open)} />
        <div ref={menuRef} className={cn(`flex-wrap gap-2 hidden md:flex ${open ? 'flex flex-col items-start absolute top-10 right-10 bg-white p-5 rounded' : ''}`)} >

          {user.data?.role === 'admin' && <Button variant={'link'} onClick={() => navigate('/admin')}>В админ панель</Button>}
          {user.hasAuth && <Popover>
            <PopoverTrigger><Button >{t('cartButton')} </Button></PopoverTrigger>
            <PopoverContent className='w-auto'><Cart /></PopoverContent>
          </Popover>}

          {!user.hasAuth ? <Button onClick={() => navigate('/auth/login')} variant={'outline'} >{t('button.login')} </Button> : <CurrentLoginUser />}

          {/* <div className="div">
            <SelectUI selectItems={[{ key: 'ru', label: 'ru' }, { key: 'en', label: 'en' }]} onValueChange={(value) => { setLang(value); i18n.changeLanguage(value) }} value={lang} />
          </div> */}

        </div>
      </div>
    </header >
  )
}

export default Header