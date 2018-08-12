import PropTypes from "prop-types";
import React from "react";

import { withStyles } from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const styles = withStyles(theme => ({
  laodingContainer: {
    margin: theme.spacing.unit * 2
  }
}));

const BaseLoading = styles(({ classes }) => (
  <div className={classes.laodingContainer}>
    <Typography variant="title">Loading...</Typography>
    <LinearProgress variant="query" />
  </div>
));

BaseLoading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default BaseLoading;
