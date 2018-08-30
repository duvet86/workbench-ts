import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { match as Match } from "react-router";
import {
  DiagramModel,
  DiagramEngine,
  DefaultNodeModel,
  NodeModel
} from "storm-react-diagrams";

import { RootState } from "rootReducer";
import {
  sessionRequest,
  addQuery,
  SessionAction,
  QueryAction
} from "workbench/actions";
import {
  ISessionDtc,
  IQueryGraphDataDtc,
  IQuery,
  IInteractiveFilter,
  IConnection
} from "workbench/types";

import { LoadingContainer } from "common/loading";
import WorkbenchToolbar from "workbench/toolBar/WorkbenchToolbar";
import Workbench from "workbench/Workbench";
import ConfigSwitchContainer from "workbench/configSwitch/ConfigSwitchContainer";

import QueryNodeFactory from "workbench/query/canvas/QueryNodeFactory";
import QueryNodeModel from "workbench/query/canvas/QueryNodeModel";

interface IRouterProps {
  match: Match<{ id: string }>;
}

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IRouterProps;

interface ILocalState {
  node?: NodeModel;
}

class WorkbenchContainer extends Component<Props, ILocalState> {
  private diagramEngine: DiagramEngine;

  constructor(props: Props) {
    super(props);
    this.diagramEngine = new DiagramEngine();
    // this.diagramEngine.installDefaultFactories();
    this.diagramEngine.registerNodeFactory(new QueryNodeFactory());

    const model = new DiagramModel();
    this.diagramEngine.setDiagramModel(model);
  }

  public componentDidMount() {
    const { match } = this.props;
    const dataViewId = match.params.id === "new" ? undefined : match.params.id;

    this.props.dispatchSessionRequest(dataViewId);
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
        <WorkbenchToolbar />
        <ConfigSwitchContainer />
        <Workbench
          diagramEngine={this.diagramEngine}
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

  private handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const data = JSON.parse(event.dataTransfer.getData("ELEMENT"));

    const node = new QueryNodeModel();

    const points = this.diagramEngine.getRelativeMousePoint(event);
    node.x = points.x;
    node.y = points.y;
    this.diagramEngine.getDiagramModel().addNode(node);

    // Updating the state triggers a re render.
    this.setState({
      node
    });
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
)(WorkbenchContainer);
