import { Responsive, WidthProvider } from "react-grid-layout";
import "../styles/editableLayout.scss";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutIcon } from "lucide-react";

const ResponsiveGridLayout = WidthProvider(Responsive);

type layout = {
  i: string,
  x: number,
  y: number,
  w: number,
  h: number,
  minH?:number,
  minW?:number
};

type componentObject = {
  key: string;
  component: React.ReactNode;
};

type layouts = {
  lg?:layout[],
  md?:layout[],
  sm?:layout[]
}

type props = {
  layout:layouts,
  components: Array<componentObject>;
};

export default function ResponsiveLayout(props: props) {
  const { layout, components } = props;
  // const [layouts, setLayouts] = useState(layout)
  const [flag, setFlag] = useState(false)




  return (
    <div>
      <Button type="button" className=" fixed bottom-5 right-2  hover:opacity-75 z-50" onClick={()=>setFlag(prev=>!prev)}>
        <LayoutIcon color="white" />
      </Button>
      <ResponsiveGridLayout
        className="layout"
        layouts={layout }
        isDraggable={flag}
        isResizable={flag}
        width={500} // Initial width
        rowHeight={300} // Initial height
        cols={{ lg: 4, md: 3, sm: 2 }}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        onLayoutChange={(newLayout) => {
          console.log(newLayout)
          // setLayouts(newLayout)
        }}
        
        

        style={{ width: "100%", height: "100%" }} // Full width and height
      >
        {
          components?.map(({ component, key }) => {
            return (
              <div key={key} className={flag ? " bg-slate-700 border-primary cursor-move" : "bg-transparent border-transparent"}>
                {
                  component
                }
              </div>
            )
          })
        }
      </ResponsiveGridLayout>
    </div>
  );
}
