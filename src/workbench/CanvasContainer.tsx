import "storm-react-diagrams/dist/style.min.css";

import React, { Component } from "react";
import { DiagramModel, DiagramEngine, NodeModel } from "storm-react-diagrams";

import { IQuery, IConnection } from "workbench/types";
import QueryNodeFactory from "workbench/query/canvas/QueryNodeFactory";
import QueryNodeModel from "workbench/query/canvas/QueryNodeModel";

import Canvas from "workbench/Canvas";

interface IProps {
  queries: IQuery[];
  connections: IConnection[];
}

interface ILocalState {
  node: NodeModel;
}

export default class CanvasContainer extends Component<IProps, ILocalState> {
  private diagramEngine: DiagramEngine;

  constructor(props: IProps) {
    super(props);
    this.diagramEngine = new DiagramEngine();
    // this.diagramEngine.installDefaultFactories();
    this.diagramEngine.registerNodeFactory(new QueryNodeFactory());

    const model = new DiagramModel();
    this.diagramEngine.setDiagramModel(model);

    const nodes = props.queries.map(
      ({ Label, LayoutX, LayoutY }) =>
        new QueryNodeModel(Label, LayoutX, LayoutY)
    );

    model.addAll(...nodes);
  }

  public render() {
    const {
      // dispatchAddQuery,
      // session,
      // graph,
      // queries,
      // connections,
      // filters
    } = this.props;
    return (
      <Canvas
        diagramEngine={this.diagramEngine}
        handleDragOver={this.handleDragOver}
        handleDrop={this.handleDrop}
        // session={session}
        // queries={queries}
        // connections={connections}
        // filters={filters}
        // dispatchAddQuery={dispatchAddQuery}
      />
    );
  }

  private handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  private handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const data = JSON.parse(event.dataTransfer.getData("ELEMENT"));

    const points = this.diagramEngine.getRelativeMousePoint(event);

    const node = new QueryNodeModel("Pippo", points.x, points.y);
    this.diagramEngine.getDiagramModel().addNode(node);

    // Updating the state triggers a re render.
    this.setState({
      node
    });
  };
}
