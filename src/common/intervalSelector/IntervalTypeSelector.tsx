import React, { ChangeEvent, SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { IIntervalDtc, IIntervalTypesDtc } from "common/intervalSelector/types";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

interface IProps extends WithStyles<typeof styles> {
  className?: string;
  isLoading: boolean;
  intervalTypes: IIntervalTypesDtc[];
  interval: IIntervalDtc;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    loading: {
      marginTop: unit * 2,
      marginLeft: unit
    }
  });

const IntervalTypeSelector: SFC<IProps> = ({
  classes,
  className,
  isLoading,
  intervalTypes,
  interval,
  onChange
}) => (
  <FormControl className={className}>
    <InputLabel
      htmlFor="interval"
      style={{ transform: isLoading ? "none" : undefined }}
    >
      Interval
    </InputLabel>
    {isLoading ? (
      <CircularProgress size={20} className={classes.loading} />
    ) : (
      <Select
        value={interval.IntervalType}
        onChange={onChange}
        inputProps={{
          name: "interval"
        }}
      >
        {intervalTypes.map(({ IntervalType, Label }) => (
          <MenuItem key={IntervalType} value={IntervalType}>
            {Label}
          </MenuItem>
        ))}
      </Select>
    )}
  </FormControl>
);

export default withStyles(styles)(IntervalTypeSelector);
