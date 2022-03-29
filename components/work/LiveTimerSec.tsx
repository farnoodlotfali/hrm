import Image from "next/image";

import { CheckSquare, PlusCircle } from "react-feather";
import { useEffect, useState } from "react";

//api
import ApiClass from "../../newApi";

//utility
import { myloader } from "../../utils/utility";

//compontent
import SelectBox from "../SelectBox";

//typings
import { CardTrello, UserProject } from "../../typings";

interface LiveTimerSecProps {
  model: boolean;
  setModel: (value: boolean) => void;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const LiveTimerSec: React.FC<LiveTimerSecProps> = ({ model, setModel }) => {
  const [chooseCards, setchooseCards] = useState<string[]>([]);
  const [cardsTrello, setCardsTrello] = useState<CardTrello[]>([]);
  const [chooseProjects, setchoosProjects] = useState<string[]>([]);
  const [userProjects, setUserProjects] = useState<UserProject[]>([]);
  const [mounted, setMounted] = useState<boolean>(true);

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
            <span className="font-bittypix"> 02</span>
            <span className="font-extrabold">:</span>
            <span className="font-bittypix">48</span>
            <span className="font-extrabold ">:</span>
            <span className="font-bittypix">19</span>
          </div>
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
          <div className="p-2">
            <textarea
              className="w-full rounded p-3 border-firstColor-900 border h-32 focus-within:border-blue focus-within:border-2 focus-within:shadow-normal outline-0"
              dir="rtl"
              placeholder="یادداشت... "
            />
          </div>
          <div className="p-2 flex lg:gap-8 gap-3">
            <button className="w-1/2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              ورود
            </button>
            <button className="w-1/2 text-[10px] opacity-50 cursor-not-allowed bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
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
// export default dynamic(() => Promise.resolve(LiveTimerSec), { ssr: false });
export default LiveTimerSec;
