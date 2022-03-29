import { useContext } from "react";
import appContext from "../../../context/appContext";
import Image from "next/image";
import { Clock, BarChart2 } from "react-feather";
const SideBar = () => {
  const { collapse, userLogout } = useContext(appContext)!;
  const myloader = ({ src }: { src: string }): string => {
    return src;
  };
  return (
    <div
      className={`sideBar bg-white py-3 transition-all duration-500 min-h-screen shadow-normalMd ${
        collapse ? "w-56" : "w-20"
      }`}
    >
      <div className="flex items-center ">
        <Image
          className="pl-3"
          src={"/logoFa.svg"}
          alt="kashanplus-logo"
          layout="fixed"
          width={300}
          height={50}
          loader={myloader}
          unoptimized
        />
        <div>
          <Image
            src={"/logo.svg"}
            alt="kashanplus-logo"
            loader={myloader}
            unoptimized
            layout="fixed"
            width={80}
            height={60}
          />
        </div>
      </div>
      <div className="flex justify-end overflow-hidden bg-gray-100 mt-2 py-2 border-r-4 border-firstColor-900">
        <div className="whitespace-nowrap mr-3 self-center">ثبت حضور</div>
        <div className="">
          <Clock size={40} className="mx-4 py-1" />
        </div>
      </div>{" "}
      <div className="flex justify-end overflow-hidden bg-gray-100 mt-2 py-2 border-r-4">
        <div className="whitespace-nowrap mr-3 self-center">مشاهده آمار</div>
        <div className="">
          <BarChart2 size={40} className="mx-4 py-1" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
