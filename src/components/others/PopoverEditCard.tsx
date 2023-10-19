import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { PencilIcon } from "lucide-react";
import AddEditCard1 from "../cards/AddEditCard1";
import { obj } from "@/hooks/zustand-store/store";
import { useState } from "react";

export default function PopoverEditCard(obj: obj) {
    const [open, setOpen] = useState<boolean>(false)
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <div>
            <Popover open={open} >
                <PopoverTrigger >
                    <span className=" bg-primary rounded hover:opacity-70 active:opacity-100" onClick={() => setOpen(prev => !prev)}>
                        <PencilIcon color="#ff8000" />
                    </span>
                </PopoverTrigger>
                <PopoverContent side="right"  style={{
                    width: "70vw"
                }} asChild >
                    <div className="z-50 bg-popover absolute rounded pt-9 pb-9 pl-5">
                        <AddEditCard1 {...obj} handleClose={handleClose} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
