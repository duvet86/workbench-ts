import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

interface IProps extends WithStyles<typeof styles> {
  tabRenderer: () => JSX.Element;
}

const styles = createStyles({
  bodyContainer: {
    height: "100%",
    display: "flex"
  }
});

const SideBarBody: SFC<IProps> = ({ classes, tabRenderer }) => (
  <div className={classes.bodyContainer}>{tabRenderer()}</div>
);

export default withStyles(styles)(SideBarBody);
