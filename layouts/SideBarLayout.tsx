import { useContext } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import SideBar from "../components/layout/sidebarLayout/SideBar";
import appContext from "../context/appContext";
import { Clock, BarChart2 } from "react-feather";

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  const { setCollapse, collapse } = useContext(appContext)!;
  return (
    <div className="flex max-h-screen min-h-screen">
      {/* children */}
      <div className="flex w-full overflow-x-scroll scrollbar-none   bg-hrm-bg-top bg-no-repeat object-contain bg-cover bg-right-bottom ">
        {children}
      </div>

      {/* sidebar */}
      <button
        className={`${
          collapse ? "right-[215px]" : "right-[70px]"
        } hidden md:block  bg-white p-1 top-7 rounded-full absolute border-firstColor-900 border-2  transition-all duration-500 z-10`}
        onClick={() => setCollapse((prev: any) => !prev)}
      >
        {collapse ? (
          <ChevronRight className="" size={25} />
        ) : (
          <ChevronLeft className="" size={25} />
        )}
      </button>
      <div className="h-full hidden  md:contents ">
        <SideBar />
      </div>

      {/* bottomNav */}
      <div className="md:hidden flex w-full h-14  justify-around border-t-2 border-t-blue-700 m-0 bg-firstColor-900 px-3 py-2   text-white fixed bottom-0 left-0 right-0  z-10">
        <div className="flex flex-col items-center">
          <Clock size={25} className=" " />
          <span className="text-xs mt-[2px]">ثبت حضور</span>
        </div>{" "}
        <div className="flex flex-col items-center">
          <Clock size={25} className=" " />
          <span className="text-xs mt-[2px]">ثبت حضور</span>
        </div>{" "}
        <div className="flex flex-col items-center">
          <Clock size={25} className=" " />
          <span className="text-xs mt-[2px]">ثبت حضور</span>
        </div>
      </div>
    </div>
  );
};

export default SideBarLayout;
