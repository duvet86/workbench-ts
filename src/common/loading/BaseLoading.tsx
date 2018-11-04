import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const styles = createStyles({
  laodingContainer: {
    margin: "16px 28px 16px 28px"
  }
});

const BaseLoading: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <div className={classes.laodingContainer}>
    <Typography variant="h6">Loading...</Typography>
    <LinearProgress variant="query" />
  </div>
);

export default withStyles(styles)(BaseLoading);
