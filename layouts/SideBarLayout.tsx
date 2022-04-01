import { useContext } from "react";
import {
  BarChart2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from "react-feather";
import SideBar from "../components/layout/sidebarLayout/SideBar";
import appContext from "../context/appContext";
import { Clock } from "react-feather";
import { Drawer, SwipeableDrawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BottomNavItem from "../components/layout/sidebarLayout/BottomNavItem";

const useStyles = makeStyles(() => ({
  paper: {
    // top: "170px",
    borderTopLeftRadius: " 40px",
    borderTopRightRadius: " 40px",
    zIndex: "1000px",
    maxHeight: "90vh",
  },
}));

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  const { setCollapse, collapse, openDrawer, setOpenDrawer, drawerContent } =
    useContext(appContext)!;
  return (
    <div className="flex max-h-screen min-h-screen overflow-hidden">
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
        <BottomNavItem
          label="حساب مالی"
          icon={<CreditCard size={25} />}
          link="/financial"
        />
        <BottomNavItem
          label="ثبت حضور"
          icon={<Clock size={25} />}
          link="/work"
        />
        <BottomNavItem
          label="مشاهده"
          icon={<BarChart2 size={25} />}
          link="/statistics"
        />
      </div>

      {/* Drawer */}
      <Drawer
        anchor={"bottom"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.paper }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default SideBarLayout;
