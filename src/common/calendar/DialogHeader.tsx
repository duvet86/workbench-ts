import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";

import { days, months } from "common/calendar/utils";

interface IProps extends WithStyles<typeof styles> {
  value: Date;
}

const styles = ({
  palette: { primary, secondary },
  typography: { fontWeightMedium }
}: Theme) =>
  createStyles({
    title: {
      backgroundColor: primary.main
    },
    year: {
      color: secondary.contrastText
    },
    day: {
      color: secondary.contrastText,
      fontWeight: fontWeightMedium
    }
  });

const CalendarDays: React.SFC<IProps> = ({ classes, value }) => (
  <DialogTitle className={classes.title}>
    <Typography variant="h6" className={classes.year}>
      {value.getFullYear()}
    </Typography>
    <Typography variant="h4" className={classes.day}>
      {`${days[value.getDay()].short}, ${
        months[value.getMonth()].short
      } ${value.getDate()}`}
    </Typography>
  </DialogTitle>
);

export default withStyles(styles)(CalendarDays);
