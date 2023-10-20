import { useEffect, useState } from "react"
import Table1 from "../components/tables/Table1"
import "../styles/dailyrunrate.scss"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {  PlusIcon } from "lucide-react"
import AddEditCard1 from "@/components/cards/AddEditCard1"
import { StoreState, store } from "@/hooks/zustand-store/store"




type cells = Array<Array<{ key: string, value: string | any }>>
// type responseObjType = {
//   startDate: Date,
//   endDate: Date,
//   monthAndYear: string,
//   excludedDates: Date[] | [],
//   numberOfDays: number,
//   leadCounts: number,
//   expectedDrr: number
// }

export default function DailtyRunRateContainer() {
  // const [cellHeaders, setHeaders] = useState<Array<{ title: string, key: string }>>(
  //   [
  //   {
  //     title: "Actions",
  //     key: "actions",
  //   },
  //   {
  //     title: "ID",
  //     key: "id",
  //   },
  //   {
  //     title: "Start Date",
  //     key: "start_date",
  //   },
  //   {
  //     title: "End Date",
  //     key: "end_date",
  //   },
  //   {
  //     title: "Month,Year",
  //     key: "month_year",
  //   },
  //   {
  //     title: "Dates Excluded",
  //     key: "date_exc",
  //   },
  //   {
  //     title: "Number of Days",
  //     key: "num_of_days",
  //   },
  //   {
  //     title: "Lead Count",
  //     key: "lead_count",
  //   },
  //   {
  //     title: "Expected DRR",
  //     key: "exp_drr",
  //   },
  //   {
  //     title: "Last Updated",
  //     key: "last_updated",
  //   },
  // ])

  const headers =  [
    {
      title: "Actions",
      key: "actions",
    },
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Start Date",
      key: "start_date",
    },
    {
      title: "End Date",
      key: "end_date",
    },
    {
      title: "Month,Year",
      key: "month_year",
    },
    {
      title: "Dates Excluded",
      key: "date_exc",
    },
    {
      title: "Number of Days",
      key: "num_of_days",
    },
    {
      title: "Lead Count",
      key: "lead_count",
    },
    {
      title: "Expected DRR",
      key: "exp_drr",
    },
    {
      title: "Last Updated",
      key: "last_updated",
    },
  ]

  const cell1 = [
    {
      value: "",
      key: "actions",
    },
    {
      value: "1",
      key: "id",
    },
    {
      value: "23-10-03",
      key: "start_date",
    },
    {
      value: "2023-10-2025",
      key: "end_date",
    },
    {
      value: "10",
      key: "month_year",
    },
    {
      value: "2023-10-2025 2023-10-2025",
      key: "date_exc",
    },
    {
      value: "20",
      key: "num_of_days",
    },
    {
      value: "8000",
      key: "lead_count",
    },
    {
      value: "400",
      key: "exp_drr",
    },
    {
      value: "2023-10-2025",
      key: "last_updated",
    },
  ]
  const cellsFromStore = store((state) => (state as StoreState).cells)
  // const records = store(state => (state as StoreState).records)
  // const setCellsFromStore = store(state => (state as StoreState).setCells)
  // const inserted = store(state => (state as StoreState).inserted)
  // const updated = store(state => (state as StoreState).updated)
  const [cells, setCells] = useState<cells>([
    cell1,...cellsFromStore
  ])

  const [open, setOpen] = useState(false)

 

 
  console.log(cellsFromStore)


  // const handleChange = (obj: responseObjType) => {

  //   // const formatExludedDate = obj.excludedDates?.reduce((next, curr) => {
  //   //   return next + " " + format(curr, "dd-MM-yyy")
  //   // }, "")
  //   // console.log(formatExludedDate)
  //   // setCells(
  //   //   prev => [...prev,
  //   //   [
  //   //     {
  //   //       value:<PopOverCard
  //   //       popTriggerClasses="" 
  //   //       trigger={<Button className=" bg-yellow-300  hover:opacity-60 " type="button"><Pencil color="yellow" /></Button>}
  //   //       content={<Card1 handleResponse={handleEdit}
  //   //             startDate={obj.startDate}
  //   //             endDate={obj.endDate}
  //   //             excludedDates={obj.excludedDates}
  //   //             monthAndYear={obj.monthAndYear}
  //   //             numberOfDays={obj.numberOfDays}
  //   //             leadCounts={obj.leadCounts}
  //   //             expectedDrr={obj.expectedDrr}
  //   //        />}
  //   //        close={true}

  //   //        closeStyle="absolute -top-8 left-0 z-10 bg-gray-200 hover:bg-slate-300"
  //   //        />
  //   //        ,
  //   //       key: "actions",
  //   //     },
  //   //     {
  //   //       value: `${cells.length + 1}`,
  //   //       key: "id",
  //   //     },
  //   //     {
  //   //       value: `${obj.startDate.toString().slice(0, 8)}`,
  //   //       key: "start_date",
  //   //     },
  //   //     {
  //   //       value: `${obj.endDate.toString().slice(0, 8)}`,
  //   //       key: "end_date",
  //   //     },
  //   //     {
  //   //       value: obj.monthAndYear,
  //   //       key: "month_year",
  //   //     },
  //   //     {
  //   //       value: formatExludedDate,
  //   //       key: "date_exc",
  //   //     },
  //   //     {
  //   //       value: obj?.numberOfDays.toString() || "0",
  //   //       key: "num_of_days",
  //   //     },
  //   //     {
  //   //       value: obj?.leadCounts.toString() || "0",
  //   //       key: "lead_count",
  //   //     },
  //   //     {
  //   //       value: obj?.expectedDrr?.toString() || "0",
  //   //       key: "exp_drr",
  //   //     },
  //   //     {
  //   //       value: `${format(new Date(), "dd-MM-yyyy")}`,
  //   //       key: "last_updated",
  //   //     },
  //   //   ]
  //   //   ]
  //   // )
  //   setOpen(prev => !prev)

  // }

  const handleClose = ()=>{
    setOpen(false)
  }

  useEffect(()=>{
      setCells([...cellsFromStore])
  },[cellsFromStore])


 

  return (
    <div className="drr-container mt-5 relative  w-full">
      <div>
        <Popover open={open}>
          <PopoverTrigger>
            <span className="absolute -top-6 button bg-primary px-2 py-1 rounded hover:opacity-70 active:opacity-100" onClick={()=>setOpen(prev=>!prev)}>
              <PlusIcon color="white" />
            </span>
          </PopoverTrigger>
          <PopoverContent side="bottom" className=" absolute" style={{
            width: "75vw"
          }}>
            <AddEditCard1 handleClose={handleClose} />
          </PopoverContent>
        </Popover>
      </div>
      <Table1 tableHeaders={headers} tableCell={cells} caption="Daily run rate" />
    </div>
  )
}
