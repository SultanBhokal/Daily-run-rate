import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { Button } from "../ui/button"
import { useState } from "react"

export default function PopoverCalendar(props: {
    mode?: any,
    onSelect?: any,
    selected?: any,
    title?: React.ReactNode | string,
    triggerClass?: string,
    contentClass?: string,
    fromDate?: Date | undefined,
    toDate?: Date | undefined,
    submitBtn?: boolean,
    handleSubmit?: any
}) {

    const [open, setOpen] = useState<boolean>(false)
    function handleSubmit() {
        setOpen(false)
        props?.handleSubmit()
    }
    return (
        <div>
            <Popover open={open}>
                <PopoverTrigger className={props?.triggerClass}>
                    <div onClick={() => setOpen(true)}>
                        {
                            props.title || "Please select date"
                        }
                    </div>
                </PopoverTrigger>
                <PopoverContent className={props.contentClass}>
                    <Calendar mode={props.mode} onSelect={props.onSelect} selected={props.selected} fromDate={props?.fromDate} toDate={props?.toDate} />
                    <div className="w-full flex justify-center">
                        <span>
                            {
                                props?.submitBtn ?
                                    <Button className="" type="button" onClick={handleSubmit}>Submit</Button>
                                    :
                                    ""
                            }
                        </span>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
