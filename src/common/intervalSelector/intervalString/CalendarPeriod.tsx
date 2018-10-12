import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import { ICalendarString } from "common/intervalSelector/types";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

interface IProps extends WithStyles<typeof styles> {
  calendarValues: ICalendarString[];
  intervalStringDate: string;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    dateSelector: {
      flexBasis: 350,
      margin: `${unit * 3}px ${unit}px ${unit}px ${unit}px`
    }
  });

const CalendarPeriod: SFC<IProps> = ({
  classes,
  calendarValues,
  intervalStringDate
}) => (
  <TextField
    select
    className={classes.dateSelector}
    value={intervalStringDate}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <IconButton aria-label="Left">{<ArrowLeftIcon />}</IconButton>
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton aria-label="Right">{<ArrowRightIcon />}</IconButton>
        </InputAdornment>
      )
    }}
  >
    {calendarValues.map(({ label, value }) => (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    ))}
  </TextField>
);

export default withStyles(styles)(CalendarPeriod);
