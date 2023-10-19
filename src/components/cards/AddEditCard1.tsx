import { useMemo, useRef, useState } from "react"
import PopoverCalendar from "../others/PopoverCalendar";
import { CalculatorIcon, CalendarCheck2, CalendarCheck2Icon, CalendarDaysIcon, CalendarIcon, CalendarMinusIcon, CalendarPlusIcon, CircleEqualIcon, PencilIcon, Play, Tally5, Tally5Icon } from "lucide-react";
import { differenceInDays, format } from "date-fns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { StoreState, obj, store, updateRecords } from "@/hooks/zustand-store/store";
import { generateUniqueId } from "@/utils/randomId";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import PopoverEditCard from "../others/PopoverEditCard";
import AlertDiologDelete from "../others/AlertDiologDelete";

type props = {
  id?: string,
  startDate?: Date,
  endDate?: Date,
  excludedDates?: Date[] | [],
  totalDays?: number,
  leadCounts?: number,
  expectedDrr?: number,
  monthAndYear?: string,
  handleClose?: any
}

export default function AddEditCard1(props: props) {

  const [singleDate, setSingleDate] = useState<Date | undefined>(props?.startDate || new Date());
  const [multipleDates, setMultipleDates] = useState<Date[] | [] | undefined | any>(props?.excludedDates || []);
  const [endDate, setEndDate] = useState<Date | undefined>(props?.endDate || new Date());
  const [totalDays, setTotalDays] = useState<number>(props?.totalDays || 0)
  const [dateChanged, setDateChanges] = useState<number>(0)
  const [leadCountChanged, setLeadCountChanged] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [leadCounts, setLeadCounts] = useState<number>(props?.leadCounts || 0)
  const [drr, setDrr] = useState<number>(props?.expectedDrr || 0)
  const cells = store((state) => (state as StoreState).cells)
  const records = store(state => (state as StoreState).records)
  const setCells = store(state => (state as StoreState).setCells)
  const setRecords = store(state => (state as StoreState).setRecords)

  useMemo(() => {
    function getTotalDays(): number {
      if (singleDate !== undefined && endDate !== undefined) {
        const difference = differenceInDays(endDate, singleDate) + 1;
        const excludes = multipleDates?.length || 0

        return difference - excludes
      }
      return 0
    }

    setTotalDays(getTotalDays())

  }, [dateChanged])

  useMemo(() => {
    console.log("rendered")
    if (singleDate !== undefined && endDate !== undefined) {
      if (singleDate?.getMonth() > endDate?.getMonth() || singleDate?.getDate() > endDate.getDate()) {
        console.log("see")
        setEndDate(singleDate)
        setMultipleDates([])
      }
    }
  }, [dateChanged])

  useMemo(() => {

    if (leadCounts > 0 && totalDays > 0) {
      setDrr(leadCounts / totalDays)
    }
    if (totalDays <= 0) {
      setDrr(0)
    }

  }, [leadCountChanged, totalDays])

  const handleLeadCountChange = () => {
    if (inputRef?.current) {
      if (Number(inputRef?.current.value) > 0) {
        setLeadCounts(Number(inputRef.current.value))
        setLeadCountChanged(prev => prev + 1)
      }
    }
  }



  const handleDateSubmit = () => {
    setDateChanges(prev => prev + 1)
  }



  // ui for selecting date

  const singleDateUI = <span className="flex gap-2">
    <CalendarPlusIcon color="#00ff00" className="hover:opacity-75" />
    <span className="">Please select start date</span>
  </span>

  const endDateUI = <span className="flex gap-2">
    <CalendarMinusIcon color="#ff0000" className="hover:opacity-75" />
    <span className="">Please select end date</span>
  </span>

  const excludeDatesUI = <span className="flex gap-2">
    <CalendarDaysIcon color="#808080" className="hover:opacity-75" />
    <span className="">Please select end date</span>
  </span>

  const startMonth = singleDate?.getMonth() ? singleDate?.getMonth() + 1 : 0
  const endMonth = endDate?.getMonth() ? endDate?.getMonth() + 1 : 0
  const startYear = singleDate?.getFullYear() ? singleDate?.getFullYear() : ""
  const endDateYear = endDate?.getFullYear() ? endDate?.getFullYear() : ""

  const month = startMonth === endMonth ?
    `${startMonth}  `
    :
    `${startMonth} , ${endMonth}`

  const years = startYear === endDateYear ?
    `${startYear}`
    :
    `${endDateYear}  ${endDateYear}`


  const handleSubmit = () => {
    if (singleDate !== undefined && endDate !== undefined && totalDays > 0 && leadCounts > 0) {
      if (endDate >= singleDate) {

        if (props?.id !== undefined) {

          const updatedRecords = records?.length > 0 ? records?.map((rec) => {
            if (rec.id === props.id) {
              return {
                id: props?.id,
                startDate: singleDate,
                endDate: endDate,
                excludedDates: multipleDates,
                totalDays: totalDays,
                leadCounts: leadCounts,
                expectedDrr: drr,
                monthAndYear: `${month} , ${years}`
              }
            }
            return rec
          })
            :
            [{
              id: props?.id,
              startDate: singleDate,
              endDate: endDate,
              excludedDates: multipleDates,
              totalDays: totalDays,
              leadCounts: leadCounts,
              expectedDrr: drr,
              monthAndYear: `${month} , ${years}`
            }]

          setRecords(updatedRecords)
          const obj = {
            id: props?.id,
            startDate: singleDate,
            endDate: endDate,
            excludedDates: multipleDates,
            totalDays: totalDays,
            leadCounts: leadCounts,
            expectedDrr: drr,
            monthAndYear: `${month} , ${years}`
          }
          updateRecordInCell(obj)

        }
        else {
          const obj = {
            id: generateUniqueId(),
            startDate: singleDate,
            endDate: endDate,
            excludedDates: multipleDates,
            totalDays: totalDays,
            leadCounts: leadCounts,
            expectedDrr: drr,
            monthAndYear: `${month} , ${years}`
          }
          setRecords([...records, obj])
          addRecordInCell(obj)
        }
      }

    }
    props?.handleClose && props.handleClose()
  }

  function addRecordInCell(obj: obj) {
    if (obj !== undefined) {
      const formatExludedDate = obj.excludedDates?.reduce((next, curr) => {
        return next + " " + format(curr, "dd-MM-yyy")
      }, "")
      
      setCells(
        [...cells,
        [
          {
            value:
              <span className="grid grid-cols-2 gap-2">
                <PopoverEditCard {...obj} />
                <AlertDiologDelete {...obj} />
              </span>
            ,
            key: "actions",
          },
          {
            value: `${obj.id}`,
            key: "id",
          },
          {
            value: `${format(obj.startDate, "dd-MM-yyyy")}`,
            key: "start_date",
          },
          {
            value: `${format(obj.endDate, "dd-MM-yyyy")}`,
            key: "end_date",
          },
          {
            value: obj.monthAndYear,
            key: "month_year",
          },
          {
            value: formatExludedDate,
            key: "date_exc",
          },
          {
            value: obj?.totalDays.toString() || "0",
            key: "num_of_days",
          },
          {
            value: obj?.leadCounts.toString() || "0",
            key: "lead_count",
          },
          {
            value: obj?.expectedDrr?.toFixed(4).toString() || "0",
            key: "exp_drr",
          },
          {
            value: `${format(new Date(), "dd-MM-yyyy")}`,
            key: "last_updated",
          },
        ]
        ]
      )
    }

  }

  function updateRecordInCell(obj: obj) {
    const updatedCells = cells?.map((cell) => {
      if (cell[1].key === "id" && cell[1].value === obj.id) {
        const formatedDates = cell[5].value;
        return [
          {
            value:
              <span>
                <PopoverEditCard {...obj} />
                <AlertDiologDelete {...obj} />
              </span>
            ,
            key: "actions",
          },
          {
            value: `${obj.id}`,
            key: "id",
          },
          {
            value: `${format(obj.startDate, "dd-MM-yyyy")}`,
            key: "start_date",
          },
          {
            value: `${format(obj.endDate, "dd-MM-yyyy")}`,
            key: "end_date",
          },
          {
            value: obj.monthAndYear,
            key: "month_year",
          },
          {
            value: formatedDates,
            key: "date_exc",
          },
          {
            value: obj?.totalDays.toString() || "0",
            key: "num_of_days",
          },
          {
            value: obj?.leadCounts.toString() || "0",
            key: "lead_count",
          },
          {
            value: obj?.expectedDrr?.toFixed(4).toString() || "0",
            key: "exp_drr",
          },
          {
            value: `${format(new Date(), "dd-MM-yyyy")}`,
            key: "last_updated",
          },
        ]
      }
      return cell
    })

    setCells([...updatedCells])
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3">
        <div>
          <PopoverCalendar mode="single" selected={singleDate} onSelect={setSingleDate} title={singleDateUI} fromDate={new Date()} submitBtn={true} handleSubmit={handleDateSubmit} />
        </div>
        <span className="text-center">
          |
        </span>
        <div>
          {
            singleDate?.toLocaleString()?.slice(0, 8)
          }
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <PopoverCalendar mode="single" selected={endDate} onSelect={setEndDate} title={endDateUI} fromDate={singleDate} submitBtn={true} handleSubmit={handleDateSubmit} />
        </div>
        <span className="text-center">
          |
        </span>
        <div>
          {
            endDate?.toLocaleString()?.slice(0, 8)
          }
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <PopoverCalendar mode="multiple" selected={multipleDates} onSelect={setMultipleDates} title={excludeDatesUI} fromDate={singleDate} toDate={endDate} submitBtn={true} handleSubmit={handleDateSubmit} />
        </div>
        <span className="text-center">
          |
        </span>
        <div className=" grid grid-cols-1 sm:grid-cols-2">
          {
            multipleDates?.map((exc: Date, ind: number) => {
              return (
                <span key={ind}>
                  {exc.toLocaleString().slice(0, 8)}
                </span>
              )
            })
          }
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className=" w-full">
          <span className="flex gap-6">
            <CalendarCheck2Icon />
            <span>Months,year</span>
          </span>
        </div>
        <span className="text-center">
          |
        </span>
        <div className="flex gap-2">
          <span>
            {month}
          </span>
          <span>
            {years}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="flex gap-6">
          <CalculatorIcon color="#8080ff" />
          <span>
            Total Days
          </span>
        </div>
        <span className="text-center">
          |
        </span>
        <div>
          {
            totalDays
          }
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex gap-6">
          <Tally5Icon color="#34cb9a" className=" self-center" size={30} />
          <span className="relative">
            <Input type="number" placeholder="Lead counts" className="remove-arrow w-full pr-16" ref={inputRef} onKeyDown={event => event.key === "Enter" || event.keyCode === 13 ? handleLeadCountChange() : null} />
            <span className=" absolute top-2 right-2 cursor-pointer hover:opacity-70" onClick={handleLeadCountChange}><Play color="#00ff00" /></span>
          </span>
        </div>
        <span className="text-center">
          |
        </span>
        <div>
          {
            leadCounts
          }
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex gap-6">
          <CircleEqualIcon color="#00ff00" />
          <span>Expected DRR</span>
        </div>
        <span className="text-center">
          |
        </span>
        <div>
          {
            drr
          }
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-center">
        <Button type="button" className="text-white font-bold" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}
