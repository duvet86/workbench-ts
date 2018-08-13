import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  topEndPointConfig,
  bottomEndPointConfig,
  connectionConfig
} from "workbench/utils";
import { ElementType } from "sideBar/operators/operatorsData";

import QueryElement from "workbench/query/QueryElement";
import FilterElement from "workbench/filter/FilterElement";

interface IProps {
  jsPlumbInstance: any;
  moveOperatorInCanvas: (type: string, index: number, ...pos: any[]) => void; // spread workaround
  connections: any[];
  index: number;
  type: string;
  elementId: number;
  elementLabel: string;
  filterType: ElementType;
  x: number;
  y: number;
  columns: Array<{
    Label: string;
    ColumnName: string;
  }>;
}

class ElementContainer extends Component<IProps> {
  public static propTypes = {
    jsPlumbInstance: PropTypes.object.isRequired,
    moveOperatorInCanvas: PropTypes.func.isRequired,
    connections: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    elementId: PropTypes.string.isRequired,
    elementLabel: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    columns: PropTypes.array.isRequired
  };

  public componentDidMount() {
    const {
      jsPlumbInstance,
      connections,
      moveOperatorInCanvas,
      index,
      type,
      elementId
    } = this.props;

    jsPlumbInstance.addEndpoint(elementId, topEndPointConfig);
    jsPlumbInstance.addEndpoint(elementId, bottomEndPointConfig);

    jsPlumbInstance.draggable(elementId, {
      containment: true,
      stop: ({ pos }: { pos: { x: number; y: number } }) => {
        moveOperatorInCanvas(type, index, ...(pos as any)); // spread workaround
      }
    });

    this.makeConnections(jsPlumbInstance, connections);
  }

  public componentDidUpdate() {
    this.props.jsPlumbInstance.revalidate();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.props.connections.length !== nextProps.connections.length) {
      const { jsPlumbInstance, connections } = nextProps;
      this.makeConnections(jsPlumbInstance, connections);
    }
  }

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
