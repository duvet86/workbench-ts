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

import QueryNodeFactory from "workbench/query/canvas/QueryNodeFactory";
import QueryNodeModel from "workbench/query/canvas/QueryNodeModel";
import QueryPortModel from "workbench/query/canvas/QueryPortModel";
import QueryPortFactory from "workbench/query/canvas/QueryPortFactory";

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
      new QueryPortFactory(new QueryPortModel())
    );
    this.diagramEngine.registerNodeFactory(new QueryNodeFactory());

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
      const nodes = Object.keys(this.props.queries).map(
        id => new QueryNodeModel(this.props.queries[id])
      );

      this.activeModel.addAll(...nodes);
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
