import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const styles = createStyles({
  laodingContainer: {
    margin: "16px 28px 16px 28px"
  },
  label: {
    textAlign: "center"
  }
});

const BaseLoading: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <div className={classes.laodingContainer}>
    <Typography className={classes.label} variant="h6">
      Loading...
    </Typography>
    <div>
      <LinearProgress variant="query" />
    </div>
  </div>
);

export default withStyles(styles)(BaseLoading);
