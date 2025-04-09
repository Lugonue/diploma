import { User } from '@/types/User'
import { Button } from 'components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

type Props = { id?: string, user?: User }

const Header = (props: Props) => {
  const { i18n, t } = useTranslation('header');
  const navigate = useNavigate()
  const [lang, setLang] = useState(i18n.language?.split('-')[0] || 'ru');
  return (
    <header className="pt w-full">
      <div className='flex items-center justify-between bg-gradient-to-t from-gray-200 to-gray-300 py-5 px-10 rounded '>
        <span className='text-primary-100 cursor-pointer' onClick={() => navigate('/')}> Название сайта</span>
        <div className="flex gap-2">
          <Button >{t('callbuttonLabel')} </Button>
          <Button onClick={() => navigate('/auth/login')} variant={'outline'} >{t('button.login')} </Button>

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