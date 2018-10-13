import React, { SFC, ChangeEvent } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { IIntervalTypesDtc, IIntervalDtc } from "common/intervalSelector/types";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import IntervalTypeSelector from "common/intervalSelector/IntervalTypeSelector";
import IntervalStringPickerContainer from "./IntervalStringPickerContainer";

interface IProps extends WithStyles<typeof styles> {
  intervalTypes: IIntervalTypesDtc[];
  initIntervalType: string;
  interval: IIntervalDtc;
  handleIntervalTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleNextIntevalClick: (offset: number) => () => void;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    container: {
      display: "flex",
      width: "100%"
    },
    smartSelector: {
      flexGrow: 1,
      margin: unit
    },
    stringPickerContainer: {
      flexGrow: 2,
      margin: `${unit * 3}px ${unit}px ${unit}px ${unit}px`
    }
  });

const IntervalSelector: SFC<IProps> = ({
  classes,
  intervalTypes,
  initIntervalType,
  interval,
  handleIntervalTypeChange,
  handleNextIntevalClick
}) => (
  <div className={classes.container}>
    <IntervalTypeSelector
      options={intervalTypes}
      value={initIntervalType}
      onChange={handleIntervalTypeChange}
    />
    <IntervalStringPickerContainer
      className={classes.stringPickerContainer}
      interval={interval}
      handleNextIntevalClick={handleNextIntevalClick}
    />
    <FormControl className={classes.smartSelector}>
      <InputLabel htmlFor="age-simple">Smart Date</InputLabel>
      <Select value="" input={<Input name="age" id="age-simple" />} autoWidth>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  </div>
);

export default withStyles(styles)(IntervalSelector);
