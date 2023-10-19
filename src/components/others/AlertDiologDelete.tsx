import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { StoreState, obj, store } from "@/hooks/zustand-store/store"
import { Trash2 } from "lucide-react"


export default function AlertDiologDelete(obj:obj) {
  const cells = store(state=>(state as StoreState).cells)
  const setCells = store(state=>(state as StoreState).setCells)
  const records = store(state=>(state as StoreState).records)
  const setRecords = store(state=>(state as StoreState).setRecords)

  function handleDelete(){
    const filteredCells = cells.filter(cell=>cell[1].value !== obj.id)
    const filteredRecords = records.filter(rec=>rec.id !== obj.id)
    setCells(filteredCells)
    setRecords(filteredRecords)
  }
  
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className=" hover:opacity-70"><Trash2 color="red" /></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this record
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
