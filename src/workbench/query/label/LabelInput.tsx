import React, { SFC } from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

interface IProps extends WithStyles<typeof styles> {
  initLabel: string;
  handleChangeLabel: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing.unit * 3
    }
  });

const LabelInput: SFC<IProps> = ({ classes, initLabel, handleChangeLabel }) => (
  <Paper className={classes.paper}>
    <TextField
      fullWidth
      required
      label="Query Label"
      value={initLabel}
      onChange={handleChangeLabel}
    />
  </Paper>
);

export default withStyles(styles)(LabelInput);
