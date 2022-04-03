import { memo, useContext } from "react";
import {
  CornerLeftDown,
  CornerRightDown,
  RefreshCw,
  Trash2,
  X,
} from "react-feather";
import appContext from "../../context/appContext";
import { DoneWork } from "../../typings";
import { enToFaDigit } from "../../utils/utility";

interface RecordCardProps {
  item: DoneWork;
}

const RecordCard: React.FC<RecordCardProps> = ({ item }) => {
  const { setOpenDrawer, setDrawerContent } = useContext(appContext)!;

  //for change content of drawer
  const handleClick = (item: DoneWork) => {
    let component = (
      <div className=" h-full">
        <div className="p-6 grid h-full">
          <div className="flex justify-between">
            <div className="text-base mt-2 text-center">
              {enToFaDigit(item.date)!}
            </div>
            <div className="flex gap-5">
              <Trash2 size={25} className="text-red-600  " />
              <RefreshCw size={25} className="text-blue-600 " />
              <X
                onClick={() => setOpenDrawer(false)}
                size={28}
                className="text-gray-600 "
              />
            </div>
          </div>
          <div className="mt-5 text-justify text-xs  dir-rtl leading-7  ">
            <span className="flex font-bold">
              کار و بورد
              <CornerLeftDown className=" mt-3 mr-1" size={12} />
            </span>
            {item.tasks.length > 0 ? (
              item.tasks.map((task) => {
                return (
                  <bdi key={task.id} className="flex items-center  flex-wrap">
                    <div className=""> {task.name} </div>
                    <div className="text-gray-400 text-[8px]">
                      ( {task.board} )
                    </div>
                    -
                  </bdi>
                );
              })
            ) : (
              <div className="text-rose-500">بدون عنوان</div>
            )}
          </div>
          <div className="mt-5 text-justify text-xs  dir-rtl leading-7  ">
            <span className="flex font-bold">
              یادداشت
              <CornerLeftDown className=" mt-3 mr-1" size={12} />
            </span>
            <p>
              {item.logoutComment! || (
                <span className="text-rose-500">بدون یادداشت</span>
              )}
            </p>
          </div>

          <div className="flex justify-between  mt-5">
            <div className="flex flex-col items-center justify-center">
              <span className="flex text-xs font-bold">
                <CornerLeftDown className=" mt-2 mr-1" size={12} />
                خروج
                <CornerRightDown className=" mt-2 ml-1" size={12} />
              </span>
              <span className="text-xs mt-1">
                {enToFaDigit(item.logoutTime)!}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="flex text-xs font-bold">
                <CornerLeftDown className=" mt-2 mr-1" size={12} />
                ورود
                <CornerRightDown className=" mt-2 ml-1" size={12} />
              </span>
              <span className="text-xs mt-1">
                {enToFaDigit(item.loginTime)!}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="flex text-xs font-bold">
                <CornerLeftDown className=" mt-2 mr-1" size={12} />
                کارکرد
                <CornerRightDown className=" mt-2 ml-1" size={12} />
              </span>
              <span className="text-xs mt-1">
                {enToFaDigit(item.workingTime)!}
              </span>
            </div>
          </div>
        </div>

        <div className="self-end border-t border-t-firstColor-700 w-full py-3">
          <button
            onClick={() => setOpenDrawer(false)}
            className="w-1/3 text-xs bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            بستن
          </button>
        </div>
      </div>
    );
    setDrawerContent(component);
    setTimeout(() => {
      setOpenDrawer(true);
    }, 300);
  };
  const truncate = (str: string) => {
    if (str.length === 0) {
      return <div className="text-red-400">بدون عنوان</div>;
    }
    return str.length > 10 ? "..." + str.substring(0, 25) : str;
  };
  return (
    <div
      onClick={() => handleClick(item)}
      className="bg-white my-4 p-6 rounded-lg shadow-normal border border-firstColor-500"
    >
      <div className="flex w-full justify-evenly items-center ">
        <div className="text-xs">{enToFaDigit(item.date)!}</div>
        <div className="text-sm min-w-[100px] ">
          {truncate(`${item.tasks.map((task) => task.name)}`)}
        </div>
      </div>
    </div>
  );
};

export default memo(RecordCard);
