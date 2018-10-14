import React, { SFC } from "react";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

import PreviousIntervalButton from "common/intervalSelector/intervalString/PreviousIntervalButton";
import NextIntervalButton from "common/intervalSelector/intervalString/NextIntervalButton";
import CalendarContainer from "common/calendar/CalendarContainer";

interface IProps {
  className: string;
  isOpen: boolean;
  intervalStringDate: string;
  handleNextIntevalClick: (offset: number) => () => void;
  onOpen: () => void;
  onClose: (value: Date) => void;
}

const DateOp: SFC<IProps> = ({
  className,
  intervalStringDate,
  handleNextIntevalClick,
  isOpen,
  onOpen,
  onClose
}) => (
  <FormControl className={className}>
    <Input
      type="date"
      inputProps={{
        name: "interval-string"
      }}
      value={intervalStringDate}
      onClick={onOpen}
      startAdornment={
        <PreviousIntervalButton onClick={handleNextIntevalClick} />
      }
      endAdornment={<NextIntervalButton onClick={handleNextIntevalClick} />}
    />
    <CalendarContainer
      isOpen={isOpen}
      value={new Date(intervalStringDate)}
      onClose={onClose}
    />
  </FormControl>
);

export default DateOp;
