import { Button } from 'components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useAuth from 'hooks/useAuth';
import ErrorMessage from '../blocks/ErrorMessage';

type Props = {}

const LoginForm = (props: Props) => {
    const { t } = useTranslation('form');
    const { makeAuth, authStatus } = useAuth();

    const formSchema = z.object({
        email: z.string().min(2, {
            message: t('login.email.error.min'),
        }).email({
            message: t('login.email.error.email'),
        }),
        password: z.string().min(2, {
            message: t('login.password.error.min'),
        })

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await makeAuth(values);
    }
    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-lg">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('login.email.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('login.email.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('login.password.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('login.password.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {authStatus.error && <ErrorMessage msg={authStatus.error} />}
                <Button className='w-full' type="submit">{t('global.button.login')}</Button>
            </form>
        </Form>
    )
}

export default LoginForm