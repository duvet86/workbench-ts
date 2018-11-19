import React, { SFC } from "react";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

import PreviousIntervalButton from "common/interval/intervalString/PreviousIntervalButton";
import NextIntervalButton from "common/interval/intervalString/NextIntervalButton";
import CalendarContainer from "common/calendar/CalendarContainer";

interface IProps {
  className: string;
  isOpen: boolean;
  intervalStringDate: string;
  onNextIntevalClick: (offset: number) => () => void;
  onOpen: () => void;
  onClose: (value: Date) => void;
}

const DateOp: SFC<IProps> = ({
  className,
  intervalStringDate,
  onNextIntevalClick,
  isOpen,
  onOpen,
  onClose
}) => (
  <FormControl className={className}>
    <Input
      type="date"
      inputProps={{
        name: "interval-string",
        onClick: onOpen
      }}
      value={intervalStringDate}
      startAdornment={<PreviousIntervalButton onClick={onNextIntevalClick} />}
      endAdornment={<NextIntervalButton onClick={onNextIntevalClick} />}
    />
    <CalendarContainer
      isOpen={isOpen}
      value={new Date(intervalStringDate)}
      onClose={onClose}
    />
  </FormControl>
);

export default DateOp;
