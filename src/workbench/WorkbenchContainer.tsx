import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { jsPlumb, jsPlumbInstance as jsInst } from "jsplumb";
import { match as Match } from "react-router";

import { CANVAS_DRAGGABLE_CONTAINER_ID } from "workbench/utils";
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

interface IRouterProps {
  match: Match<{ id: string }>;
}

interface IDispatchProps {
  dispatchSessionRequest: (dataViewId?: string) => void;
  dispatchAddQuery: (elementId: number) => void;
}

interface IProps {
  isLoading: boolean;
  session: ISessionDtc;
  graph: IQueryGraphDataDtc;
  queries: IQuery[];
  filters: IInteractiveFilter[];
  connections: IConnection[];
}

type Props = IDispatchProps & IProps & IRouterProps;

interface IStoreState {
  sessionReducer: IProps;
}

interface ILocalState {
  jsPlumbCanvasInstance?: jsInst;
  jsPlumbInstance?: jsInst;
}

const DROPPABLE_CANVAS_ID = "droppable-canvas";

class WorkbenchContainer extends Component<Props, ILocalState> {
  public readonly state: ILocalState = {
    jsPlumbCanvasInstance: undefined,
    jsPlumbInstance: undefined
  };

  public componentDidMount() {
    const instance = jsPlumb.getInstance();

    instance.ready(() => {
      const jsPlumbCanvasInstance = jsPlumb.getInstance({
        Container: CANVAS_DRAGGABLE_CONTAINER_ID
      });

      const jsPlumbInstance = jsPlumb.getInstance({
        Container: DROPPABLE_CANVAS_ID
      });

      this.setState({ jsPlumbCanvasInstance, jsPlumbInstance });
    });

    const { match } = this.props;
    const dataViewId = match.params.id === "new" ? undefined : match.params.id;

    this.props.dispatchSessionRequest(dataViewId);
  }

  public render() {
    const { isLoading, dispatchAddQuery, session, graph } = this.props;
    const { jsPlumbCanvasInstance, jsPlumbInstance } = this.state;

    return (
      <LoadingContainer isLoading={isLoading || jsPlumbCanvasInstance != null}>
        <WorkbenchToolbar />
        <ConfigSwitchContainer />
        <Workbench
          jsPlumbCanvasInstance={jsPlumbCanvasInstance}
          jsPlumbInstance={jsPlumbInstance}
          dispatchAddQuery={dispatchAddQuery}
          moveOperatorInCanvas={this.moveOperatorInCanvas}
          session={session}
          graph={graph}
        />
      </LoadingContainer>
    );
  }

  private moveOperatorInCanvas = (
    type: string,
    index: number,
    x: number,
    y: number
  ) => {
    // this.props.dispatchCanvasOperatorMove(type, index, x, y);
  };
}

const mapStateToProps = ({ sessionReducer: { ...state } }: IStoreState) =>
  state;

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
