import LoginForm from 'components/template/forms/LoginForm';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

type Props = {}

const LoginPage = (props: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <Card >
        <CardHeader  >
          <CardTitle>{t('login.card.title')}</CardTitle>
          <CardDescription>{t('login.card.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-between mt-10">
            <p className='text-sm'>{t('login.card.footer')}</p>
            <Link to="/auth/register"><Button variant="outline">{t('login.card.registerButton')}</Button></Link>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default LoginPage