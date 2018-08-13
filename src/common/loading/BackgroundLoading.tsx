import PropTypes from "prop-types";
import React, { Fragment, SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import BaseLoading from "common/loading/BaseLoading";

interface IProps extends WithStyles<typeof styles> {
  isLoading: boolean;
  pastDelay: boolean;
  children: React.ReactNode;
}

const styles = createStyles({
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

const BackgroundLoading: SFC<IProps> = ({
  classes,
  isLoading,
  pastDelay,
  children
}) => (
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
);

BackgroundLoading.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pastDelay: PropTypes.bool.isRequired
};

export default withStyles(styles)(BackgroundLoading);
