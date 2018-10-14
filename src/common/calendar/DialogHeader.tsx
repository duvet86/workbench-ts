import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = ({
  palette: {
    primary: { main }
  }
}: Theme) =>
  createStyles({
    title: {
      backgroundColor: main
    }
  });

const CalendarDays: React.SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <DialogTitle className={classes.title}>Set backup account</DialogTitle>
);

export default withStyles(styles)(CalendarDays);
