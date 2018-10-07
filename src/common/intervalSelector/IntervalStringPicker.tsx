import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

interface IProps extends WithStyles<typeof styles> {
  intervalStringDate?: string;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    dateSelector: {
      flexBasis: 350,
      margin: `${unit * 3}px ${unit}px ${unit}px ${unit}px`
    }
  });

const IntervalStringPicker: SFC<IProps> = ({ classes, intervalStringDate }) => (
  <FormControl className={classes.dateSelector}>
    <Input
      type="date"
      inputProps={{
        name: "interval-string"
      }}
      value={intervalStringDate}
      startAdornment={
        <InputAdornment position="start">
          <IconButton aria-label="Left">{<ArrowLeftIcon />}</IconButton>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="Right">{<ArrowRightIcon />}</IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
);

export default withStyles(styles)(IntervalStringPicker);
