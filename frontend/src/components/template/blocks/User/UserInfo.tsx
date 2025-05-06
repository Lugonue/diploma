import Defenition from 'components/ui/misc/Defenition';
import useUserStore from 'hooks/useStore';
import { useTranslation } from 'react-i18next';

type Props = {}
const hiddenKeys = ['id', 'password', 'role', 'orders']

const UserInfo = (props: Props) => {
  const { user } = useUserStore();
  const { t } = useTranslation('user');


  return (
    <div >
      {Object.entries(user.data || {}).map(([k, v]) => {
        if (!v || !k || hiddenKeys.includes(k)) return null
        return <Defenition title={t(`infoCard.${k}`)} value={v} />
      })}

    </div>
  )
}

export default UserInfo