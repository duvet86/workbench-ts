import React, { FC } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import BaseLoading from "common/loading/BaseLoading";

interface IProps {
  error: unknown;
  isLoading: boolean;
  pastDelay: boolean;
}

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%"
  }
});

const Loading: FC<IProps> = ({ error, isLoading, pastDelay, children }) => {
  const classes = useStyles();

  if (error != null) {
    // When the loader has errored.
    return (
      <div className={classes.container}>
        <Typography variant="h5">{JSON.stringify(error)}</Typography>
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
  return <>{children}</>;
};

export default Loading;
