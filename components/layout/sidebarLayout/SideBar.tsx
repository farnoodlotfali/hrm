import { useContext } from "react";
import appContext from "../../../context/appContext";
import Image from "next/image";
import {
  Clock,
  BarChart2,
  Bell,
  User,
  LogOut,
  CreditCard,
} from "react-feather";
import SideBarItem from "./SideBarItem";
const SideBar = () => {
  const { collapse, userLogout } = useContext(appContext)!;
  const myloader = ({ src }: { src: string }): string => {
    return src;
  };
  return (
    <div
      className={`sideBar flex flex-col justify-between bg-white py-3 transition-all duration-500 min-h-screen shadow-normalMd ${
        collapse ? "w-56" : "w-20"
      }`}
    >
      {/* top */}
      <div className="">
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
        <SideBarItem
          label="ثبت حضور"
          icon={<Clock size={40} className="mx-4 py-1" />}
          link={"/work"}
        />
        <SideBarItem
          label="مشاهده"
          icon={<BarChart2 size={40} className="mx-4 py-1" />}
          link={"/statistics"}
        />
        <SideBarItem
          label="حساب مالی"
          icon={<CreditCard size={40} className="mx-4 py-1" />}
          link={"/financial"}
        />
      </div>

      {/* bottom */}
      <div className="">
        <SideBarItem
          label="اعلانات"
          icon={<Bell size={40} className="mx-4 py-1" />}
          link={"/financial"}
          disable
        />
        <SideBarItem
          label="حساب کاربری"
          icon={<User size={40} className="mx-4 py-1" />}
          link={"/financial"}
          disable
        />
        <div className="flex justify-end overflow-hidden hover:bg-gray-100 cursor-pointer mt-2 py-2 border-r-4 bg-blue-50">
          <div className="whitespace-nowrap mr-3 self-center">خروج</div>
          <div className="">
            <LogOut size={40} className="mx-4 py-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
