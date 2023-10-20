import { StoreState, store } from '@/hooks/zustand-store/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import format from 'date-fns/format';
// const data = [
//   { name: 'Page A', uv: 4000 },
//   { name: 'Page B', uv: 3000 },
//   { name: 'Page C', uv: 2000 },
//   { name: 'Page D' },
//   { name: 'Page E', uv: 1890 },
//   { name: 'Page F', uv: 2390 },
//   { name: 'Page G', uv: 3490 },
// ];




export default function ScatterChart1(){
  const records = store(state=>(state as StoreState).records);
  const data2 = records.map((rec,ind)=>{
     const obj = {name:`${format(rec.startDate,"dd-MM-yy")} : ${format(rec.endDate,"dd-MM-yy")}-${ind}`,DRR:rec.expectedDrr}
     return obj
  })

  

  if(data2.length === 0){
    return(
      <div>
        Line chart , No data
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }} className='grid grid-cols-1 gap-10 justify-items-center'>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={data2}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          className=' bg-card rounded text-primary'
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="DRR" stroke="rgb(34, 197, 94)" fill="rgb(34, 197, 94)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
