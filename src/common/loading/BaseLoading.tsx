import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    laodingContainer: {
      margin: unit * 2
    }
  });

const BaseLoading: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <div className={classes.laodingContainer}>
    <Typography variant="title">Loading...</Typography>
    <LinearProgress variant="query" />
  </div>
);

export default withStyles(styles)(BaseLoading);
