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
import { User, UserData } from '@/types/User';
import adminApi from '@/api/endpoints/adminApi';
import { toast } from 'sonner';
import useAdminStore from 'hooks/stores/useAdminStore';

type Props = {
    user: User['data'];
    closeDialog: () => void
}

export const Roles = [
    {
        id: 'user',
        name: 'Пользователь'
    },
    {
        id: 'admin',
        name: 'Администратор'
    }
] as const

const UserForm = (props: Props) => {
    const { fetchUsers } = useAdminStore()
    const { t } = useTranslation('form');

    const formSchema = z.object({
        lastName: z.string(),
        firstName: z.string().min(1),
        dateOfBirth: z.string(),
        email: z.string().min(2, {
            message: t('registration.email.error.min'),
        }).email({
            message: t('registration.email.error.email'),
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...props.user
        },
    })
    async function onSubmit({ ...values }: z.infer<typeof formSchema>) {
        if (!props.user?.id) return toast.error('Пользователь не найден')
        await adminApi.patchUser(props.user?.id, values)
        await fetchUsers([])
        props.closeDialog()
    }
    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-auto">
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
                <Button className='w-full' type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default UserForm