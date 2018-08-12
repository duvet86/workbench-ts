import PropTypes from "prop-types";
import React, { Fragment } from "react";

import { withStyles } from "@material-ui/core/styles";

import BaseLoading from "common/loading/BaseLoading";

interface IProps {
  isLoading: boolean;
  pastDelay: boolean;
  children: React.ReactNode;
}

const styles = withStyles({
  container: {
    backgroundColor: "#eee",
    height: "100%",
    opacity: 0.7,
    position: "absolute",
    width: "99%",
    zIndex: 1
  },
  loading: {
    left: "48%",
    position: "absolute",
    top: "30%"
  }
});

const BackgroundLoading = styles<IProps>(
  ({ classes, isLoading, pastDelay, children }) => (
    <Fragment>
      {isLoading &&
        pastDelay && (
          <div className={classes.container}>
            <div className={classes.loading}>
              <BaseLoading />
            </div>
          </div>
        )}
      {children}
    </Fragment>
  )
);

BackgroundLoading.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pastDelay: PropTypes.bool.isRequired
};

export default BackgroundLoading;
