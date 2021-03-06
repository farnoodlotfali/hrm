import { useContext, useEffect, useState } from "react";
import SelectBox from "../components/SelectBox";
import RecordCard from "../components/statistics/RecordCard";
import TableSec from "../components/statistics/TableSec";
import appContext from "../context/appContext";
import SideBarLayout from "../layouts/SideBarLayout";
import Api from "../api/newApi";
import { DoneWork, Year } from "../typings";
import { enToFaDigit } from "../utils/utility";
import Spinner from "../components/Spinner";

const Statistics = () => {
  const [totalTime, setTotalTime] = useState<string>("00:00:00");
  const [month, setMonth] = useState<string[]>([]);
  const [year, setYear] = useState<string[]>([]);
  const [allYear, setallYear] = useState<Year[]>([]);
  const [doneWorks, setDoneWorks] = useState<DoneWork[]>([]);
  const [mounted, setMounted] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(appContext)!;
  useEffect(() => {
    if (mounted) {
      getDoneList();
    }
    return () => setMounted(false);
  }, []);

  //api
  const getDoneList = () => {
    setLoading(true);
    let monthdata = JSON.stringify({
      time: Math.floor(new Date().getTime() / 1000),
    });
    Api.Post("rollcall/currentTime", monthdata)
      .then((res) => {
        if (res.status === 200) {
          let year = JSON.parse(res.data.Data.yare);
          let month = JSON.parse(res.data.Data.month);
          let data = JSON.stringify({
            user_id: user?.id,
            trello_username: user?.trello_username,
            year: year,
            month: month,
          });
          setallYear(AddYear(year));
          setMonth([allMonths[month - 1].name]);
          setYear([year]);
          getTotalTimeOfTheMonth(year, month);
          Api.Post("rollcall/list", data)
            .then((res) => {
              if (res.status === 200) {
                setDoneWorks(res.data.Data);
              }
            })
            .catch((err) => {})
            .finally(() => {
              setLoading(false);
            });
        }
      })
      .catch((err) => {});
  };
  const getDoneListOnClick = () => {
    var index = allMonths
      .map(function (e) {
        return e.name;
      })
      .indexOf(month[0]);

    let data = JSON.stringify({
      user_id: user?.id,
      trello_username: user?.trello_username,
      year: year[0],
      month: index + 1,
    });
    getTotalTimeOfTheMonth(year[0], index + 1);
    Api.Post("rollcall/list", data)
      .then((res) => {
        if (res.status === 200) {
          setDoneWorks(res.data.Data);
        }
      })
      .catch((err) => {});
  };

  const getTotalTimeOfTheMonth = (
    valyear: string | number,
    valmonth: string | number
  ) => {
    let data = JSON.stringify({
      user_id: user?.id,
      year: valyear,
      month: valmonth,
    });

    Api.Post("rollcall/totalWorkingTime", data)
      .then((res) => {
        if (res.status === 200) {
          setTotalTime(res.data.Data);
        }
      })
      .catch((err) => {});
  };

  //api
  const deleteTask = (tasksId: number) => {
    let data = JSON.stringify({
      user_id: user?.id,
      action_id: tasksId,
    });
    Api.Post("rollcall/delete", data).then((res) => {
      if (res.status === 200) {
        getDoneList();
      }
    });
  };

  //handling functions

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
            ???????? ??????????
          </span>
        </div>
        <div className="clip-polygon2  w-32  h-40 relative bg-secondColor-900 flex justify-start items-center flex-col ">
          <span className="text-white font-bold  text-center text-xs mt-2">
            ?????????? ???????? ????????????
          </span>
          <span className="text-white font-bold mt-5">
            {enToFaDigit(totalTime)!}
          </span>
        </div>
        <div className="clip-polygon  w-32  h-40 relative bg-firstColor-900 flex justify-end items-center flex-col my-0 mx-[-60px] ">
          <span className="text-white font-bold mb-5">00:00:00</span>
          <span className="text-white font-bold  text-center text-xs mb-2">
            ???????????? ???????? ????????????
          </span>
        </div>
      </div>

      {/* squres */}
      <div className="md:flex hidden flex-wrap justify-around gap-8">
        <div className="flex justify-center items-center  relative lg:w-[300px] md:w-64 h-[160px]  bg-white rounded-2xl   border border-secondColor-900 ">
          <span
            className="font-bold text-white flex overflow-hidden justify-center items-center absolute w-[150px] h-[150px] top-[-10px] left-[-10px] before:content-['????????_??????????'] before:w-[150%] before:h-10
            before:bg-blue-400 before:absolute before:flex before:items-center before:justify-center trans20 
            before:shadow-[0_5px_10px_rgba(0,0,0,0.1)] before:z-10 after:absolute after:content-[''] after:w-[10px] after:h-[10px]
            after:bottom-0 after:left-0 after:z-[-1px] after:bg-blue-500 after:shadow-[140px_-140px_rgb(59,130,246)] "
          ></span>
          <div className="font-bold text-3xl">00:00:00</div>
        </div>
        <div className="flex justify-center items-center  relative lg:w-[300px] md:w-64 h-[160px]  bg-white rounded-2xl    border border-secondColor-900 ">
          <span
            className="font-bold text-white flex overflow-hidden justify-center items-center absolute w-[150px] h-[150px] top-[-10px] left-[-10px] before:content-['????????????_????????_????????????'] before:w-[150%] before:h-10
            before:bg-blue-400 before:absolute before:flex before:items-center before:justify-center trans20 
            before:shadow-[0_5px_10px_rgba(0,0,0,0.1)] before:z-10 after:absolute after:content-[''] after:w-[10px] after:h-[10px]
            after:bottom-0 after:left-0 after:z-[-1px] after:bg-blue-500 after:shadow-[140px_-140px_rgb(59,130,246)] "
          ></span>
          <div className="font-bold text-3xl">00:00:00</div>
        </div>
        <div className="flex justify-center items-center  relative lg:w-[300px] md:w-64 h-[160px]  bg-white rounded-2xl    border border-secondColor-900 ">
          <span
            className="font-bold text-white flex overflow-hidden justify-center items-center absolute w-[150px] h-[150px] top-[-10px] left-[-10px] before:content-['??????????_????????_????????????'] before:w-[150%] before:h-10
            before:bg-blue-400 before:absolute before:flex before:items-center before:justify-center trans20 
            before:shadow-[0_5px_10px_rgba(0,0,0,0.1)] before:z-10 after:absolute after:content-[''] after:w-[10px] after:h-[10px]
            after:bottom-0 after:left-0 after:z-[-1px] after:bg-blue-500 after:shadow-[140px_-140px_rgb(59,130,246)] "
          ></span>
          <div className="font-bold text-3xl"> {enToFaDigit(totalTime)!}</div>
        </div>
      </div>

      {/* filter */}
      <div className="flex md:border-0 border border-firstColor-900 md:bg-none   bg-hrm-bg-top bg-no-repeat object-contain bg-cover bg-right-bottom md:flex-row flex-col-reverse  shadow-normalMd rounded p-6 my-5">
        <button
          onClick={() => getDoneListOnClick()}
          className="md:w-[120px] w-1/3   md:mx-0 mx-auto  m-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          ??????????
        </button>
        <div className="md:flex grid  w-full md:justify-end">
          <div className="md:w-[200px] w-full">
            <SelectBox
              data={allMonths}
              chooseData={month}
              setChooseData={setMonth}
              multiple={false}
              propertyName="name"
              label="??????"
            />
          </div>
          <div className="md:w-[200px] w-full">
            <SelectBox
              data={allYear}
              chooseData={year}
              setChooseData={setYear}
              multiple={false}
              propertyName="name"
              label="??????"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {/* table */}
          <TableSec data={doneWorks} deleteTask={deleteTask} />

          {/* Accordion */}
          <div className="md:hidden block pb-12">
            {doneWorks.map((item) => {
              return <RecordCard key={item.actionId} item={item} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};
let allMonths = [
  { id: 0, name: "??????????????" },
  { id: 1, name: "????????????????" },
  { id: 2, name: "??????????" },
  { id: 3, name: "??????" },
  { id: 4, name: "??????????" },
  { id: 5, name: "????????????" },
  { id: 6, name: "??????" },
  { id: 7, name: "????????" },
  { id: 8, name: "??????" },
  { id: 9, name: "????" },
  { id: 10, name: "????????" },
  { id: 11, name: "??????????" },
];
Statistics.PageLayout = SideBarLayout;
export default Statistics;
