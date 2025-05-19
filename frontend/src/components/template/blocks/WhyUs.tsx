import { Card, CardContent } from 'components/ui/card'
import React from 'react'



const WhyUs = () => {
    const items = [
        {
            title: 'Качественные бренды',
            img: '/public/img/landing-about-us.jpg'
        },
        {
            title: 'Профессиональные советы',
            img: ''
        },
        {
            title: 'Удобная доставка',
            img: ''
        },
        {
            title: 'Широкий ассортимент',
            img: ''
        },
    ]
    return (
        <div className="flex flex-col gap-5 my-10">
            <div className='font-bold text-center'>Почему выбирают нас</div>
            <div className="flex gap-4 justify-center">
                {items.map((item, index) => (
                    <Card key={index} >
                        <CardContent className='flex flex-col items-center gap-2'>
                            <img src={'/public/img/landing-about-us.jpg'} alt="" className='w-15 rounded-full' />
                            <div className='font-bold'>{item.title}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

        </div>
    )
}

export default WhyUs