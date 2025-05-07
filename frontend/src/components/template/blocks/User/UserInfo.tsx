import userApi from '@/api/endpoints/userApi';
import { Button } from 'components/ui/button';
import Defenition from 'components/ui/misc/Defenition';
import useUserStore from 'hooks/stores/useUserStore';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

type Props = {}
const hiddenKeys = ['id', 'password', 'role', 'orders']

const UserInfo = (props: Props) => {
  const { user, userForm, setUser, resetUserForm } = useUserStore();
  const { t } = useTranslation('user');

  const patchUser = async () => {
    const { data } = await userApi.patch(userForm)
    setUser(data)
    toast.success("Данные успешно обновлены");
    resetUserForm()
  }



  return (
    <div className='flex flex-col gap-2' >
      <h3>Личные данные</h3>
      {Object.entries(user.data || {}).map(([k, v]) => {
        if (!v || !k || hiddenKeys.includes(k)) return null
        return <Defenition title={t(`infoCard.${k}`)} value={v} field={k} key={k} />
      })}
      <div className="flex mt-2 justify-end pe-1">
        <Button variant='outline-2' onClick={() => patchUser()}> Сохранить</Button>

      </div>

    </div>
  )
}

export default UserInfo