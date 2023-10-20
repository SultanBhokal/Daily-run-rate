import BarChart1 from "./components/charts/Areachart1";
import ScatterChart1 from "./components/charts/Linechart1";
import DailtyRunRateContainer from "./containers/DailtyRunRateContainer";
import ResponsiveLayout from "./containers/ResponsiveLayout";

export default function App() {

  const layout ={
    lg: [
      { i: 'a', x: 0, y: 0, w: 4, h: 2 ,minH:2},
      { i: 'b', x: 0, y: 2, w: 2, h: 1 },
      { i: 'c', x: 3, y: 4, w: 2, h: 1 },
    ],
    md: [
      { i: 'a', x: 0, y: 0, w: 3, h: 2,minH:2 },
      { i: 'b', x: 0, y: 2, w: 2, h: 2 },
      { i: 'c', x: 3, y: 2, w: 1, h: 2 },
    ],
    sm: [
      { i: 'a', x: 0, y: 0, w: 2, h: 2,minW:2,minH:2 },
      { i: 'b', x: 0, y: 2, w: 2, h: 2 },
      { i: 'c', x: 0, y: 4, w: 2, h: 2 },
    ],
  };

  const components = [
    {
      key:"a",
      component: <div className=" w-full"><DailtyRunRateContainer key={"a"} /></div>
    },
    {
      key:"b",
      component:<ScatterChart1 key={"b"} />
    },
    {
      key:"c",
      component:<BarChart1 key={"c"} />
    }
  ]


  return (
    <div className="flex flex-col justify-center align-middle p-10 ">
      {/* <div>
        <DailtyRunRateContainer />
      </div>
      <div className=" m-20 ">
        <ScatterChart1 />
        <BarChart1 />
      </div> */}
      <ResponsiveLayout components={components} layout={layout} />
    </div>
  )
}
