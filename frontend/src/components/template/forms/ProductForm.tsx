import catalogApi from '@/api/endpoints/catalogApi';
import productApi from '@/api/endpoints/product';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from 'components/ui/button';
import SelectUI from 'components/ui/form/SelectUI';
import { Textarea } from 'components/ui/textarea';
import { Category } from 'hooks/stores/useCatalogStore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from "zod";

type Props = {
    closeDialog: () => void;
    defaultValues?: Record<string, any>;
}

const ProductForm = (props: Props) => {
    const [categories, setCategories] = useState<Category[]>([])
    const { t } = useTranslation('form');

    const formSchema = z.object({
        name: z.string(),
        brand: z.string(),
        price: z.string(),
        category_id: z.number(),
        type_id: z.number(),
        color: z.string(),
        description: z.string().optional(),
        image: z.instanceof(File).optional(),
    })
    console.log(props.defaultValues)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: props.defaultValues?.name,
            category_id: props.defaultValues?.category, // или 0, если нужно
            brand: props.defaultValues?.brand,
            price: props.defaultValues?.price,
            color: props.defaultValues?.color,
            description: props.defaultValues?.description,
            type_id: props.defaultValues?.type.id,

        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const editMode = !!props.defaultValues
        if (values) {
            const formData = new FormData()
            for (const key in values) {
                // @ts-ignore
                formData.append(key, values[key])
            }
            const service = editMode ? productApi.update : productApi.create
            service(props.defaultValues?.id || 0, formData)
            props.closeDialog()
        }
        toast.success(editMode ? 'Товар успешно обновлен' : 'Товар успешно создан')
    }

    useEffect(() => {
        const fetch = async () => {
            const { data } = await catalogApi.getCategories()
            setCategories(data)
        }
        if (!categories.length) {
            fetch()
        }
    }, [])

    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('product.name.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('product.name.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('product.brand.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('product.brand.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('product.price.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('product.price.placeholder')} {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>{t('product.category_id.label')}</FormLabel>
                            <FormControl>
                                <SelectUI {...field} onValueChange={(value) => onChange(Number(value))} selectItems={categories.map(c => ({ key: String(c.id), label: c.name }))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type_id"
                    render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>{t('product.type_id.label')}</FormLabel>
                            <FormControl>
                                <SelectUI disabled={!form.watch('category_id')} {...field} onValueChange={(value) => onChange(Number(value))} selectItems={categories.find(c => c.id === form.watch('category_id'))?.types.map(c => ({ key: String(c.id), label: c.name })) || []} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('product.color.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('product.color.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('product.description.label')}</FormLabel>
                            <FormControl>
                                <Textarea placeholder={t('product.description.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>{t('product.image.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('product.image.placeholder')} type='file' {...field} onChange={(e) => onChange(e.target.files?.[0])} />
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

export default ProductForm