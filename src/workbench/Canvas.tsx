import "storm-react-diagrams/dist/style.min.css";

import React, { SFC } from "react";
import { DiagramEngine, DiagramWidget } from "storm-react-diagrams";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

interface IProps extends WithStyles<typeof styles> {
  diagramEngine: DiagramEngine;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

const styles = createStyles({
  canvasContainer: {
    height: "100%",
    width: "100%"
  },
  canvas: {
    height: "100%",
    widTH: "100%",
    backgroundColor: "#3c3c3c !important",
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

const Workbench: SFC<IProps> = ({
  classes,
  diagramEngine,
  handleDragOver,
  handleDrop
}) => (
  <div
    className={classes.canvasContainer}
    onDrop={handleDrop}
    onDragOver={handleDragOver}
  >
    <DiagramWidget className={classes.canvas} diagramEngine={diagramEngine} />
  </div>
);

export default withStyles(styles)(Workbench);
