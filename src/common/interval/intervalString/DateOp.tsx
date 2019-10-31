import React, { FC } from "react";

import FormControl from "@material-ui/core/FormControl";
// import Input from "@material-ui/core/Input";

import {
  KeyboardDatePicker,
  MaterialUiPickersDate
} from "@material-ui/pickers";

// import PreviousIntervalButton from "common/interval/intervalString/PreviousIntervalButton";
// import NextIntervalButton from "common/interval/intervalString/NextIntervalButton";
//import CalendarContainer from "common/calendar/CalendarContainer";

interface IProps {
  className: string;
  // isOpen: boolean;
  intervalStringDate: string;
  onNextIntevalClick: (offset: number) => () => void;
  // onOpen: () => void;
  handleChange: (value: MaterialUiPickersDate) => void;
}

const DateOp: FC<IProps> = ({
  className,
  intervalStringDate,
  // onNextIntevalClick,
  // isOpen,
  // onOpen,
  handleChange
}) => (
  <FormControl className={className}>
    <KeyboardDatePicker
      value={new Date(intervalStringDate)}
      onChange={handleChange}
    />
    {/* <Input
      type="date"
      inputProps={{
        name: "interval-string",
        onClick: onOpen
      }}
      value={intervalStringDate}
      startAdornment={<PreviousIntervalButton onClick={onNextIntevalClick} />}
      endAdornment={<NextIntervalButton onClick={onNextIntevalClick} />}
    /> */}
    {/* <CalendarContainer
      isOpen={isOpen}
      value={new Date(intervalStringDate)}
      onClose={onClose}
    /> */}
  </FormControl>
);

export default DateOp;
