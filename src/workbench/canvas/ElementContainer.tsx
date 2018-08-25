import React, { Component } from "react";
import { DragEventCallbackOptions, jsPlumbInstance as jsInst } from "jsplumb";

import {
  topEndPointConfig,
  bottomEndPointConfig,
  connectionConfig
} from "workbench/utils";
import { ElementType } from "sidebar/operators/types";
import { IColumn, IConnection } from "workbench/types";

import QueryElement from "workbench/query/QueryElement";
import FilterElement from "workbench/filter/FilterElement";

interface IProps {
  jsPlumbInstance: jsInst;
  moveOperatorInCanvas: (
    type: string,
    index: number,
    x: number,
    y: number
  ) => void;
  connections: IConnection[];
  index: number;
  type: string;
  elementId: number;
  elementLabel: string;
  x: number;
  y: number;
  columns?: IColumn[];
}

class ElementContainer extends Component<IProps> {
  public componentDidMount() {
    const {
      jsPlumbInstance,
      connections,
      moveOperatorInCanvas,
      index,
      type,
      elementId
    } = this.props;

    jsPlumbInstance.addEndpoint(elementId.toString(), topEndPointConfig);
    jsPlumbInstance.addEndpoint(elementId.toString(), bottomEndPointConfig);

    jsPlumbInstance.draggable(elementId, {
      containment: "true",
      stop: ({ pos }: DragEventCallbackOptions) => {
        moveOperatorInCanvas(type, index, ...pos);
      }
    });

    // this.makeConnections(jsPlumbInstance, connections);
  }

  public componentDidUpdate() {
    this.props.jsPlumbInstance.revalidate("");
  }

  // public componentWillReceiveProps(nextProps: IProps) {
  //   if (this.props.connections.length !== nextProps.connections.length) {
  //     const { jsPlumbInstance, connections } = nextProps;
  //     this.makeConnections(jsPlumbInstance, connections);
  //   }
  // }

  public render() {
    const {
      jsPlumbInstance,
      connections,
      moveOperatorInCanvas,
      type,
      ...props
    } = this.props;

    switch (type) {
      case ElementType.QUERY:
        return <QueryElement {...props} />;
      case ElementType.FILTER:
        return <FilterElement {...props} />;
      default:
        return null;
    }
  }

  private makeConnections = (
    jsPlumbInstance: any,
    connections: Array<{
      source: string;
      target: string;
    }>
  ) => {
    // jsPlumbInstance.deleteEveryConnection();
    connections.forEach(connObj => {
      if (
        (jsPlumbInstance.getEndpoints(connObj.source).length ||
          jsPlumbInstance.isSource(connObj.source)) &&
        (jsPlumbInstance.getEndpoints(connObj.target).length ||
          jsPlumbInstance.isTarget(connObj.target))
      ) {
        jsPlumbInstance.connect(
          {
            source: connObj.source,
            target: connObj.target
          },
          connectionConfig
        );
      }
    });
  };
}

export default ElementContainer;
