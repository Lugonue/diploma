import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import productApi from "@/api/endpoints/product"
import { ProductCard } from "./Product/ProducCard"
import { Product } from "hooks/stores/useProductStor"

export function ActionsCarousel() {
  const [products, setProducts] = React.useState<Product[]>([])
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  React.useEffect(() => {
    const fetch = async () => {
      const { data } = await productApi.getPopular()
      setProducts(data)
    }
    fetch()
  }, [])

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {products && products.map((p) => (
          <CarouselItem key={p.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-2 ">
                  <ProductCard {...p} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
type ImgCarouselProps = {
  imgs: string[],
  imgWidth?: number
}
export function ImgCarousel({ imgs, imgWidth }: ImgCarouselProps) {

  return (
    <Carousel
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {imgs.map((i, index) => (
          <CarouselItem key={index}>
            <img src={i} alt="" width={imgWidth} className={cn([imgWidth && `w-[${imgWidth}]`, 'mx-auto'])} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
