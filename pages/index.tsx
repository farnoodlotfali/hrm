import { Fade, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

//api
import Api from "../api/newApi";

//icons
import { Info } from "react-feather";
import BlankLayout from "../layouts/BlankLayout";
import Cookies from "js-cookie";
import appContext from "../context/appContext";
import { isCorrectPhoneNumber, myloader } from "../utils/utility";
import { toast } from "react-toastify";

interface Validatetions {
  mobile: boolean;
  code: boolean;
}
const Login = () => {
  const router = useRouter();
  const { user } = useContext(appContext)!;

  const [step, setStep] = useState<number>(1);
  const [animation, setAnimation] = useState<boolean>(true);
  const animationTime: number = 300;
  const [time, setTime] = useState<number>(0);

  //resend code to mobile
  const [resend, setResend] = useState<boolean>(false);

  const [mobile, setMobile] = useState<string>("");

  const [code, setCode] = useState<string>("");

  //Validatetions
  const [validate, setValidate] = useState<Validatetions>({
    mobile: false,
    code: false,
  });

  // user from local storage
  useEffect(() => {
    if (user !== null) {
      router.push("/work");
    }
  }, [user]);

  useEffect(() => {
    if (!animation) {
      setTimeout(() => {
        setAnimation(true);
      }, animationTime);
    }

    // eslint-disable-next-line
  }, [step]);

  // for resend code
  useEffect(() => {
    let interval: any = null;
    if (time !== 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setResend(true);
    }

    return () => clearInterval(interval);
  }, [time]);

  // api func
  const login = () => {
    if (!isCorrectPhoneNumber(mobile)) {
      setValidate((prev) => {
        return { ...prev, mobile: true };
      });
      return;
    }
    var formdata = JSON.stringify({
      mobile: mobile,
    });

    Api.Post("user/login", formdata, false)
      .then((res) => {
        if (res.status === 200) {
          step !== 2 && handleStep(2);
          setResend(false);
          setTime(60);
        }
      })
      .catch((err) => {
        toast.error("کابری با این شماره پیدا نشد");
      });
  };

  const verify = () => {
    var data = JSON.stringify({
      mobile: mobile,
      code: code,
    });

    Api.Post("verification/verify", data, false)
      .then((res) => {
        if (res.status === 200) {
          Cookies.set("kashanPlusUser", JSON.stringify(res.data.Data), {
            expires: 30,
          });
          router.push("/work");
        }
      })
      .catch((err) => {
        toast.error("کد وارد شده صحیح نمی‌باشد!");
      });
  };

  //handle func

  const renderStep = () => {
    switch (step) {
      case 1:
        return Step1();
      case 2:
        return Step2();

      default:
        return Step1();
    }
  };

  const handleStep = (goTo: number) => {
    setTimeout(() => {
      setStep(goTo);
      setTimeout(() => {
        (document.getElementById(`step${goTo}`) as HTMLInputElement).focus();
      }, animationTime * 2);
    }, animationTime);
    setAnimation(false);
  };

  //steps
  const Step1 = () => {
    return (
      <div className="dir-rtl py-5">
        <div className="md:text-2xl text-lg  mt-5 ">
          شماره تلفن همراه خود را وارد کنید
        </div>
        {validate.mobile && (
          <div className="text-xs text-red-600 mt-2">
            شماره موبایل اشتباه است
          </div>
        )}
        <div className="dir-rtl mt-1">
          <TextField
            className="w-full hide-arrow mt-2 bg-gray-100 "
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (/\d+/.test(e.target.value) || e.target.value === "") {
                setMobile(e.target.value);
              }
            }}
            value={mobile}
            error={validate.mobile}
            type="number"
          />
        </div>
        <div className="flex mt-2 mb-7 items-center ">
          <Info size={16} className="mt-1" />
          <span className="mr-1 md:text-sm  text-[10px] ">
            پیامک کد فعالسازی به این شماره ارسال می‌شود
          </span>
        </div>

        <div className="">
          <button
            onClick={login}
            className=" bg-primary w-full md:text-2xl text-sm  hover:bg-blue-600 text-white font-bold py-3 px-4 rounded"
          >
            دریافت کد فعالسازی
          </button>
        </div>
      </div>
    );
  };

  const Step2 = () => {
    return (
      <div className="dir-rtl py-5">
        <div className="md:text-2xl text-lg mt-5 ">
          کد ارسال شده را وارد کنید
        </div>
        <div className="dir-rtl mt-1">
          <TextField
            className="w-full hide-arrow mt-2 bg-gray-100"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (/\d+/.test(e.target.value) || e.target.value === "") {
                setCode(e.target.value);
              }
            }}
            id="step2"
            autoFocus={true}
            value={code}
            error={validate.code}
            type="number"
          />
        </div>
        <div className="flex mt-5 mb-7 justify-center  ">
          <span
            onClick={() => {
              resend && login();
            }}
            className={`mr-1 md:text-xs  text-[10px]  cursor-pointer ${
              resend ? "text-blue-600" : "text-gray-500"
            }`}
          >
            ارسال مجدد کد یکبار مصرف({time >= 1 ? time : "0:00"})
          </span>
        </div>

        <div className="">
          <button
            onClick={verify}
            className=" bg-primary w-full md:text-2xl text-sm  hover:bg-blue-600 text-white font-bold py-3 px-4 rounded"
          >
            ورود
          </button>
        </div>
      </div>
    );
  };

  return (
    !user && (
      <div className="bg-hrm-bg min-h-screen md:p-10 p-7 h-full w-full bg-no-repeat object-contain bg-cover bg-right-bottom">
        <div className="">
          <Image
            src={"/login/kashanplus-logo.svg"}
            alt="kashanplus-logo"
            layout="intrinsic"
            width={300}
            height={50}
            loader={myloader}
            unoptimized
          />
        </div>

        <div className="flex justify-center items-center w-100 mt-10">
          <div className="bg-white shadow-normal  w-96  rounded-lg p-4 mx-2 d-flex flex-column justify-content-around ">
            <div className="">
              <Image
                src="/logo.svg"
                alt=""
                layout="responsive"
                width={30}
                height={10}
                loader={myloader}
                priority
                unoptimized
              />
            </div>
            <Fade in={animation} timeout={animationTime}>
              <div className="">{renderStep()}</div>
            </Fade>
          </div>
        </div>
      </div>
    )
  );
};

Login.PageLayout = BlankLayout;
export default Login;
