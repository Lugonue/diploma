import adminApi from '@/api/endpoints/adminApi'
import ProductListItem from 'components/template/Elements/Admin/ProductListItem'
import ProductForm from 'components/template/forms/ProductForm'
import { Button } from 'components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog'
import { Product } from 'hooks/stores/useProductStor'
import { Suspense, useEffect, useState } from 'react'

type Props = {}

const AdminProducts = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    const fetch = async () => {
      const { data } = await adminApi.getAllProducts()
      setProducts(data)
    }
    if (!products.length) {
      fetch()
    }
  }, [])

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className='text-xl'>Список товаров</div>
        <Dialog>
          <DialogTrigger><Button> Добавить товар</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить новый товар</DialogTitle>
            </DialogHeader>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductForm />

            </Suspense>

          </DialogContent>
        </Dialog>


      </div>
      {products.map(p => <ProductListItem product={p} key={p.id} />)}

    </div>
  )
}

export default AdminProducts