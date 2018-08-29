import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { match as Match } from "react-router";

import DiagramApp from "workbench/canvas/DiagramApp";
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

interface IRouterProps {
  match: Match<{ id: string }>;
}

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IRouterProps;

interface ILocalState {
  diagramInstance: DiagramApp;
}

class WorkbenchContainer extends Component<Props, ILocalState> {
  public readonly state: ILocalState = {
    diagramInstance: new DiagramApp()
  };

  public componentDidMount() {
    // const instance = jsPlumb.getInstance();

    // instance.ready(() => {
    //   const jsPlumbCanvasInstance = jsPlumb.getInstance({
    //     Container: CANVAS_DRAGGABLE_CONTAINER_ID
    //   });

    //   const jsPlumbInstance = jsPlumb.getInstance({
    //     Container: DROPPABLE_CANVAS_ID
    //   });

    //   this.setState({ jsPlumbCanvasInstance, jsPlumbInstance });
    // });

    const { match } = this.props;
    const dataViewId = match.params.id === "new" ? undefined : match.params.id;

    this.props.dispatchSessionRequest(dataViewId);
  }

  public render() {
    const {
      isLoading,
      dispatchAddQuery,
      session,
      graph,
      queries,
      connections,
      filters
    } = this.props;
    // const { jsPlumbCanvasInstance, jsPlumbInstance } = this.state;

    return (
      <LoadingContainer isLoading={isLoading}>
        <WorkbenchToolbar />
        <ConfigSwitchContainer />
        <Workbench
          diagramInstance={this.state.diagramInstance}
          // jsPlumbCanvasInstance={jsPlumbCanvasInstance}
          // jsPlumbInstance={jsPlumbInstance}
          // dispatchAddQuery={dispatchAddQuery}
          moveOperatorInCanvas={this.moveOperatorInCanvas}
          session={session}
          queries={queries}
          connections={connections}
          filters={filters}
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
