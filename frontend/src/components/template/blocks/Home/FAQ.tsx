import FAQitem from 'components/template/Elements/FAQitem'
import React from 'react'

type Props = {}

const src = [
    {
        question: 'Как подобрать размер стелек?',
        answer: 'Измерьте длину и ширину стопы, смотрите таблицу на сайте или свяжитесь с ортопедом-консультантом.'
    },
    {
        question: 'Можно ли вернуть товар?',
        answer: 'Да, в течение 14 дней при сохранении товарного вида. Детали уточняйте в разделе «Возврат и обмен»'
    },
    {
        question: 'Сколько занимает доставка?',
        answer: 'В среднем 2–5 дней по России. Возможна экспресс-доставка'
    }
]

const FAQ = (props: Props) => {
    return (
        <div className='p-5'>
            <h3 className='font-bold text-center'>Часто задаваемые вопросы</h3>
            <ul className='flex flex-col gap-2'>
                {src.map((item, index) => <FAQitem key={index} question={item.question} answer={item.answer} />)}
            </ul>
        </div>
    )
}

export default FAQ