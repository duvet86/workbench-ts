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
  handleIntervalChange: (newInterval: IIntervalDtc) => void;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    container: {
      display: "flex"
    },
    smartSelector: {
      flexBasis: 200,
      margin: unit
    }
  });

const IntervalSelector: SFC<IProps> = ({
  classes,
  intervalTypes,
  initIntervalType,
  interval,
  handleIntervalTypeChange,
  handleIntervalChange
}) => (
  <div className={classes.container}>
    <IntervalTypeSelector
      options={intervalTypes}
      value={initIntervalType}
      onChange={handleIntervalTypeChange}
    />
    <IntervalStringPickerContainer
      interval={interval}
      handleIntervalChange={handleIntervalChange}
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
