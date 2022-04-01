import { useState } from "react";

//layout
import SideBarLayout from "../layouts/SideBarLayout";

//components
import LiveTimerSec from "../components/work/LiveTimerSec";
import SetTimerSec from "../components/work/SetTimerSec";

const Work = () => {
  const [model, setModel] = useState<boolean>(true);

  return (
    <div className="w-full ">
      <section
        className={`${
          model ? "bg-firstColor-900" : "bg-secondColor-900"
        } flex justify-center items-center p-5 transition-all duration-500 relative  min-h-screen  md:pb-0 pb-20 `}
      >
        <div className="overflow-hidden  con relative lg:w-[800px] w-[400px]  h-[500px] bg-white  rounded-lg">
          <LiveTimerSec model={model} setModel={setModel} />
          {/* /////*********************** */}
          <SetTimerSec model={model} setModel={setModel} />
        </div>
      </section>
    </div>
  );
};
Work.PageLayout = SideBarLayout;

export default Work;
