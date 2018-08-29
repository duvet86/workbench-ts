import React, { Component } from "react";
// import { DropTarget, ConnectDropTarget, DropTargetSpec } from "react-dnd";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import DiagramApp from "workbench/canvas/DiagramApp";
import {
  ISessionDtc,
  IQuery,
  IInteractiveFilter,
  IConnection
} from "workbench/types";

import Canvas2 from "workbench/canvas/Canvas2";

interface IProps extends WithStyles<typeof styles> {
  // connectDropTarget: ConnectDropTarget;
  moveOperatorInCanvas: (
    type: string,
    index: number,
    x: number,
    y: number
  ) => void;
  // jsPlumbInstance: jsInst;
  // jsPlumbCanvasInstance: jsInst;
  diagramInstance: DiagramApp;
  session?: ISessionDtc;
  queries: IQuery[];
  filters: IInteractiveFilter[];
  connections: IConnection[];
}

interface IDropProps {
  graph: { NextElementId: number };
  dispatchAddQuery: (elementId: number) => void;
}

const styles = createStyles({
  container: {
    position: "relative",
    height: "400%",
    width: "400%"
  },
  draggableItem: {
    position: "absolute",
    height: "100%",
    width: "100%"
  }
});

// const operatorTarget: DropTargetSpec<IDropProps> = {
//   drop(props) {
//     // const { type, operatorServiceId } = monitor.getItem();
//     // const clientOffset = monitor.getClientOffset();
//     // const containerCoordinates = findDOMNode(component).getBoundingClientRect();

//     // const left = Math.round(clientOffset.x - containerCoordinates.x);
//     // const top = Math.round(clientOffset.y - containerCoordinates.y);

//     // const { type } = monitor.getItem();

//     props.dispatchAddQuery(props.graph.NextElementId);
//     // component.dropOperatorFromSideBar(type, operatorServiceId, left, top);
//   }
// };

class Workbench extends Component<IProps> {
  // public componentDidMount() {
  //   this.props.jsPlumbCanvasInstance.draggable(CANVAS_DRAGGABLE_ID);
  // }

  public render() {
    const {
      classes,
      diagramInstance,
      moveOperatorInCanvas,
      session,
      queries,
      filters,
      connections
    } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.draggableItem}>
          <Canvas2 diagramInstance={diagramInstance} />
          {/* <Canvas
                containerId={DROPPABLE_CANVAS_ID}
                jsPlumbInstance={jsPlumbInstance}
                moveOperatorInCanvas={moveOperatorInCanvas}
                queries={queries}
                filters={filters}
                connections={connections}
              /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Workbench);
