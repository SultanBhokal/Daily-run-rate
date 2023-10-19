import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type cells = Array<Array<{ key: string, value: string }>>


type props = {
  tableHeaders?: Array<obj>,
  tableCell?: cells,
  caption?: string
}

type obj = {
  title: string,
  key: string

}

type cell = {
  value: string | any,
  key: string
}

export default function Table1(props: props) {

  const { tableHeaders, tableCell, caption } = props

  return (
    <div className=" bg-background ">
      <Table>
        <TableCaption>{caption ? caption : "A list of your recent invoices."}</TableCaption>
        <TableHeader>
          <TableRow className="">
            {
              tableHeaders?.map((header: obj, ind: number) => {
                return (
                  <TableHead className="w-[100px]" key={header?.key || ind}>
                    {
                      header.title
                    }
                  </TableHead>
                )
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            tableCell?.map((cell: Array<Object>,ind) => {
              return (
                <TableRow key={ind}>
                  {
                    cell?.map((record: any) => {
                      return (
                        <TableCell key={record.key} className="relative">
                          {
                            typeof(record.value) === "string"?
                            record.key !== "id"?
                            record.value
                            :
                            ind + 1
                            :
                            <div className="relative">
                              {record.value}
                            </div>
                          }
                        </TableCell>
                      )
                    })
                  }
                </TableRow>
              )
            })
          }

        </TableBody>
      </Table>

    </div>
  )
}
