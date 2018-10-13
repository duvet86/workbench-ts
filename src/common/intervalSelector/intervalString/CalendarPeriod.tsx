import React, { SFC } from "react";

import { ICalendarString } from "common/intervalSelector/types";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import PreviousIntervalButton from "common/intervalSelector/intervalString/PreviousIntervalButton";
import NextIntervalButton from "common/intervalSelector/intervalString/NextIntervalButton";

interface IProps {
  className: string;
  calendarValues: ICalendarString[];
  intervalStringDate: string;
  handleNextIntevalClick: (offset: number) => () => void;
}

const CalendarPeriod: SFC<IProps> = ({
  className,
  calendarValues,
  intervalStringDate,
  handleNextIntevalClick
}) => (
  <TextField
    select
    className={className}
    value={intervalStringDate}
    InputProps={{
      startAdornment: (
        <PreviousIntervalButton onClick={handleNextIntevalClick} />
      ),
      endAdornment: <NextIntervalButton onClick={handleNextIntevalClick} />
    }}
  >
    {calendarValues.map(({ label, value }) => (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    ))}
  </TextField>
);

export default CalendarPeriod;
