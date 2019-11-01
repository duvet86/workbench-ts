import React, { FC } from "react";
import { DiagramEngine, DiagramWidget } from "storm-react-diagrams2";

import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  diagramEngine: DiagramEngine;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

const useStyles = makeStyles({
  canvasContainer: {
    height: "100%",
    width: "100%"
  },
  canvas: {
    height: "100%",
    width: "100%"
  }
});

const Workbench: FC<IProps> = ({
  diagramEngine,
  handleDragOver,
  handleDrop
}) => {
  const classes = useStyles();

  return (
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
};

export default Workbench;
