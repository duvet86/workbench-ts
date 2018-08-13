import PropTypes from "prop-types";
import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const styles = ({ spacing }: Theme) =>
  createStyles({
    laodingContainer: {
      margin: spacing.unit * 2
    }
  });

const BaseLoading: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <div className={classes.laodingContainer}>
    <Typography variant="title">Loading...</Typography>
    <LinearProgress variant="query" />
  </div>
);

BaseLoading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BaseLoading);
