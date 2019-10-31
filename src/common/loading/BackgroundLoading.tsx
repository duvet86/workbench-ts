import React, { Fragment, FC } from "react";

import { makeStyles } from "@material-ui/core/styles";

import BaseLoading from "common/loading/BaseLoading";
import Paper from "@material-ui/core/Paper";

interface IProps {
  isLoading: boolean;
  pastDelay: boolean;
}

const useStyles = makeStyles({
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

const BackgroundLoading: FC<IProps> = ({ isLoading, pastDelay, children }) => {
  const classes = useStyles();

  return (
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
};

export default BackgroundLoading;
