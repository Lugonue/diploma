import React from 'react'

type Props = {}

const AboutUsBlock = (props: Props) => {
    return (
        <div className='flex w-full items-center justify-between p-5'>
            <img width={200} src="public/img/landing-about-us.jpg" alt="" />

            <div className="flex flex-col w-[400px]">
                <h3 className='font-bold'>О нас</h3>
                <p className='text-sm'>«Опора» – магазин ортопедических товаров с миссией улучшать качество жизни. Мы подбираем решения для здоровья спины, суставов и комфортного сна, используя только проверенные технологии и материалы. Ваше здоровье – наша опора!.
                </p>
            </div>
        </div>
    )
}

export default AboutUsBlock