import { useContext, useEffect, useState } from "react";
import MoneyCard from "../components/financial/MoneyCard";
import appContext from "../context/appContext";
import SideBarLayout from "../layouts/SideBarLayout";
import ApiClass from "../api/newApi";
import { TransactionCard } from "../typings";

const Financial = () => {
  const [mounted, setmounted] = useState<boolean>(true);
  const [transactionCards, setTransactionCards] = useState<TransactionCard[]>(
    []
  );
  const { user } = useContext(appContext)!;
  useEffect(() => {
    if (mounted) {
      getDoneList();
    }
    return () => setmounted(false);
  }, []);

  //api
  const getDoneList = () => {
    let data = JSON.stringify({
      account: user?.id + "01",
    });

    ApiClass.Post("transaction/list", data)
      .then((res) => {
        if (res.status === 200) {
          setTransactionCards(res.data.Data);
          // console.log(res.data.Data);
          // if (res.data.Data.length === 0) {
          //   setTotalMoney(toFarsiNumber(commafy(res.data.Data?.[0]?.balance)));
          // }
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };

  return (
    <div className="flex md:flex-row flex-col w-full h-full overflow-y-scroll  gap-8 md:p-12 pb-16 p-4   ">
      <div className=" md:w-1/2 w-full  flex flex-col gap-8 justify-center ">
        <div className="md:flex hidden h-96 justify-center items-center bg-white text-8xl rounded-lg shadow-normal ">
          نمودار
        </div>
        <div className="md:h-56 h-32  p-5 bg-white rounded-lg shadow-normal ">
          <div className="text-right font-bold md:text-3xl text-sm">
            مانده حساب
          </div>
          <div className="h-full flex justify-center items-center md:text-5xl text-3xl font-bold ">
            تومان 0
          </div>
        </div>
      </div>

      <div className="md:bg-white bg-inherit md:w-1/2 w-full h-fit  rounded-lg p-6  md:shadow-normal shadow-none">
        <div className=" md:text-3xl text-lg text-right font-bold md:my-10 my-3">
          حساب مالی
        </div>

        {transactionCards.map((item) => {
          return <MoneyCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

Financial.PageLayout = SideBarLayout;
export default Financial;
