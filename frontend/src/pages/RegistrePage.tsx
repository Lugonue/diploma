import RegistrationForm from 'components/template/forms/RegistrationForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card';
import { useTranslation } from 'react-i18next';

type Props = {}

const RegisterPage = (props: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <Card >
        <CardHeader  >
          <CardTitle>{t('register.card.title')}</CardTitle>
          <CardDescription>{t('register.card.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <RegistrationForm />
        </CardContent>
        <CardFooter>
          {/* <div className="flex w-full items-center justify-between mt-10">
            <p className='text-sm'>{t('register.card.footer')}</p>
            <Link to="/register"><Button variant="outline">Зарегистрироваться</Button></Link>

          </div> */}

        </CardFooter>
      </Card>
    </>
  )
}

export default RegisterPage