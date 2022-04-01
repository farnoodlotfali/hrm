import Image from "next/image";

import { PlusCircle } from "react-feather";
import { useEffect, useReducer, useState } from "react";

//api
import Api from "../../newApi";

//utility
import { addZero, myloader } from "../../utils/utility";

//compontent
import SelectBox from "../SelectBox";

//typings
import { CardTrello, UserProject } from "../../typings";
import { type } from "os";
import SelectBoxCards from "./SelectBoxCards";

interface LiveTimerSecProps {
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
}
type ReducerAction = {
  type: ReducerActionType;
  payload?: any;
};

interface LiveTimer {
  cardTrello: CardTrello[];
  chosenCardTrelloName: string[];
  chosenCardTrelloId: string[];
  userProjects: UserProject[];
  chooseProjectsName: string[];
  chooseProjectsId: string[];
  note: string;
}
const LiveTimerSec: React.FC<LiveTimerSecProps> = ({ model, setModel }) => {
  const initialState: LiveTimer = {
    cardTrello: [],
    chosenCardTrelloName: [],
    chosenCardTrelloId: [],
    userProjects: [],
    chooseProjectsName: [],
    chooseProjectsId: [],
    note: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const [mounted, setMounted] = useState<boolean>(true);
  //for timer
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (mounted) {
      getCardsTrello();
      getUserProjects();
    }

    return () => {
      setMounted(false);
    };
  }, []);

  // for live timer
  useEffect(() => {
    var start = Date.now();
    const intervalId: false | NodeJS.Timer =
      startTimer &&
      setInterval(() => {
        var delta = Date.now() - start;

        setSeconds(Math.floor(delta / 1000));
      }, 1000);

    if (typeof intervalId !== "boolean") {
      return () => clearInterval(intervalId);
    }

    // eslint-disable-next-line
  }, [startTimer]);

  //api
  const getCardsTrello = () => {
    let data = JSON.stringify({
      user: "aazahedi",
    });
    Api.Post("trello/cardsList", data)
      .then((res) => {
        dispatch({
          type: ReducerActionType.INITIAL_CARDS_TRELLO,
          payload: res.data.Data,
        });
        // setCardsTrello(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserProjects = () => {
    let data = JSON.stringify({
      user_id: 16,
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

  const addStartOrleave = () => {
    let data = JSON.stringify({
      // user_id: user.id,
      user_id: 8,
      comment: state.note,
      project: -1,
      tasks: state.chosenCardTrelloId,
      time: Math.floor(new Date().getTime() / 1000),
    });

    Api.Post("rollcall/add", data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      })
      .catch((err) => {});
  };

  //handling functions

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

  return (
    <div className={`user signBx absolute left-0 w-full h-full flex `}>
      {/* image sec */}
      <div
        className={`${
          model ? "top-full" : "top-0"
        } imgBx relative w-2/5 h-full transition-all duration-500 lg:block hidden`}
      >
        <div className=" h-full flex items-center flex-col justify-evenly ">
          <Image
            src={"/logoFa.svg"}
            alt="kashanplus-logo"
            layout="intrinsic"
            loader={myloader}
            unoptimized
            width={300}
            height={200}
          />

          <button
            onClick={() => setModel(!model)}
            className="w-1/2  bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            ثبت
          </button>
        </div>
      </div>
      {/* form sec */}
      <div
        className={`${
          model ? "-top-full" : "top-0"
        } formBx relative lg:w-3/5  w-full h-full bg-white flex justify-center items-center p-5 transition-all duration-500 `}
      >
        <div className="w-full">
          <div className="flex justify-center items-center text-4xl mb-1 text-center border-firstColor-900 border mx-2 rounded py-3">
            <span className="font-bittypix">{addZero(seconds / 3600)}</span>
            <span className="font-extrabold">:</span>
            <span className="font-bittypix">
              {addZero((seconds / 60) % 60)}
            </span>
            <span className="font-extrabold ">:</span>
            <span className="font-bittypix">{addZero(seconds % 60)}</span>
          </div>

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

          <div className="p-2">
            <textarea
              value={state.note}
              onChange={(e) => changeNoting(e.target.value)}
              className="w-full rounded p-3 border-firstColor-900 border h-32 focus-within:border-blue focus-within:border-2 focus-within:shadow-normal outline-0"
              dir="rtl"
              placeholder="یادداشت... "
            />
          </div>

          <div className="p-2 flex lg:gap-8 gap-3">
            {startTimer ? (
              <button
                onClick={() => {
                  setStartTimer(false);
                  addStartOrleave();
                }}
                className="w-1/2 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
              >
                خروج
              </button>
            ) : (
              <button
                onClick={() => {
                  setStartTimer(true);
                  addStartOrleave();
                }}
                className="w-1/2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                ورود
              </button>
            )}
            <button className="w-1/2 text-[10px] opacity-50 cursor-not-allowed bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
              pause ..بزودی{" "}
            </button>
            <button
              onClick={() => setModel(!model)}
              className="lg:hidden block  w-1/2  bg-secondColor-500 hover:bg-secondColor-400 text-white font-bold py-2 px-4 border-b-4 border-secondColor-700 hover:border-blusecondColore-500 rounded"
            >
              ثبت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const reducer = (state: LiveTimer, action: ReducerAction) => {
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

    default:
      return { ...state };
  }
};

// export default dynamic(() => Promise.resolve(LiveTimerSec), { ssr: false });
export default LiveTimerSec;
