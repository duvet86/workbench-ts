import React, { SFC } from "react";
import { DiagramEngine, DiagramWidget } from "storm-react-diagrams2";

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
    width: "100%"
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
    <DiagramWidget
      className={classes.canvas}
      diagramEngine={diagramEngine}
      maxNumberPointsPerLink={0}
      allowLooseLinks={false}
    />
  </div>
);

export default withStyles(styles)(Workbench);
