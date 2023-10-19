import { create } from "zustand";

export type obj = {
    id:string,
    startDate:Date,
    endDate:Date,
    excludedDates:Date[] | [],
    totalDays:number,
    leadCounts:number,
    expectedDrr:number,
    monthAndYear:string
}

export type updateRecords = {
    id?:string,
    startDate?:Date,
    endDate?:Date,
    excludedDates?:Date[] | [],
    totalDays?:number,
    leadCounts?:number,
    expectedDrr?:number,
    monthAndYear?:string
}

type cells = Array<Array<{ key: string, value: string  | any}>> | []
type records = Array<obj>



export type StoreState = {
    cells: cells;
    records: records;
    setCells: (cells: cells) => void,
    setRecords:(records:records)=>void,
    inserted:number,
    setInserted:(inserted:number)=>void,
    updated:number,
    setUpdated:(updated:number)=>void,
    latestUpdateId:string,
    setLatestUpdatedId:(latestUpdateId:string)=>void,
    

    // Add any other properties in your store if needed
  };
export const store = create((set)=>({
    cells:[],
    setCells:(cells:cells)=>set({cells:cells}),
    records:[],
    setRecords:(records:records)=>set({records}),
    inserted:0,
    setInserted:(inserted:number)=>set({inserted}),
    updated:0,
    setUpdated:(updated:number)=>set({updated}),
    latestUpdateId:"",
    setLatestUpdatedId:(latestUpdateId:string)=>set({latestUpdateId})
}))