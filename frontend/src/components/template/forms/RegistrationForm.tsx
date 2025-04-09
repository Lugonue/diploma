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
import { DatePicker } from 'components/ui/form/DatePicker';
import useAuth from 'hooks/useAuth';

type Props = {}

const RegistrationForm = (props: Props) => {
    const { makeRegister } = useAuth();

    const { t } = useTranslation('form');
    const formSchema = z.object({
        lastName: z.string().min(1),
        firstName: z.string().min(1),
        dateOfBirth: z.string(),
        email: z.string().min(2, {
            message: t('registration.email.error.min'),
        }).email({
            message: t('registration.email.error.email'),
        }),
        password: z.string().min(2, {
            message: t('registration.password.error.min'),
        }),
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'] // Указываем, к какому полю относится ошибка
    });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })
    function onSubmit({ confirmPassword, ...values }: z.infer<typeof formSchema>) {
        console.log(values)
        makeRegister({
            ...values,
            role: 'user'
        });
    }
    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-lg">
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('register.lastName.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('register.lastName.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('register.firstName.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('register.firstName.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('register.dateOfBirth.label')}</FormLabel>
                            <FormControl>
                                <DatePicker CalendarProps={{
                                    disabled: (date: Date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                }} onPickDate={(date: Date) => { field.onChange(new Date(date).toISOString()) }} placeholder={t('register.dateOfBirth.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('register.email.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('register.email.placeholder')} {...field} />
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
                            <FormLabel>{t('register.password.label')}</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder={t('register.password.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('register.confirmPassword.label')}</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder={t('register.confirmPassword.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full' type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default RegistrationForm