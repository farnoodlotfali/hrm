import Image from "next/image";
import SideBarLayout from "../layouts/SideBarLayout";
import { myloader } from "../utils/utility";

const test = () => {
  return (
    <div className="flex flex-col h-fit">
      <Image
        className="animate-spin"
        src={"/logo.svg"}
        alt="kashanplus-logo"
        loader={myloader}
        unoptimized
        layout="fixed"
        width={80}
        height={60}
      />
      <span className="text-xs text-firstColor-800 mt-2">در حال بارگذاری</span>
    </div>
  );
};

test.PageLayout = SideBarLayout;
export default test;
