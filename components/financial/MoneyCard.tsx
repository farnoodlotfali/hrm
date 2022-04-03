import { Modal, useMediaQuery } from "@mui/material";
import { memo, useContext, useState } from "react";
import { BarChart, Info } from "react-feather";
import appContext from "../../context/appContext";
import { TransactionCard } from "../../typings";
import { commafy, enToFaDigit } from "../../utils/utility";

interface MoneyCardProps {
  item: TransactionCard;
}

const MoneyCard: React.FC<MoneyCardProps> = ({ item }) => {
  const matches = useMediaQuery("(max-width:768px)");
  const { setDrawerContent, setOpenDrawer } = useContext(appContext)!;
  const handleClick = () => {
    if (matches) {
      let component = (
        <div className="p-6 flex flex-col  h-full">
          <div className="flex justify-between">
            <div className="flex  gap-8">
              <div>{new Date(item.time * 1000).toLocaleTimeString("fa")}</div>
              <div>{new Date(item.time * 1000).toLocaleDateString("fa")}</div>
            </div>
            <div className="font-bold ">
              {item.credit === 0 ? "برداشت وجه" : "واریز  وجه"}
            </div>
          </div>

          <div className="flex flex-col my-5">
            <div className="flex items-center mt-5">
              <span className=" text-xs">۱۵:۵۷:۴۱</span>
              <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
              <div className="whitespace-nowrap text-xs">ساعت کاری پروژه X</div>
            </div>{" "}
            <div className="flex items-center mt-5">
              <span className=" text-xs">۱۵:۵۷:۴۱</span>
              <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
              <div className="whitespace-nowrap text-xs">ساعت کاری پروژه X</div>
            </div>{" "}
            <div className="flex items-center mt-5">
              <span className=" text-xs">۱۵:۵۷:۴۱</span>
              <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
              <div className="whitespace-nowrap text-xs">ساعت کاری پروژه X</div>
            </div>{" "}
            <div className="flex items-center mt-5">
              <span className=" text-xs">۱۵:۵۷:۴۱</span>
              <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
              <div className="whitespace-nowrap text-xs">ساعت کاری پروژه X</div>
            </div>{" "}
            <div className="flex items-center mt-5">
              <span className=" text-xs">۱۵:۵۷:۴۱</span>
              <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
              <div className="whitespace-nowrap text-xs">ساعت کاری پروژه X</div>
            </div>{" "}
            <div className="flex items-center mt-5">
              <span className=" text-xs">۱۵:۵۷:۴۱</span>
              <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
              <div className="whitespace-nowrap text-xs">ساعت کاری پروژه X</div>
            </div>{" "}
            <div className="flex items-center mt-5">
              <span className=" text-xs">۱۵:۵۷:۴۱</span>
              <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
              <div className="whitespace-nowrap text-xs">ساعت کاری پروژه X</div>
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
    } else {
      handleOpen();
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div
        onClick={() => handleClick()}
        className="bg-white flex justify-between items-center shadow-normal  rounded-lg py-3 px-5 my-5 border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer"
      >
        <div className="">
          <Info size={matches ? 20 : 25} />
        </div>
        <div className="flex items-center text-right">
          <div className="">
            <div className="md:text-lg text-sm">
              {item.credit === 0
                ? enToFaDigit(commafy(item.debit).toString())
                : enToFaDigit(commafy(item.credit).toString())}{" "}
              تومان
            </div>
            <div className="text-gray-400 md:text-xs  text-[9px] ">
              {item.credit === 0 ? "برداشت وجه" : "واریز  وجه"}
            </div>
          </div>
          <div className="bg-gray-200 rounded-full p-3 ml-3">
            <BarChart
              size={matches ? 25 : 35}
              className={`${
                item.credit === 0
                  ? "text-red-500 scale-x-[-1] "
                  : "text-green-500 "
              }`}
            />
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal
        className="md:block hidden"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="w-3/4 p-8 rounded  -translate-x-1/2 -translate-y-1/2 bg-white absolute top-1/2 left-1/2 ">
          <div className="flex justify-between text-xl">
            <div className="flex gap-10">
              <div className="">
                {new Date(item.time * 1000).toLocaleTimeString("fa")}
              </div>
              <div className="">
                {new Date(item.time * 1000).toLocaleDateString("fa")}
              </div>
            </div>
            <div className="font-bold text-2xl">
              {item.credit === 0 ? "برداشت وجه" : "واریز  وجه"}
            </div>
          </div>

          <div className="flex gap-8 mt-8 ">
            <div className="w-1/3">
              <textarea
                className="h-52 w-full border border-firstColor-900 shadow-normal rounded-lg dir-rtl p-3"
                placeholder="یادداشت..."
              />
            </div>
            <div className="w-2/3 grid">
              <div className="flex items-center">
                <span>۱۵:۵۷:۴۱</span>
                <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
                <div className="whitespace-nowrap ">ساعت کاری پروژه X</div>
              </div>
              <div className="flex items-center">
                <span>۱۵:۵۷:۴۱</span>
                <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
                <div className="whitespace-nowrap ">نرخ پروژه X</div>
              </div>
              <div className="flex items-center">
                <span>۱۵:۵۷:۴۱</span>
                <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
                <div className="whitespace-nowrap ">ساعت کاری پروژه X </div>
              </div>
              <div className="flex items-center">
                <span>۱۵:۵۷:۴۱</span>
                <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
                <div className="whitespace-nowrap ">نرخ پروژه X</div>
              </div>
              <div className="flex items-center">
                <span>۱۵:۵۷:۴۱</span>
                <span className="w-full border-b border-b-gray-400 mx-3 border-dashed "></span>
                <div className="whitespace-nowrap ">جمع کل</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(MoneyCard);
