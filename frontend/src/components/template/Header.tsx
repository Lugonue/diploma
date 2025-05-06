import { User } from '@/types/User'
import { Button } from 'components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select'
import useUserStore from 'hooks/useStore'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

type Props = { id?: string, user?: User }


const CurrentLoginUser = () => {
  const navigate = useNavigate()
  const { user, logout } = useUserStore();
  if (!user.data) {
    return null
  }

  return (
    <div className="flex gap-2 items-center mx-4">
      <Button variant={'link'} className='text-grey-400' onClick={() => navigate('/profile')}>{user.data.firstName} {user.data.lastName?.slice(0, 1)}.</Button>
      <Button variant={'outline'} onClick={() => logout()}>Выйти</Button>
    </div>
  )
}


const Header = (props: Props) => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation('header');
  const [lang, setLang] = useState(i18n.language?.split('-')[0] || 'ru');
  const { user, setUser } = useUserStore();

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
        <div className="flex gap-2">
          <Button >{t('callbuttonLabel')} </Button>
          {!user.hasAuth ? <Button onClick={() => navigate('/auth/login')} variant={'outline'} >{t('button.login')} </Button> : <CurrentLoginUser />}

          <Select onValueChange={(value) => { setLang(value); i18n.changeLanguage(value) }} value={lang} >
            <SelectTrigger className="">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ru">ru</SelectItem>
              <SelectItem value="en">en</SelectItem>
            </SelectContent>
          </Select>

        </div>
      </div>
    </header >
  )
}

export default Header