import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';

type SelectItemType = {
    key: string;
    label: string
}

type Props = {
    selectItems: SelectItemType[];
    onValueChange: (value: any) => void;
    value: unknown;
    classNames?: string
    disabled?: boolean
}

const SelectUI = (props: Props) => {
    return (
        <Select disabled={props.disabled} onValueChange={(value) => props.onValueChange(value)} value={String(props.value)} >
            <SelectTrigger className="w-full">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className='w-full'>
                {props.selectItems.map(s => <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}

export default SelectUI