import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from 'components/ui/button';
import SelectUI from 'components/ui/form/SelectUI';
import useUserStore from 'hooks/stores/useUserStore';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { ProductInCart } from '../blocks/Product/ProducCard';

type Props = {}



const OrderForm = (props: Props) => {
    const { user, userCart } = useUserStore();

    const formSchema = z.object({
        address_id: z.number(),
        phone_id: z.number(),
        items: z.array(z.object({ product_id: z.number(), quantity: z.number() }))
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address_id: user.data?.addresses[0]?.id,
            phone_id: user.data?.phones[0]?.id,
            items: userCart.map(i => { return { product_id: i.id, quantity: 1 } })
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        // await userApi.postOrder({ ...values, user_id: user.data?.id! })
        
    }
    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="address_id"
                    render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Адрес</FormLabel>
                            <FormControl>
                                <SelectUI {...field} onValueChange={(value) => onChange(Number(value))} selectItems={user.data?.addresses.map(i => { return { key: String(i.id), label: i.street } }) || []} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone_id"
                    render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Телефон</FormLabel>
                            <FormControl>
                                <SelectUI {...field} onValueChange={(value) => onChange(Number(value))} selectItems={user.data?.phones.map(i => { return { key: String(i.id), label: i.number } }) || []} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="items"
                    render={({ field: { onChange, value } }) => (
                        <FormItem>
                            <FormLabel>Товары</FormLabel>
                            <FormControl>
                                <div className="flex flex-col flex-wrap gap-5">
                                    {userCart.map((p) => {
                                        return (
                                            <ProductInCart
                                                key={p.id}
                                                orderType={true}
                                                inOrder={value.some(i => i.product_id === p.id)}
                                                onPick={(id: number) => {
                                                    // Создаем новый массив вместо мутации
                                                    onChange([...value, { product_id: id, quantity: 1 }])
                                                }}
                                                onRemove={(id: number) => {
                                                    // Создаем новый отфильтрованный массив
                                                    onChange(value.filter(i => i.product_id !== id))
                                                }}
                                                onQuantityChange={(id: number, quantity: number) => {
                                                    onChange(value.map(i =>
                                                        i.product_id === id ? { ...i, quantity } : i
                                                    ))
                                                }}
                                                {...p}
                                            />
                                        )
                                    })}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full' type="submit" >Подтвердить</Button>

            </form>
        </Form>
    )
}

export default OrderForm