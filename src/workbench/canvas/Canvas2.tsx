import "storm-react-diagrams/dist/style.min.css";

import React, { SFC } from "react";
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  DiagramWidget,
  DefaultLinkModel
} from "storm-react-diagrams";

import DiagramApp from "workbench/canvas/DiagramApp";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

interface IProps extends WithStyles<typeof styles> {
  diagramInstance: DiagramApp;
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

const handleDrop = (diagramInstance: DiagramApp) => (
  event: React.DragEvent<HTMLDivElement>
) => {
  const data = JSON.parse(event.dataTransfer.getData("ELEMENT"));
  const nodesCount = Object.keys(
    diagramInstance
      .getDiagramEngine()
      .getDiagramModel()
      .getNodes()
  ).length;

  let node: DefaultNodeModel;
  if (data.type === "in") {
    node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(192,255,0)");
    node.addInPort("In");
  } else {
    node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(0,192,255)");
    node.addOutPort("Out");
  }
  const points = diagramInstance
    .getDiagramEngine()
    .getRelativeMousePoint(event);
  node.x = points.x;
  node.y = points.y;
  diagramInstance
    .getDiagramEngine()
    .getDiagramModel()
    .addNode(node);
  // this.forceUpdate();
};

const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
};

const Canvas2: SFC<IProps> = ({ classes, diagramInstance }) => (
  <div
    className={classes.canvasContainer}
    onDrop={handleDrop(diagramInstance)}
    onDragOver={handleDragOver}
  >
    <DiagramWidget
      className={classes.canvas}
      diagramEngine={diagramInstance.getDiagramEngine()}
    />
  </div>
);

export default withStyles(styles)(Canvas2);
