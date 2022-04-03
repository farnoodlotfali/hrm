import Image from "next/image";
import { PlusCircle } from "react-feather";
import { useContext, useEffect, useReducer, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { Value } from "react-multi-date-picker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

//api
import Api from "../../api/newApi";

//components
import SelectBox from "../SelectBox";
import MobileTimePickerBox from "../MobileTimePickerBox";
import SelectBoxCards from "./SelectBoxCards";

//utility
import { myloader } from "../../utils/utility";

//typings
import { CardTrello, UserProject } from "../../typings";
import appContext from "../../context/appContext";

interface SetTimerSecProps {
  model: boolean;
  setModel: (value: boolean) => void;
}

//for reducer
enum ReducerActionType {
  INITIAL_CARDS_TRELLO,
  CHOSEN_CARD_TRELLO_NAME,
  CHOSEN_CARD_TRELLO_ID,
  INITIAL_USER_PROJECTS,
  CHOSEN_PROJECTS_NAME,
  CHOSEN_PROJECTS_ID,
  CHANGE_NOTE,
  CHANGE_START_TIME,
  CHANGE_FINISH_TIME,
  CHANGE_DATE,
}
type ReducerAction = {
  type: ReducerActionType;
  payload?: any;
};

interface SetTimer {
  cardTrello: CardTrello[];
  chosenCardTrelloName: string[];
  chosenCardTrelloId: string[];
  userProjects: UserProject[];
  chooseProjectsName: string[];
  chooseProjectsId: string[];
  note: string;
  startTime: Date;
  finishTime: Date;
  Unix: Date;
  calenderDate: Value;
}

const SetTimerSec: React.FC<SetTimerSecProps> = ({ model, setModel }) => {
  const [mounted, setMounted] = useState<boolean>(true);
  const { user } = useContext(appContext)!;

  const initialState: SetTimer = {
    cardTrello: [],
    chosenCardTrelloName: [],
    chosenCardTrelloId: [],
    userProjects: [],
    chooseProjectsName: [],
    chooseProjectsId: [],
    note: "",
    startTime: new Date(),
    finishTime: new Date(),
    Unix: new Date(),
    calenderDate: new Date(),
  };
  const [state, dispatch] = useReducer(reducer, initialState);

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
      user: user?.trello_username,
    });
    Api.Post("trello/cardsList", data)
      .then((res) => {
        dispatch({
          type: ReducerActionType.INITIAL_CARDS_TRELLO,
          payload: res.data.Data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserProjects = () => {
    let data = JSON.stringify({
      user_id: user?.id,
    });
    Api.Post("project/user_project", data)
      .then((res) => {
        dispatch({
          type: ReducerActionType.INITIAL_USER_PROJECTS,
          payload: res.data.Data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addWork = () => {
    // setLoading(true);
    let dataOfStart = JSON.stringify({
      user_id: user?.id,
      comment: state.note,
      project: -1,
      tasks: state.chosenCardTrelloId,
      time: addDaysToDate(0),
    });
    let dataOfLeave = JSON.stringify({
      user_id: user?.id,
      comment: state.note,
      project: -1,
      tasks: state.chosenCardTrelloId,
      time: addDaysToDate(1),
    });
    Api.Post("rollcall/add", dataOfStart)
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            Api.Post("rollcall/add", dataOfLeave).then((res) => {
              if (res.status === 200) {
                // getDoneList();
                // resetAll();
              }
            });
          }, 900);
        }
      })
      .catch((err) => {});
  };

  //handling functions

  const addDaysToDate = (val: number) => {
    let which = [state.startTime, state.finishTime];
    let time = which[val];
    let date = new Date(state.calenderDate);

    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());

    return Math.floor(date.getTime() / 1000);
  };

  //to keep user chosen cards NAME
  const handleChosenCardTrelloName = (val: string[]) => {
    dispatch({
      type: ReducerActionType.CHOSEN_CARD_TRELLO_NAME,
      payload: val,
    });
  };

  //to keep user chosen cards ID
  const handleChosenCardTrelloID = (id: string) => {
    dispatch({
      type: ReducerActionType.CHOSEN_CARD_TRELLO_ID,
      payload: id,
    });
  };

  //to keep user chosen projects NAME
  const handleChosenProjectsName = (val: string[]) => {
    dispatch({
      type: ReducerActionType.CHOSEN_PROJECTS_NAME,
      payload: val,
    });
  };

  //to keep user chosen projects ID
  const handleChosenProjectsID = (id: number) => {
    dispatch({
      type: ReducerActionType.CHOSEN_PROJECTS_ID,
      payload: id,
    });
  };

  const changeNoting = (val: string) =>
    dispatch({ type: ReducerActionType.CHANGE_NOTE, payload: val });

  const handleChangeDate = (value: DateObject) => {
    dispatch({
      type: ReducerActionType.CHANGE_DATE,
      payload: {
        Unix: value.toUnix() * 1000,
        calenderDate: value,
      },
    });
  };

  const changeFinishTime = (val: Date) => {
    dispatch({ type: ReducerActionType.CHANGE_FINISH_TIME, payload: val });
  };

  const changeStartTime = (val: Date) => {
    dispatch({ type: ReducerActionType.CHANGE_START_TIME, payload: val });
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
          <SelectBoxCards
            data={state.cardTrello}
            chooseData={state.chosenCardTrelloName}
            setChooseData={handleChosenCardTrelloName}
            setSelectedId={handleChosenCardTrelloID}
          />

          <SelectBox
            label="انتخاب پروژه"
            data={state.userProjects}
            chooseData={state.chooseProjectsName}
            setChooseData={handleChosenProjectsName}
            setSelectedId={handleChosenProjectsID}
            icon={<PlusCircle size={25} className="mr-3 text-firstColor-900" />}
            propertyName={"project_title"}
            multiple
          />

          <div className="m-2">
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
              value={state.calenderDate}
              onChange={(value: DateObject) => handleChangeDate(value)}
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
                  setTime={changeFinishTime}
                  time={state.finishTime}
                />
                <MobileTimePickerBox
                  label="ورود"
                  setTime={changeStartTime}
                  time={state.startTime}
                />
              </div>
            </LocalizationProvider>
          </div>

          <div className="p-2">
            <textarea
              value={state.note}
              onChange={(e) => changeNoting(e.target.value)}
              className="w-full rounded p-3 border-firstColor-900 border h-32 focus-within:border-blue focus-within:border-2 focus-within:shadow-normal outline-0"
              dir="rtl"
              placeholder="یادداشت... "
            />
          </div>

          <div className="p-2 flex gap-8">
            <button
              onClick={() => addWork()}
              className="lg:mx-auto lg:w-full w-1/2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
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

const reducer = (state: SetTimer, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionType.INITIAL_CARDS_TRELLO:
      return {
        ...state,
        cardTrello: action.payload,
      };
    case ReducerActionType.CHOSEN_CARD_TRELLO_NAME:
      return {
        ...state,
        chosenCardTrelloName: action.payload,
      };
    case ReducerActionType.CHOSEN_CARD_TRELLO_ID:
      return {
        ...state,
        chosenCardTrelloId:
          state.chosenCardTrelloId.indexOf(action.payload) === -1
            ? [...state.chosenCardTrelloId, action.payload]
            : [
                ...state.chosenCardTrelloId.filter((item: any) => {
                  return item !== action.payload;
                }),
              ],
      };

    case ReducerActionType.INITIAL_USER_PROJECTS:
      return {
        ...state,
        userProjects: action.payload,
      };
    case ReducerActionType.CHOSEN_PROJECTS_NAME:
      return {
        ...state,
        chooseProjectsName: action.payload,
      };

    case ReducerActionType.CHOSEN_PROJECTS_ID:
      return {
        ...state,
        chooseProjectsId:
          state.chooseProjectsId.indexOf(action.payload) === -1
            ? [...state.chooseProjectsId, action.payload]
            : [
                ...state.chooseProjectsId.filter((item: any) => {
                  return item !== action.payload;
                }),
              ],
      };
    case ReducerActionType.CHANGE_NOTE:
      return {
        ...state,
        note: action.payload,
      };
    case ReducerActionType.CHANGE_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      };
    case ReducerActionType.CHANGE_FINISH_TIME:
      return {
        ...state,
        finishTime: action.payload,
      };
    case ReducerActionType.CHANGE_DATE:
      return {
        ...state,
        Unix: action.payload.Unix,
        calenderDate: action.payload.calenderDate,
      };

    default:
      return { ...state };
  }
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
