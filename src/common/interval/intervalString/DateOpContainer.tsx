import React, { FC } from "react";
import { MaterialUiPickersDate } from "@material-ui/pickers";

import { parseDateOpDate } from "common/interval/utils";

import DateOp from "common/interval/intervalString/DateOp";

interface IProps {
  className: string;
  intervalStringDate: string;
  onIntervalStringChange: (intervalString: string) => void;
  onNextIntevalClick: (offset: number) => () => void;
}

const DateOpContainer: FC<IProps> = ({
  className,
  intervalStringDate,
  onNextIntevalClick,
  onIntervalStringChange
}) => {
  const handleChange = (value: MaterialUiPickersDate) => {
    onIntervalStringChange(parseDateOpDate(value));
  };

  return (
    <DateOp
      className={className}
      intervalStringDate={intervalStringDate}
      onNextIntevalClick={onNextIntevalClick}
      handleChange={handleChange}
    />
  );
};

export default DateOpContainer;
