import { ISmartInterval, IntervalTypes } from "common/interval/types";

export const getDefaultInterval = () => ({
  IntervalType: IntervalTypes.DATEOP
});

const splitSmartInterval = (intervalString: string): ISmartInterval => {
  if (intervalString.substring(0, 2) !== "$$") {
    return {
      smartIntervalKey: null,
      intervalString
    };
  }

  const pipeIndex = intervalString.indexOf("|");

  return {
    smartIntervalKey:
      pipeIndex === -1
        ? intervalString.substring(2, intervalString.length)
        : intervalString.substring(2, pipeIndex),
    intervalString:
      pipeIndex === -1
        ? null
        : intervalString.substring(pipeIndex + 1, intervalString.length)
  };
};

export const parseDateOpString = (intervalString: string): string => {
  const parts = splitSmartInterval(intervalString);
  if (parts.intervalString == null) {
    throw new Error("parseDateOpString: intervalString cannot be null.");
  }

  const year = parts.intervalString.substring(0, 4);
  const month = parts.intervalString.substring(4, 6);
  const day = parts.intervalString.substring(6, 8);

  return `${year}-${month}-${day}`;
};

export const parseDateOpDate = (date: Date): string => {
  const dayPart = date.getDate();
  let dayString = dayPart.toString();
  if (dayPart <= 9) {
    dayString = "0" + dayPart;
  }

  const monthPart = date.getMonth() + 1;
  let monthString = monthPart.toString();
  if (monthPart <= 9) {
    monthString = "0" + monthPart;
  }

  return date.getFullYear().toString() + monthString + dayString;
};

// const parseHourlyString = (intervalString: string) => {
//   const year = intervalString.substring(0, 4);
//   const month = intervalString.substring(4, 6);
//   const day = intervalString.substring(6, 8);
//   const hour = intervalString.substring(9, 11);
//   const minute = intervalString.substring(12, 14);

//   return {
//     dateValue: new Date(
//       parseInt(year, 10),
//       parseInt(month, 10),
//       parseInt(day, 10)
//     ),
//     hourValue: hour,
//     minuteValue: minute,
//     label: day + "/" + month + "/" + year + " " + hour + ":" + minute
//   };
// };

// const parseDateOpRangeString = (intervalString: string) => {
//   const parts = splitSmartInterval(intervalString);
//   if (parts.intervalString == null) {
//     throw new Error("parseDateOpString: intervalString cannot be null.");
//   }

//   const year1 = parts.intervalString.substring(2, 6);
//   const month1 = parts.intervalString.substring(6, 8);
//   const day1 = parts.intervalString.substring(8, 10);

//   const dateValue1 = new Date(
//     parseInt(year1, 10),
//     parseInt(month1, 10),
//     parseInt(day1, 10)
//   );

//   const year2 = parts.intervalString.substring(11, 15);
//   const month2 = parts.intervalString.substring(15, 17);
//   const day2 = parts.intervalString.substring(17, 19);

//   const dateValue2 = new Date(
//     parseInt(year2, 10),
//     parseInt(month2, 10),
//     parseInt(day2, 10)
//   );

//   const dateValue1Label = year1 + "/" + month1 + "/" + day1;
//   const dateValue2Label = year2 + "/" + month2 + "/" + day2;

//   return {
//     dateValue1,
//     dateValue1Label,
//     dateValue2,
//     dateValue2Label
//   };
// };

// const parseDateOpRangeShiftString = (
//   intervalString: string,
//   shifts1: IShiftDtc[],
//   shifts2: IShiftDtc[]
// ) => {
//   const si = intervalString.indexOf("-");

//   const year1 = intervalString.substring(2, 6);
//   const month1 = intervalString.substring(6, 8);
//   const day1 = intervalString.substring(8, 10);
//   let shift1 = intervalString.substring(11, si);
//   if (shifts1.length > 0 && shifts1.find(s => s.Shift === shift1) != null) {
//     shift1 = shifts1[0].Shift;
//   }

//   const dateValue1 = new Date(
//     parseInt(year1, 10),
//     parseInt(month1, 10),
//     parseInt(day1, 10)
//   );
//   const shiftValue1 = shift1;

//   const year2 = intervalString.substring(si + 1, si + 5);
//   const month2 = intervalString.substring(si + 5, si + 7);
//   const day2 = intervalString.substring(si + 7, si + 9);
//   let shift2 = intervalString.substring(si + 10, intervalString.length);
//   if (shifts2.length > 0 && shifts2.find(s => s.Shift === shift2) != null) {
//     shift2 = shifts2[0].Shift;
//   }

//   const dateValue2 = new Date(
//     parseInt(year2, 10),
//     parseInt(month2, 10),
//     parseInt(day2, 10)
//   );
//   const shiftValue2 = shift2;

//   const dateValue1Label =
//     year1 + "/" + month1 + "/" + day1 + " (" + shiftValue1 + ")";
//   const dateValue2Label =
//     year2 + "/" + month2 + "/" + day2 + " (" + shiftValue2 + ")";

//   return {
//     dateValue1,
//     dateValue1Label,
//     dateValue2,
//     dateValue2Label
//   };
// };

// const parseDateTimeRangeString = (intervalString: string) => {
//   const year1 = intervalString.substring(3, 7);
//   const month1 = intervalString.substring(7, 9);
//   const day1 = intervalString.substring(9, 11);
//   const hour1 = intervalString.substring(12, 14);
//   const minute1 = intervalString.substring(15, 17);

//   const dateValue1 = new Date(
//     parseInt(year1, 10),
//     parseInt(month1, 10),
//     parseInt(day1, 10)
//   );
//   const hourValue1 = hour1;
//   const minuteValue1 = minute1;

//   const year2 = intervalString.substring(18, 22);
//   const month2 = intervalString.substring(22, 24);
//   const day2 = intervalString.substring(24, 26);
//   const hour2 = intervalString.substring(27, 29);
//   const minute2 = intervalString.substring(30, 32);

//   const dateValue2 = new Date(
//     parseInt(year2, 10),
//     parseInt(month2, 10),
//     parseInt(day2, 10)
//   );
//   const hourValue2 = hour2;
//   const minuteValue2 = minute2;

//   const dateValue1Label = year1 + "/" + month1 + "/" + day1;
//   const dateValue2Label = year2 + "/" + month2 + "/" + day2;

//   return {
//     dateValue1,
//     hourValue1,
//     minuteValue1,
//     dateValue1Label,
//     dateValue2,
//     hourValue2,
//     minuteValue2,
//     dateValue2Label
//   };
// };

// const parseShiftString = (intervalString: string, shifts: IShiftDtc[]) => {
//   const year = intervalString.substring(0, 4);
//   const month = intervalString.substring(4, 6);
//   const day = intervalString.substring(6, 8);
//   let shift = intervalString.substring(9, intervalString.length);

//   if (shifts.length > 0 && shifts.find(s => s.Shift === shift) != null) {
//     shift = shifts[0].Shift;
//   }

//   return {
//     dateValue: new Date(
//       parseInt(year, 10),
//       parseInt(month, 10),
//       parseInt(day, 10)
//     ),
//     shiftValue: shift,
//     label: day + "/" + month + "/" + year + " (" + shift + ")"
//   };
// };
