import { useEffect, useState } from "react";

import AppContext from "./appContext";
import Cookies from "js-cookie";
import { User } from "../typings";
import { useRouter } from "next/router";

const AppState = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [sideBarItemKey, setSideBarItemKey] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [taskId, setTaskId] = useState<number>(0);

  // useEffect(() => {
  //   // setSideBarItemKey(location.pathname);
  // }, [location]);

  useEffect(() => {
    check();
    // eslint-disable-next-line
  }, [router.pathname]);

  // check user
  const check = () => {
    if (!Cookies.get("kashanPlusUser")) {
      setUser(null);
      // navigate("/");
    } else {
      setUser(JSON.parse(Cookies.get("kashanPlusUser")!));
    }
  };

  //logout user
  const userLogout = () => {
    Cookies.remove("kashanPlusUser");
    setUser(null);
    router.push("/");
  };
  return (
    <AppContext.Provider
      value={{
        collapse: collapse,
        setCollapse,
        sideBarItemKey: sideBarItemKey,
        setSideBarItemKey,
        user: user,
        setUser,
        userLogout,
        taskId: taskId,
        setTaskId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
