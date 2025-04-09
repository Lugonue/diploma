import * as React from "react"
import { format, formatDate, isMatch, isValid, parse, parseISO } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DayPicker } from "react-day-picker"
import { Input } from "../input"

type Props = {
    onPickDate: (date: Date) => void;
    placeholder?: string
    CalendarProps?: React.ComponentProps<typeof DayPicker>

} & any

export function DatePicker({ onPickDate, placeholder, CalendarProps, ...props }: Props) {
    console.log(props)
    const [date, setDate] = React.useState<Date>()
    const [inputDate, setInputDate] = React.useState<string>()
    const onSelect = (date?: Date | string) => {
        if (!date) return
        const dateOut = new Date(date)
        setDate(dateOut)
        setInputDate(format(dateOut, "dd.MM.yyyy"))
        onPickDate(dateOut)
    }

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();

        if (value) {
            try {
                if (isMatch(value, "dd.MM.yyyy")) {
                    const parsedDate = parse(value, "dd.MM.yyyy", new Date());
                    if (isValid(parsedDate)) {
                        // Проверяем, что дата соответствует введенной строке
                        const formatted = format(parsedDate, "dd.MM.yyyy");
                        if (formatted === value) {
                            onSelect(parsedDate);
                            return;
                        }
                    }
                }
            } catch {
                // Ошибка парсинга
            }

            setInputDate(date ? format(date, "dd.MM.yyyy") : "");
        } else {
            setInputDate("");
        }
    }
    return (
        <Popover>
            <div className="relative">
                <Input
                    type="text"
                    value={inputDate ? inputDate : ''}
                    onBlur={handleInputBlur}
                    placeholder={placeholder}
                    onChange={(event) => setInputDate(event.target.value)}
                    aria-invalid={props['aria-invalid']}
                >
                </Input>
                <div className="flex top-0 absolute right-0">

                    <PopoverTrigger >
                        <Button className=" px-3 " type="button" variant={"ghost"} >
                            <CalendarIcon className=" h-4 w-4 cursor-pointer" />
                        </Button>
                    </PopoverTrigger>
                </div>
            </div>

            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onSelect}
                    defaultMonth={date}
                    {...CalendarProps}
                />
            </PopoverContent>
        </Popover >
    )
}
