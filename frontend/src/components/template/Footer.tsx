
const cols = [
    {
        text: 'OrthoCare © 2025 OrthoCare.\nОртопедические товары для всей семьи.\nУлучшайте своё здоровье вместе с нами!',
        font: 'font-bold'

    },
    {
        text: '+7 (999) 123-45-67\ninfo@orthocare.\n г. Москва, ул. Примерная, 10',
        font: 'font-bold'
    },
    {
        text: '',

        list: [
            {
                label: 'О нас',
                href: '#'
            },
            {
                label: 'Каталог',
                href: '#'
            },
            {
                label: 'Преимущества',
                href: '#'
            },
            {
                label: 'Отзывы',
                href: '#'
            },
            {
                label: 'FAQ',
                href: '#'
            },
            {
                label: 'Контакты',
                href: '#'
            }
        ],
        listClass: 'flex flex-col gap-2',
        liClass: 'text-wrap whitespace-pre-wrap '

    },
]
const Footer = () => {

    return (
        <footer className="pb-16 grid place-content-center w-full text-gray-400 bg-dark font-medium">
            <div className="grid grid-cols-3">
                {cols.map((item, index) => (
                    <div key={index} className="flex items-start justify-center">
                        <div className="p-10  text-wrap whitespace-pre-wrap">
                            <p className={item.font}>{item.text}</p>
                            {item.list && (
                                <ul className={item.listClass}>
                                    {item.list.map((li, index) => (
                                        <li className={item.liClass} key={index}>
                                            <a className={item.liClass} href={li.href}>{li.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </footer>
    )
}

export default Footer