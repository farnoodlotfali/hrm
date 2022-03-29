import { useMediaQuery } from "@mui/material";
import { BarChart, BarChart2, Info } from "react-feather";
import SideBarLayout from "../layouts/SideBarLayout";

const test = () => {
  const matches = useMediaQuery("(max-width:768px)");
  return (
    <div className="flex md:flex-row flex-col w-full h-full overflow-y-scroll  gap-8 md:p-12 p-4 md:pb-0 pb-16 ">
      <div className=" md:w-1/2 w-full  flex flex-col gap-8 justify-center ">
        <div className="md:flex hidden h-96 justify-center items-center bg-white text-8xl rounded-lg shadow-normal ">
          نمودار
        </div>
        <div className="md:h-56 h-32  p-5 bg-white rounded-lg shadow-normal ">
          <div className="text-right font-bold md:text-3xl text-sm">
            مانده حساب
          </div>
          <div className="h-full flex justify-center items-center md:text-5xl text-3xl font-bold ">
            تومان 0
          </div>
        </div>
      </div>

      <div className="bg-white md:w-1/2 w-full h-fit  rounded-lg p-6  shadow-normal">
        <div className=" md:text-3xl text-sm text-right font-bold md:my-10 my-3">
          حساب مالی
        </div>
        <div className="flex justify-between items-center shadow-normal  rounded-lg py-3 px-5 my-5 border border-gray-200">
          <div className="">
            <Info size={matches ? 20 : 25} />
          </div>
          <div className="flex items-center text-right">
            <div className="">
              <div className="md:text-lg text-sm">تومان ۰</div>
              <div className="text-gray-400 md:text-xs  text-[9px] ">
                برداشت وجه
              </div>
            </div>
            <div className="bg-gray-200 rounded-full p-3 ml-3">
              <BarChart size={matches ? 25 : 35} className="text-red-500 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

test.PageLayout = SideBarLayout;
export default test;
