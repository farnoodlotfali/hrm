export const isCorrectPhoneNumber = (number: string) => {
  return /^^(\+98|0)?9\d{9}$$/.test(number);
};

export const myloader = ({ src }: { src: string }): string => {
  return src;
};
export const enToFaDigit = (input: string): string | void => {
  if (input === undefined) return;
  var returnModel = "",
    symbolMap: { [key: string | number]: string | number } = {
      1: "۱",
      2: "۲",
      3: "۳",
      4: "۴",
      5: "۵",
      6: "۶",
      7: "۷",
      8: "۸",
      9: "۹",
      0: "۰",
    };
  input = input.toString();
  for (var i = 0; i < input.length; i++)
    if (symbolMap[input[i]]) returnModel += symbolMap[input[i]];
    else returnModel += input[i];
  return returnModel;
};
export const commafy = (num: string | number): string | number => {
  var str = num.toString().split(".");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
};

export const miladi_be_shamsi = (gy: number, gm: number, gd: number) => {
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = gm > 2 ? gy + 1 : gy;
  days =
    355666 +
    365 * gy +
    ~~((gy2 + 3) / 4) -
    ~~((gy2 + 99) / 100) +
    ~~((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  jy = -1595 + 33 * ~~(days / 12053);
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return [jy, jm, jd];
};

// function shamsi_be_miladi(jy, jm, jd) {
//   var sal_a, gy, gm, gd, days;
//   jy += 1595;
//   days = -355668 + (365 * jy) + (~~(jy / 33) * 8) + ~~(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
//   gy = 400 * ~~(days / 146097);
//   days %= 146097;
//   if (days > 36524) {
//       gy += 100 * ~~(--days / 36524);
//       days %= 36524;
//       if (days >= 365) days++;
//   }
//   gy += 4 * ~~(days / 1461);
//   days %= 1461;
//   if (days > 365) {
//       gy += ~~((days - 1) / 365);
//       days = (days - 1) % 365;
//   }
//   gd = days + 1;
//   sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//   for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
//   return [gy + '/' + gm + '/' + gd];
// }
// console.log(shamsi_be_miladi(1369, 04, 31));
