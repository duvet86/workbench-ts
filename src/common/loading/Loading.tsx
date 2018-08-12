import PropTypes from "prop-types";
import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import BaseLoading from "common/loading/BaseLoading";

interface IProps {
  classes: object;
  error?: object;
  isLoading: boolean;
  pastDelay: boolean;
  children: React.ReactElement<any>;
}

const styles = withStyles({
  container: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%"
  }
});

const Loading = styles<IProps>(
  ({ classes, error, isLoading, pastDelay, children }) => {
    if (error) {
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
  }
);

Loading.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};

export default Loading;
