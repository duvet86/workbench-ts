import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import BaseLoading from "common/loading/BaseLoading";

interface IProps extends WithStyles<typeof styles> {
  error: any;
  isLoading: boolean;
  pastDelay: boolean;
  children: any;
}

const styles = createStyles({
  container: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%"
  }
});

const Loading: SFC<IProps> = ({
  classes,
  error,
  isLoading,
  pastDelay,
  children
}) => {
  if (error != null) {
    // When the loader has errored.
    return (
      <div className={classes.container}>
        <Typography variant="headline">{JSON.stringify(error)}</Typography>
      </div>
    );
  }
  if (isLoading) {
    if (pastDelay) {
      // When the loader has taken longer than the delay show a spinner.
      return (
        <div className={classes.container}>
          <BaseLoading />
        </div>
      );
    } else {
      return null;
    }
  }

  // When the loader has finished.
  return children;
};

export default withStyles(styles)(Loading);
