import { useContext } from "react";
import appContext from "../../../context/appContext";

const SideBarItem = () => {
  const { collapse } = useContext(appContext)!;
  return (
    <div
      className={`sideBar bg-white py-3  d-lg-block d-none ${
        collapse ? "sidebarOpen" : "sidebarClose"
      }`}
    >
      SideBarItem
    </div>
  );
};

export default SideBarItem;
