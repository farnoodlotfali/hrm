import Image from "next/image";
import { CheckSquare, PlusCircle } from "react-feather";
import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { Value } from "react-multi-date-picker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

//api
import ApiClass from "../../newApi";

//components
import SelectBox from "../SelectBox";
import MobileTimePickerBox from "../MobileTimePickerBox";

//utility
import { myloader } from "../../utils/utility";

//typings
import { CardTrello, UserProject } from "../../typings";

interface SetTimerSecProps {
  model: boolean;
  setModel: (value: boolean) => void;
}
const SetTimerSec: React.FC<SetTimerSecProps> = ({ model, setModel }) => {
  const [chooseCards, setchooseCards] = useState<string[]>([]);
  const [chooseProjects, setchoosProjects] = useState<string[]>([]);
  const [cardsTrello, setCardsTrello] = useState<CardTrello[]>([]);
  const [userProjects, setUserProjects] = useState<UserProject[]>([]);
  const [mounted, setMounted] = useState<boolean>(true);
  const [value, setValue] = useState<Value>(new Date());
  const [Time, setTime] = useState<Date>(new Date("2018-01-01T00:00:00.000Z"));

  useEffect(() => {
    if (mounted) {
      getCardsTrello();
      getUserProjects();
    }

    return () => {
      setMounted(false);
    };
  }, []);

  //api
  const getCardsTrello = () => {
    let data = JSON.stringify({
      user: "aazahedi",
    });
    ApiClass.Post("trello/cardsList", data)
      .then((res) => {
        setCardsTrello(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserProjects = () => {
    let data = JSON.stringify({
      user_id: 16,
    });
    ApiClass.Post("project/user_project", data)
      .then((res) => {
        setUserProjects(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={`user signupBx absolute top-0 left-0 w-full h-full flex ${
        model ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={` ${
          model ? "top-0" : "top-full"
        } formBx lg:w-3/5  w-full  relative h-full  bg-white flex justify-center items-center p-5 transition-all duration-500  `}
      >
        <div className="w-full">
          <SelectBox
            label="انتخاب کار"
            data={cardsTrello}
            chooseData={chooseCards}
            setChooseData={setchooseCards}
            icon={
              <CheckSquare size={25} className="mr-3 text-firstColor-900" />
            }
            propertyName={"name"}
            multiple
          />

          <SelectBox
            label="انتخاب پروژه"
            data={userProjects}
            chooseData={chooseProjects}
            setChooseData={setchoosProjects}
            icon={<PlusCircle size={25} className="mr-3 text-firstColor-900" />}
            propertyName={"project_title"}
            multiple
          />

          <div className="m-2">
            {/* /// */}
            <DatePicker
              format="dddd DD MMMM YYYY"
              // ref={null}
              arrowStyle={
                {
                  // display: "none",
                }
              }
              // onClose={() => {}}
              placeholder={"تاریخ"}
              // disabled={disabled}
              weekDays={weekDays}
              className="rmdp-mobile"
              calendar={persian}
              locale={persian_fa}
              calendarPosition="top"
              inputClass="p-1 border border-firstColor-900 rounded hover:border-blue-700 w-full text-center py-3 cursor-pointer"
              containerClassName="w-full "
              value={value}
              onChange={setValue}
              mapDays={({ date }) => {
                let props: any = {};
                let isWeekend = date.weekDay.index === 6;

                if (isWeekend) props.className = "text-red-500";

                return props;
              }}
            />
          </div>

          <div className="mx-2 mb-2 mt-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="flex gap-x-2">
                <MobileTimePickerBox
                  label="خروج"
                  setTime={setTime}
                  time={Time}
                />
                <MobileTimePickerBox
                  label="ورود"
                  setTime={setTime}
                  time={Time}
                />
              </div>
            </LocalizationProvider>
          </div>

          <div className="p-2">
            <textarea
              className="w-full rounded p-3 border-firstColor-900 border h-32 focus-within:border-blue focus-within:border-2 focus-within:shadow-normal outline-0"
              dir="rtl"
              placeholder="یادداشت... "
            />
          </div>
          <div className="p-2 flex gap-8">
            <button className="lg:mx-auto lg:w-full w-1/2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              ثبت
            </button>
            <button
              onClick={() => setModel(!model)}
              className="lg:hidden block  w-1/2  bg-secondColor-500 hover:bg-secondColor-400 text-white font-bold py-2 px-4 border-b-4 border-secondColor-700 hover:border-blusecondColore-500 rounded"
            >
              ورود
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          model ? "top-0" : "-top-full"
        }  imgBx relative w-2/5 h-full transition-all duration-500 lg:block hidden `}
      >
        <div className=" h-full flex items-center flex-col justify-evenly ">
          <Image
            src={"/logo.svg"}
            alt="kashanplus-logo"
            layout="intrinsic"
            loader={myloader}
            unoptimized
            width={360}
            height={200}
          />

          <button
            onClick={() => setModel(!model)}
            className="w-1/2  bg-secondColor-500 hover:bg-secondColor-400 text-white font-bold py-2 px-4 border-b-4 border-secondColor-700 hover:border-blusecondColore-500 rounded"
          >
            ورود
          </button>
        </div>
      </div>
    </div>
  );
};
const weekDays = [
  ["شنبه", "ش"],
  ["یکشنبه", "ی"],
  ["دوشنبه", "د"],
  ["سه شنبه", "س"],
  ["چهارشنبه", "چ"],
  ["پنجشنبه", "پ"],
  ["جمعه", "ج"],
];
export default SetTimerSec;
// export default dynamic(() => Promise.resolve(SetTimerSec), { ssr: false });
