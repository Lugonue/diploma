import * as React from "react"
import { format } from "date-fns"
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
}

export function DatePicker({ onPickDate, placeholder, CalendarProps }: Props) {
    const [date, setDate] = React.useState<Date>()
    const onSelect = (date?: Date) => {
        if (!date) return
        setDate(date)
        onPickDate(date)
    }
    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    type="button"
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd.MM.yyyy") : <span>{placeholder}</span>}
                </Button>

            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onSelect}
                />
            </PopoverContent>
        </Popover>
    )
}
