import React, { Fragment, SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import BaseLoading from "common/loading/BaseLoading";
import Paper from "@material-ui/core/Paper";

interface IProps extends WithStyles<typeof styles> {
  isLoading: boolean;
  pastDelay: boolean;
}

const styles = createStyles({
  container: {
    backgroundColor: "rgba(238, 238, 238, 0.7)",
    height: "100%",
    width: "100%",
    position: "fixed",
    zIndex: 100
  },
  loading: {
    left: "48%",
    position: "absolute",
    top: "30%"
  }
});

const BackgroundLoading: SFC<IProps> = ({
  classes,
  isLoading,
  pastDelay,
  children
}) => (
  <Fragment>
    {isLoading && pastDelay && (
      <div className={classes.container}>
        <Paper className={classes.loading}>
          <BaseLoading />
        </Paper>
      </div>
    )}
    {children}
  </Fragment>
);

export default withStyles(styles)(BackgroundLoading);
