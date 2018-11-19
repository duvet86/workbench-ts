import React, { ChangeEvent, SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { IIntervalTypesDtc } from "common/interval/types";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

interface IProps extends WithStyles<typeof styles> {
  options: IIntervalTypesDtc[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      margin: unit
    }
  });

const IntervalTypeSelector: SFC<IProps> = ({
  classes,
  options,
  value,
  onChange
}) => (
  <FormControl className={classes.container}>
    <InputLabel htmlFor="interval">Interval</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      inputProps={{
        name: "interval"
      }}
    >
      {options.map(({ IntervalType, Label }) => (
        <MenuItem key={IntervalType} value={IntervalType}>
          {Label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default withStyles(styles)(IntervalTypeSelector);
