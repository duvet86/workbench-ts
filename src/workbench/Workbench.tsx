import React, { SFC, Fragment } from "react";
import { match as Match } from "react-router";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import WorkbenchToolbar from "workbench/toolBar/WorkbenchToolbar";
import ConfigSwitchContainer from "workbench/configSwitch/ConfigSwitchContainer";
import CanvasContainer from "workbench/CanvasContainer";

interface IProps extends WithStyles<typeof styles> {
  match: Match<{ id: string }>;
}

const styles = createStyles({
  canvasContainer: {
    height: "100%",
    width: "100%",
    border: "3px solid #ccc",
    backgroundColor: "#ccc"
  },
  canvas: {
    borderRadius: 5,
    height: "100%",
    width: "100%",
    backgroundColor: "#3c3c3c",
    backgroundImage: `linear-gradient(
      0deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    )`,
    backgroundSize: "50px 50px"
  }
});

const Workbench: SFC<IProps> = ({ classes, match }) => (
  <div className={classes.canvasContainer}>
    <WorkbenchToolbar />
    <ConfigSwitchContainer />
    <div className={classes.canvas}>
      <CanvasContainer match={match} />
    </div>
  </div>
);

export default withStyles(styles)(Workbench);
