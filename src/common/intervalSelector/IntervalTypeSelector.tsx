import React, { ChangeEvent, SFC } from "react";

import { IInterval, IIntervalTypesDtc } from "common/intervalSelector/types";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

// interface IBackDropProps {
//   onClick: (event: MouseEvent<HTMLDivElement>) => void;
// }

// const CustomBackdropComponent: StatelessComponent<IBackDropProps> = ({
//   onClick
// }) => (
//   <div
//     style={{
//       height: "100%",
//       left: 0,
//       position: "fixed",
//       top: 0,
//       width: "100%",
//       zIndex: -1
//     }}
//     onClick={onClick}
//     aria-hidden="true"
//   />
// );

interface IIntervalTypeProps {
  className?: string;
  intervalTypes: IIntervalTypesDtc[];
  interval: IInterval;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const IntervalTypeSelector: SFC<IIntervalTypeProps> = ({
  className,
  intervalTypes,
  interval,
  onChange
}) => (
  <FormControl className={className}>
    <InputLabel htmlFor="interval">Interval</InputLabel>
    <Select
      // MenuProps={{
      //   BackdropComponent: CustomBackdropComponent
      // }}
      value={interval.type}
      onChange={onChange}
      input={<Input name="interval" id="interval" />}
    >
      {intervalTypes.map(({ IntervalType, Label }) => (
        <MenuItem key={IntervalType} value={IntervalType}>
          {Label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default IntervalTypeSelector;
