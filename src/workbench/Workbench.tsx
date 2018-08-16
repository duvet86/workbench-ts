import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget, ConnectDropTarget } from "react-dnd";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import { itemType } from "sideBar/operators/operatorsData";
import {
  CANVAS_DRAGGABLE_CONTAINER_ID,
  CANVAS_DRAGGABLE_ID
} from "workbench/utils";

import Canvas from "workbench/canvas/Canvas";

import IntervalSelector from "common/intervalSelector/IntervalSelector";

import SelectInput2 from "common/select/SelectInput2";

interface IProps extends WithStyles<typeof styles> {
  connectDropTarget: ConnectDropTarget;
  moveOperatorInCanvas: () => void;
  jsPlumbInstance: any;
  jsPlumbCanvasInstance: any;
  session: any;
}

interface IDropProps {
  graph: { NextElementId: number };
  dispatchAddQuery: (elementId: number) => void;
}

const DROPPABLE_CANVAS_ID = "droppable-canvas";

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

const operatorTarget = {
  drop(props: IDropProps) {
    // const { type, operatorServiceId } = monitor.getItem();
    // const clientOffset = monitor.getClientOffset();
    // const containerCoordinates = findDOMNode(component).getBoundingClientRect();

    // const left = Math.round(clientOffset.x - containerCoordinates.x);
    // const top = Math.round(clientOffset.y - containerCoordinates.y);

    // const { type } = monitor.getItem();

    props.dispatchAddQuery(props.graph.NextElementId);
    // component.dropOperatorFromSideBar(type, operatorServiceId, left, top);
  }
};

class Workbench extends Component<IProps> {
  public static propTypes = {
    classes: PropTypes.object.isRequired,
    dispatchAddQuery: PropTypes.func.isRequired,
    session: PropTypes.object,
    graph: PropTypes.object
  };

  public componentDidMount() {
    this.props.jsPlumbCanvasInstance.draggable(CANVAS_DRAGGABLE_ID);
  }

  public render() {
    const {
      classes,
      connectDropTarget
      // moveOperatorInCanvas,
      // jsPlumbInstance,
      // session
    } = this.props;

    return (
      <div id={CANVAS_DRAGGABLE_CONTAINER_ID} className={classes.container}>
        <SelectInput2 />
        <div id={CANVAS_DRAGGABLE_ID} className={classes.draggableItem}>
          {connectDropTarget(
            <span>
              {/* <Canvas
                containerId={DROPPABLE_CANVAS_ID}
                jsPlumbInstance={jsPlumbInstance}
                moveOperatorInCanvas={moveOperatorInCanvas}
                session={session}
              /> */}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(
  DropTarget<any>(itemType.OPERATOR, operatorTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(Workbench)
);
