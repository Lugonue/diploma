import ProductListItem from 'components/template/Elements/Admin/ProductListItem'
import ProductForm from 'components/template/forms/ProductForm'
import { Button } from 'components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog'
import useAdminStore from 'hooks/stores/useAdminStore'
import { Product } from 'hooks/stores/useProductStor'
import { Suspense, useEffect, useState } from 'react'

type Props = {}

const AdminProducts = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [defaultValue, setDefaultValue] = useState<Record<string, any>>()
  const { products, fetchProducts } = useAdminStore();
  useEffect(() => {
    fetchProducts(products)
  }, [])

  return (
    <div className="p-2">
      <div className="flex justify-between mb-2">
        <div className='text-xl '>Список товаров</div>
        <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
          <DialogTrigger><Button onClick={() => setOpen(true)}> Добавить товар</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader  >
              <DialogTitle>Добавить новый товар</DialogTitle>
            </DialogHeader>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductForm closeDialog={() => setOpen(false)} defaultValues={defaultValue} />
            </Suspense>
          </DialogContent>
        </Dialog>


      </div>
      {products?.map(p => <ProductListItem product={p} key={p.id} openDialog={() => { setDefaultValue({...p, category: p.category.id}); setOpen(true) }} />)}

    </div>
  )
}

export default AdminProducts