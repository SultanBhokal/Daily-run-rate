import BarChart1 from "./components/charts/BarChart1";
import ScatterChart1 from "./components/charts/ScatterChart1";
import DailtyRunRateContainer from "./containers/DailtyRunRateContainer";

export default function App() {
  return (
    <div className="flex flex-col justify-center align-middle">
      <div>
        <DailtyRunRateContainer />
      </div>
      <div className=" m-20 ">
        <ScatterChart1 />
        <BarChart1 />
      </div>
    </div>
  )
}
