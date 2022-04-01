import { RefreshCw, Trash2 } from "react-feather";
import { DoneWork } from "../../typings";
import { enToFaDigit } from "../../utils/utility";

interface TableSecProps {
  data: DoneWork[] | null;
}

const TableSec: React.FC<TableSecProps> = ({ data }) => {
  return (
    <div className="md:block hidden  max-h-screen overflow-scroll shadow-normalMd rounded-lg mt-5 border border-black">
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
                          <bdi className="flex items-center  flex-wrap">
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
