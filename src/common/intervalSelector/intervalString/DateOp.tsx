import React, { SFC } from "react";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

import PreviousIntervalButton from "common/intervalSelector/intervalString/PreviousIntervalButton";
import NextIntervalButton from "common/intervalSelector/intervalString/NextIntervalButton";

interface IProps {
  className: string;
  intervalStringDate: string;
  handleNextIntevalClick: (offset: number) => () => void;
}

const DateOp: SFC<IProps> = ({
  className,
  intervalStringDate,
  handleNextIntevalClick
}) => (
  <FormControl className={className}>
    <Input
      type="date"
      inputProps={{
        name: "interval-string"
      }}
      value={intervalStringDate}
      startAdornment={
        <PreviousIntervalButton onClick={handleNextIntevalClick} />
      }
      endAdornment={<NextIntervalButton onClick={handleNextIntevalClick} />}
    />
  </FormControl>
);

export default DateOp;
