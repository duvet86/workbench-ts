import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { match as Match } from "react-router";

import { RootState } from "rootReducer";
import {
  sessionRequest,
  addQuery,
  SessionAction,
  QueryAction
} from "workbench/actions";

import { LoadingContainer } from "common/loading";
import WorkbenchToolbar from "workbench/toolBar/WorkbenchToolbar";
import ConfigSwitchContainer from "workbench/configSwitch/ConfigSwitchContainer";
import CanvasContainer from "workbench/CanvasContainer";

interface IRouterProps {
  match: Match<{ id: string }>;
}

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IRouterProps;

class WorkbenchContainer extends Component<Props> {
  public componentDidMount() {
    const { match } = this.props;
    const dataViewId = match.params.id === "new" ? undefined : match.params.id;

    this.props.dispatchSessionRequest(dataViewId);
  }

  public render() {
    const {
      isLoading,
      // dispatchAddQuery,
      // session,
      // graph,
      queries,
      connections
      // filters
    } = this.props;
    return (
      <LoadingContainer isLoading={isLoading}>
        <WorkbenchToolbar />
        <ConfigSwitchContainer />
        {/* <CanvasContainer
          // session={session}
          queries={queries}
          connections={connections}
          // filters={filters}
          // dispatchAddQuery={dispatchAddQuery}
        /> */}
      </LoadingContainer>
    );
  }
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
