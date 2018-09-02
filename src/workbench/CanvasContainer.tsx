import "storm-react-diagrams/dist/style.min.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { match as Match } from "react-router";
import { DiagramModel, DiagramEngine, NodeModel } from "storm-react-diagrams";

import { RootState } from "rootReducer";
import {
  sessionRequest,
  addQuery,
  SessionAction,
  QueryAction
} from "workbench/actions";

import WorkbenchPortFactory from "workbench/WorkbenchPortFactory";
import WorkbenchPortModel from "workbench/WorkbenchPortModel";

import QueryNodeFactory from "workbench/query/widget/QueryNodeFactory";
import QueryNodeModel from "workbench/query/widget/QueryNodeModel";

import FilterNodeFactory from "workbench/filter/FilterNodeFactory";
import FilterNodeModel from "workbench/filter/FilterNodeModel";

import { LoadingContainer } from "common/loading";
import Canvas from "workbench/Canvas";

interface IRouterProps {
  match: Match<{ id: string }>;
}

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IRouterProps;

interface ILocalState {
  node: NodeModel;
}

class CanvasContainer extends Component<Props, ILocalState> {
  private diagramEngine: DiagramEngine;
  private activeModel: DiagramModel;

  constructor(props: Props) {
    super(props);
    this.diagramEngine = new DiagramEngine();
    this.diagramEngine.installDefaultFactories();

    this.diagramEngine.registerPortFactory(
      new WorkbenchPortFactory(new WorkbenchPortModel())
    );
    this.diagramEngine.registerNodeFactory(new QueryNodeFactory());
    this.diagramEngine.registerNodeFactory(new FilterNodeFactory());

    this.activeModel = new DiagramModel();
    this.diagramEngine.setDiagramModel(this.activeModel);
  }

  public componentDidMount() {
    const { match } = this.props;
    const dataViewId = match.params.id === "new" ? undefined : match.params.id;

    this.props.dispatchSessionRequest(dataViewId);
  }

  public componentDidUpdate(prevProps: Props) {
    const currentSession = this.props.session;
    if (currentSession == null) {
      return;
    }

    const prevSession = prevProps.session;
    if (
      prevSession == null ||
      currentSession.SessionId !== prevSession.SessionId
    ) {
      const queryNodes = Object.keys(this.props.queries).map(
        id => new QueryNodeModel(this.props.queries[id])
      );

      const filterNodes = Object.keys(this.props.filters).map(
        id => new FilterNodeModel(this.props.filters[id])
      );

      this.activeModel.addAll(...queryNodes);
      this.activeModel.addAll(...filterNodes);

      const links = [];
      for (const id of Object.keys(this.props.connections)) {
        const connection = this.props.connections[id];

        const nodeFrom = this.activeModel.getNode(
          connection.FromElementId.toString()
        );

        const nodeTo = this.activeModel.getNode(
          connection.ToElementId.toString()
        );

        if (nodeFrom == null || nodeTo == null) {
          return;
        }

        const portTo = nodeTo.getPort("to") as WorkbenchPortModel;
        const portFrom = nodeFrom.getPort("from") as WorkbenchPortModel;

        links.push(portTo.link(portFrom));
      }

      this.activeModel.addAll(...links);
    }
  }

  public render() {
    const {
      isLoading
      // dispatchAddQuery,
      // session,
      // graph,
      // queries,
      // connections,
      // filters
    } = this.props;

    return (
      <LoadingContainer isLoading={isLoading}>
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
      </LoadingContainer>
    );
  }

  private handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  private handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    // const data = JSON.parse(event.dataTransfer.getData("ELEMENT"));
    // const points = this.diagramEngine.getRelativeMousePoint(event);
    // const node = new QueryNodeModel("Pippo", points.x, points.y);
    // this.diagramEngine.getDiagramModel().addNode(node);
    // // Updating the state triggers a re render.
    // this.setState({
    //   node
    // });
  };
}

const mapStateToProps = ({ sessionReducer: { ...state } }: RootState) => state;

const mapDispatchToProps = (
  dispatch: Dispatch<SessionAction | QueryAction>
) => ({
  dispatchSessionRequest: (dataViewId?: string) => {
    dispatch(sessionRequest(dataViewId));
  },
  dispatchAddQuery: (elementId: number) => dispatch(addQuery(elementId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasContainer);
