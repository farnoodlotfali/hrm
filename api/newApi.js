import axios from "axios";

const ApiURL = "http://185.110.190.246:3000/v1/";

let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  token: process.env.NEXT_APP_API_TOKEN,
  api_code: process.env.NEXT_APP_API_CODE,
};

class Api {
  Get(url) {
    return axios.get(ApiURL + url, { headers });
  }
  Post(url, data, tokenNeed = true) {
    if (!tokenNeed) {
      delete headers.token;
    } else {
      headers = { ...headers, token: process.env.NEXT_APP_API_TOKEN };
    }
    return axios.post(ApiURL + url, data, { headers });
  }
  // RefreshToken(error) {
  //   return this.Post("user/refresh/token", {
  //     mobile: localStorage.getItem("mobile"),
  //     refreshToken: Cookies.get("refreshToken"),
  //     agentString: "AgentNEXT1",
  //   })
  //     .then((response) => {
  //       Cookies.set("token", response.Data.token);
  //       Cookies.set("refreshToken", response.Data.refreshToken);
  //       error.config.headers.Authorization = response.Data.token;
  //       return axios.request(error.config);
  //     })
  //     .catch((err) => {
  //       if (err.response && err.response.status === 401) {
  //         window.location = "/logout";
  //       }
  //       return Promise.reject(error);
  //     });
  // }
  // ShowError(error) {
  //   return toast.error(this.ErrorHandler(error));
  // }
  ErrorHandler(error) {
    let message = "";
    switch (error) {
      case 403:
        message = "شما دسترسی به این قسمت را ندارید";
        break;
      case 404:
        message = "داده مورد نظر یافت نشد";
        break;
      case 402:
        message = "مشکلی رخ داده ، لطفا ان را گزارش دهید";
        break;
      case 400:
        message = "مشکلی رخ داده ، ورودی های خود را بررسی کنید";
        break;
      case 500:
        message = "مشکلی رخ داده ، دوباره تلاش کنید";
        break;
      case 503:
        message = "مشکلی رخ داده ، دوباره تلاش کنید";
        break;
      case 401:
        message = "شما دسترسی به این قسمت را ندارید";
        break;
      default:
        message = "مشکلی رخ داده است";
        break;
    }
    return message;
  }
}

const ApiClass = new Api();

export default ApiClass;

// let tryCount = 0;
// axios.interceptors.response.use(null, (error) => {
//   if (error.config && error.response) {
//     if (error.response.status === 401) {
//       if (tryCount === 1) {
//         return Promise.reject(error);
//       }
//       tryCount++;
//       ApiClass.RefreshToken();
//     } else {
//       ApiClass.ShowError(error.response.status);
//     }
//   }

//   return Promise.reject(error);
// });
