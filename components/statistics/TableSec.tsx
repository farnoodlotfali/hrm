import { Modal } from "@mui/material";
import { useState } from "react";
import { RefreshCw, Trash2 } from "react-feather";
import { DoneWork } from "../../typings";
import { enToFaDigit } from "../../utils/utility";

interface TableSecProps {
  data: DoneWork[] | null;
  deleteTask: (id: number) => void;
}

const TableSec: React.FC<TableSecProps> = ({ data, deleteTask }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [idForDelete, setIdForDelete] = useState<number>(0);

  const handleClick = (id: number) => {
    setOpen(true);
    setIdForDelete(id);
  };

  const handleDeleteBtn = () => {
    deleteTask(idForDelete);
    setTimeout(() => {
      setOpen(false);
    }, 1200);
  };
  return (
    <div className="md:block hidden  max-h-screen overflow-scroll shadow-normalMd rounded-lg mt-5 border border-black">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className=" md:w-2/5 w-4/5  dir-rtl p-5 rounded  -translate-x-1/2 -translate-y-1/2  bg-hrm-bg-top bg-no-repeat object-contain bg-cover bg-right-bottom   absolute top-1/2 left-1/2 ">
          <div className="border-b border-b-firstColor-200 font-semibold p-2 text-center text-2xl">
            هشدار
          </div>

          <div className="p-4">آیا برای حذف مطمئن هستید؟</div>

          <div className="flex gap-5 border-t border-t-firstColor-200 p-2">
            <button
              onClick={() => setOpen(false)}
              className="min-w-[120px] text-sm bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 border-b-4 border-red-700 hover:border-red-500 rounded"
            >
              کنسل
            </button>
            <button
              onClick={() => handleDeleteBtn()}
              className="min-w-[100px] text-sm bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              بله
            </button>
          </div>
        </div>
      </Modal>

      <table className="  w-full bg-white ">
        <thead className="sticky top-[-1px] bg-white  shadow-[0_1px_1px_black] ">
          <tr>
            <th className="p-2 border-r-2 border-b-2    w-[7%] ">تغییر</th>
            <th className="p-2 border-r-2 border-b-2    w-[7%] ">کارکرد</th>
            <th className="p-2 border-r-2 border-b-2    w-[7%] ">خروج</th>
            <th className="p-2 border-r-2 border-b-2    w-[7%] ">ورود</th>
            <th className="p-2 border-r-2 border-b-2    w-[7%] ">تاریخ</th>
            <th className="p-2 border-r-2 border-b-2    w-[25%]">یادداشت</th>
            <th className="p-2 border-r-2 border-b-2    w-[35%] ">
              کار و بورد
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => {
              return (
                <tr
                  key={item.actionId}
                  className="odd:bg-white even:bg-slate-100 "
                >
                  <td className="p-2 border-r-2 border-b-2 ">
                    <div className="flex justify-between">
                      <Trash2
                        onClick={() => handleClick(item.actionId)}
                        size={25}
                        className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                      />
                      <RefreshCw
                        size={25}
                        className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                      />
                    </div>
                  </td>
                  <td className="p-2 border-r-2 border-b-2 text-center">
                    {enToFaDigit(item.workingTime)!}
                  </td>
                  <td className="p-2 border-r-2 border-b-2 text-center">
                    {enToFaDigit(item.logoutTime)!}
                  </td>
                  <td className="p-2 border-r-2 border-b-2 text-center">
                    {enToFaDigit(item.loginTime)!}
                  </td>
                  <td className="p-2 border-r-2 border-b-2 text-center ">
                    {enToFaDigit(item.date)!}
                  </td>
                  <td className="p-2 border-r-2 border-b-2 ">
                    <bdi className="">{item.logoutComment}</bdi>
                  </td>
                  <td className="p-2 border-r-2 border-b-2 ">
                    <div className="flex flex-wrap justify-end">
                      {item.tasks.map((task) => {
                        return (
                          <bdi
                            key={task.id}
                            className="flex items-center  flex-wrap"
                          >
                            <div className=""> {task.name} </div>
                            <div className="text-gray-400 text-[8px]">
                              ( {task.board} )
                            </div>{" "}
                            -{" "}
                          </bdi>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableSec;
