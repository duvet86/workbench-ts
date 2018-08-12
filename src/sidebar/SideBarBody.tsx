import PropTypes from "prop-types";
import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

interface IProps extends WithStyles<typeof styles> {
  tabRenderer: () => JSX.Element;
}

const styles = createStyles({
  bodyContainer: {
    overflow: "auto",
    marginBottom: 48,
    height: "100%"
  }
});

const SideBarBody: SFC<IProps> = ({ classes, tabRenderer }) => (
  <div className={classes.bodyContainer}>{tabRenderer()}</div>
);

SideBarBody.propTypes = {
  classes: PropTypes.object.isRequired,
  tabRenderer: PropTypes.func.isRequired
};

export default withStyles(styles)(SideBarBody);
