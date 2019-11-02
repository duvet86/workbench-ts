import React, { FC } from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams";

import { makeStyles } from "@material-ui/core/styles";

import WorkbenchToolbar from "workbench/toolBar/WorkbenchToolbar";
import ConfigSwitchContainer from "workbench/configElements/ConfigSwitchContainer";
import Canvas from "workbench/Canvas";

interface IProps {
  diagramEngine: DiagramEngine;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const useStyles = makeStyles({
  workbench: {
    height: "100%",
    width: "100%",
    border: "3px solid #ccc",
    backgroundColor: "#ccc"
  },
  canvasContainer: {
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

const Workbench: FC<IProps> = ({
  diagramEngine,
  handleDragOver,
  handleDrop
}) => {
  const classes = useStyles();

  return (
    <div className={classes.workbench}>
      {/* <WorkbenchToolbar />
      <ConfigSwitchContainer /> */}
      <div className={classes.canvasContainer}>
        <Canvas
          diagramEngine={diagramEngine}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
      </div>
    </div>
  );
};

export default Workbench;
