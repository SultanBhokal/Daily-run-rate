import { StoreState, store } from '@/hooks/zustand-store/store';
import {  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, Line, Scatter, RadialBar, RadialBarChart, LineChart, AreaChart } from 'recharts';
import format from 'date-fns/format';




export default function BarChart1(){
  const records = store(state=>(state as StoreState).records);
  const data2 = records.map(rec=>{
     const obj = {name:`${format(rec.startDate,"dd-MM-yy")} : ${format(rec.endDate,"dd-MM-yy")}`,DRR:rec.expectedDrr}
     return obj
  })

  

  if(data2.length === 0){
    return(
      <div>
        no data
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }} className='grid grid-cols-1 gap-10 justify-items-center mt-5'>
       <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data2}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="DRR" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
