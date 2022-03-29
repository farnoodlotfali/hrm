import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChevronDown, RefreshCw, Trash2 } from "react-feather";
import SelectBox from "../components/SelectBox";
import appContext from "../context/appContext";
import SideBarLayout from "../layouts/SideBarLayout";
import ApiClass from "../newApi";
import { Year } from "../typings";

const Statistics = () => {
  const { user } = useContext(appContext)!;

  useEffect(() => {
    getDoneList();
  }, []);

  const getDoneList = () => {
    let monthdata = JSON.stringify({
      time: Math.floor(new Date().getTime() / 1000),
    });
    ApiClass.Post("rollcall/currentTime", monthdata)
      .then((res) => {
        if (res.status === 200) {
          let year = JSON.parse(res.data.Data.yare);
          let month = JSON.parse(res.data.Data.month);
          let data = JSON.stringify({
            user_id: 8,
            // user_id: user?.id,
            trello_username: "aazahedi",
            // trello_username: user?.trello_username,
            year: year,
            month: month,
          });
          setallYear(AddYear(year));
          setMonth([allMonths[month - 1].name]);
          setYear([year]);

          ApiClass.Post("rollcall/list", data)
            .then((res) => {
              if (res.status === 200) {
                // setData(res.data.Data);
                // getTotalTime();
              }
            })
            .catch((err) => {})
            .finally(() => {
              // setLoading(false);
            });
        }
      })
      .catch((err) => {});
  };
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const truncate = (str: string): string => {
    return str.length > 10 ? "..." + str.substring(0, 25) : str;
  };
  const [month, setMonth] = useState<string[]>([]);
  const [year, setYear] = useState<string[]>([]);
  const [allYear, setallYear] = useState<Year[]>([]);

  const AddYear = (val: number): Year[] => {
    var years: Year[] = [];
    years.push({ id: val, name: val.toString() });
    for (let i = 1; i < 5; i++) {
      years.push({ id: val - i, name: (val - i).toString() });
    }

    return years;
  };
  return (
    <div className=" w-full md:p-12 p-4 h-full overflow-y-scroll   ">
      {/* triangles */}
      <div className="relative md:hidden flex    flex-wrap  justify-center items-center   gap-2 ">
        <div className="clip-polygon  w-32  h-40 relative bg-firstColor-900 flex justify-end items-center flex-col my-0 mx-[-60px] ">
          <span className="text-white font-bold mb-5">00:00:00</span>
          <span className="text-white font-bold text-center text-xs mb-2">
            باقی مانده
          </span>
        </div>
        <div className="clip-polygon2  w-32  h-40 relative bg-secondColor-900 flex justify-start items-center flex-col ">
          <span className="text-white font-bold  text-center text-xs mt-2">
            مجموع ساعت کارکرد
          </span>
          <span className="text-white font-bold mt-5">00:00:00</span>
        </div>
        <div className="clip-polygon  w-32  h-40 relative bg-firstColor-900 flex justify-end items-center flex-col my-0 mx-[-60px] ">
          <span className="text-white font-bold mb-5">00:00:00</span>
          <span className="text-white font-bold  text-center text-xs mb-2">
            مجموع ساعت کارکرد
          </span>
        </div>
      </div>

      {/* squres */}
      <div className="md:flex hidden flex-wrap justify-around gap-8">
        <div className="flex justify-center items-center  relative lg:w-[300px] md:w-64 h-[160px]  bg-white rounded-2xl   border border-secondColor-900 ">
          <span
            className="font-bold text-white flex overflow-hidden justify-center items-center absolute w-[150px] h-[150px] top-[-10px] left-[-10px] before:content-['باقی_مانده'] before:w-[150%] before:h-10
            before:bg-blue-400 before:absolute before:flex before:items-center before:justify-center trans20 
            before:shadow-[0_5px_10px_rgba(0,0,0,0.1)] before:z-10 after:absolute after:content-[''] after:w-[10px] after:h-[10px]
            after:bottom-0 after:left-0 after:z-[-1px] after:bg-blue-500 after:shadow-[140px_-140px_rgb(59,130,246)] "
          ></span>
          <div className="font-bold text-3xl">00:00:00</div>
        </div>
        <div className="flex justify-center items-center  relative lg:w-[300px] md:w-64 h-[160px]  bg-white rounded-2xl    border border-secondColor-900 ">
          <span
            className="font-bold text-white flex overflow-hidden justify-center items-center absolute w-[150px] h-[150px] top-[-10px] left-[-10px] before:content-['کارکرد_مورد_انتظار'] before:w-[150%] before:h-10
            before:bg-blue-400 before:absolute before:flex before:items-center before:justify-center trans20 
            before:shadow-[0_5px_10px_rgba(0,0,0,0.1)] before:z-10 after:absolute after:content-[''] after:w-[10px] after:h-[10px]
            after:bottom-0 after:left-0 after:z-[-1px] after:bg-blue-500 after:shadow-[140px_-140px_rgb(59,130,246)] "
          ></span>
          <div className="font-bold text-3xl">00:00:00</div>
        </div>
        <div className="flex justify-center items-center  relative lg:w-[300px] md:w-64 h-[160px]  bg-white rounded-2xl    border border-secondColor-900 ">
          <span
            className="font-bold text-white flex overflow-hidden justify-center items-center absolute w-[150px] h-[150px] top-[-10px] left-[-10px] before:content-['مجموع_ساعت_کارکرد'] before:w-[150%] before:h-10
            before:bg-blue-400 before:absolute before:flex before:items-center before:justify-center trans20 
            before:shadow-[0_5px_10px_rgba(0,0,0,0.1)] before:z-10 after:absolute after:content-[''] after:w-[10px] after:h-[10px]
            after:bottom-0 after:left-0 after:z-[-1px] after:bg-blue-500 after:shadow-[140px_-140px_rgb(59,130,246)] "
          ></span>
          <div className="font-bold text-3xl">00:00:00</div>
        </div>
      </div>

      {/* filter */}
      <div className="flex md:flex-row flex-col-reverse  shadow-normalMd rounded p-6 my-5">
        <button className="md:w-[120px] w-1/3   md:mx-0 mx-auto  m-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          فیلتر
        </button>{" "}
        <div className="md:flex grid  w-full md:justify-end">
          <div className="md:w-[200px] w-full">
            <SelectBox
              data={allMonths}
              chooseData={month}
              setChooseData={setMonth}
              multiple={false}
              propertyName="name"
              label="ماه"
            />
          </div>
          <div className="md:w-[200px] w-full">
            <SelectBox
              data={allYear}
              chooseData={year}
              setChooseData={setYear}
              multiple={false}
              propertyName="name"
              label="سال"
            />
          </div>
        </div>
      </div>

      {/* table */}
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
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-400 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
            <tr className="odd:bg-white even:bg-slate-100 ">
              <td className="p-2 border-r-2 border-b-2  flex justify-between">
                <Trash2
                  size={25}
                  className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                />
                <RefreshCw
                  size={25}
                  className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                />
              </td>
              <td className="p-2 border-r-2 border-b-2 ">05:00:09</td>
              <td className="p-2 border-r-2 border-b-2 ">1/5/2021</td>
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">09:00:17</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">09:00:17</td>{" "}
              <td className="p-2 border-r-2 border-b-2 ">
                <p className="status status-unpaid">05:00:09</p>
              </td>
              <td className="p-2 border-r-2 border-b-2 ">$520.18</td>
            </tr>{" "}
          </tbody>
        </table>
      </div>

      {/* Accordion */}
      <div className="md:hidden block pb-12">
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">کار و بورد</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="my-2 rounded shadow-normal border border-firstColor-500"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            className="flex flex-row-reverse"
            expandIcon={<ChevronDown size={16} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex w-full justify-evenly items-center ">
              <div className="text-xs">1/5/2021</div>
              <div className="text-sm min-w-[100px] ">
                {truncate(
                  "ddd dd dddddd ddddd dddd ddd sdsv  kcj kdns d isjdias"
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-blue-100">
            <div>
              <div className="mb-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">dsdsdsd</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="my-3 pb-3  border-b-2 border-gray-500">
                <div className="text-center text-sm">یادداشت</div>
                <div className="text-xs mt-1 text-center">
                  کار و بورد کار و بورد کارکرد مورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کار و بورد کار و بورد کارکرد مورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کار و بورد کار و بورد کارکرد مورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کار و بورد کار و بورد
                  کارکرد مورد کارکرد مورد کارکرد مورد کارکرد مورد
                </div>
              </div>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-sm">خروج</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">ورود</span>
                  <span className="text-xs mt-1">09:00:17</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm"> کارکرد</span>
                  <span className="text-xs mt-1 ">09:00:17</span>
                </div>
              </div>

              <div className="flex justify-around my-2">
                <div className="flex items-center">
                  <Trash2
                    size={25}
                    className="text-red-600 hover:motion-safe:animate-ping cursor-pointer "
                  />
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex flex-col items-center">
                  <span className="text-sm">تاریخ</span>
                  <span className="text-xs mt-1">1/5/2021</span>
                </div>
                <div className="border-r-2 border-gray-500" />
                <div className="flex items-center">
                  <RefreshCw
                    size={25}
                    className="text-blue-600 cursor-pointer hover:motion-safe:animate-spin"
                  />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
let allMonths = [
  { id: 0, name: "فروردین" },
  { id: 1, name: "اردیبهشت" },
  { id: 2, name: "خرداد" },
  { id: 3, name: "تیر" },
  { id: 4, name: "مرداد" },
  { id: 5, name: "شهریور" },
  { id: 6, name: "مهر" },
  { id: 7, name: "آبان" },
  { id: 8, name: "آذر" },
  { id: 9, name: "دی" },
  { id: 10, name: "بهمن" },
  { id: 11, name: "اسفند" },
];
Statistics.PageLayout = SideBarLayout;
export default Statistics;
