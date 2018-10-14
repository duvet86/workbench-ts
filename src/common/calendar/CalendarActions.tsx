import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

export interface IProps extends WithStyles<typeof styles> {
  setToday: () => void;
  onCancelClick: (event: React.MouseEvent<HTMLElement>) => void;
  confirmDate: (event: React.MouseEvent<HTMLElement>) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "space-between"
    },
    button: {
      marginRight: theme.spacing.unit
    }
  });

const CalendarActions: React.SFC<IProps> = ({
  classes,
  setToday,
  onCancelClick,
  confirmDate
}) => (
  <DialogActions className={classes.root}>
    <Button size="small" color="secondary" onClick={setToday}>
      Today
    </Button>
    <div>
      <Button
        className={classes.button}
        size="small"
        variant="outlined"
        color="secondary"
        onClick={onCancelClick}
      >
        Cancel
      </Button>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={confirmDate}
      >
        Ok
      </Button>
    </div>
  </DialogActions>
);

export default withStyles(styles)(CalendarActions);
