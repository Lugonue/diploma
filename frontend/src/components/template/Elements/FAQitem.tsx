
type Props = {
    question: string,
    answer: string
}

const FAQitem = (props: Props) => {
    return (
        <li className="grid gap-x-4">
            <dt className="text-sm font-medium text-gray-900">{props.question}</dt>
            <dd className="mt-2 md:mt-0 text-sm text-gray-600">{props.answer}</dd>
        </li>

    )
}

export default FAQitem