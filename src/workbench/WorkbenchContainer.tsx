import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { jsPlumb } from "jsplumb";
import { match as Match } from "react-router";

import { CANVAS_DRAGGABLE_CONTAINER_ID } from "workbench/utils";
import {
  sessionRequest,
  addQuery,
  SessionAction,
  QueryAction
} from "workbench/actions";

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
  session: any;
  graph: any;
  queries: any[];
  filters: any[];
  connections: any[];
}

type Props = IDispatchProps & IProps & IRouterProps;

interface IStoreState {
  sessionReducer: IProps;
}

interface ILocalState {
  jsPlumbCanvasInstance?: any;
  jsPlumbInstance?: any;
}

const DROPPABLE_CANVAS_ID = "droppable-canvas";

class WorkbenchContainer extends Component<Props, ILocalState> {
  public static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    dispatchSessionRequest: PropTypes.func.isRequired,
    dispatchAddQuery: PropTypes.func.isRequired,
    // dispatchCanvasOperatorMove: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    graph: PropTypes.object.isRequired,
    queries: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    connections: PropTypes.object.isRequired
  };

  public readonly state = {
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
      <LoadingContainer isLoading={isLoading || !jsPlumbCanvasInstance}>
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
