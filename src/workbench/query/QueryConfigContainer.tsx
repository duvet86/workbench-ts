import React, { Component } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";
import { getQuery, getCompletedSteps } from "workbench/query/selectors";

import QueryConfig from "workbench/query/QueryConfig";

class QueryConfigContainer extends Component<
  ReturnType<typeof mapStateToProps>
> {
  public render() {
    const {
      isLoading,
      selectedQuery,
      currentStep,
      completedSteps
    } = this.props;

    return (
      <QueryConfig
        isLoading={isLoading}
        selectedQuery={selectedQuery}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.queryConfigReducer.isLoading,
  selectedQuery: getQuery(state),
  currentStep: state.queryConfigReducer.currentStep,
  completedSteps: getCompletedSteps(state)
});

export default connect(mapStateToProps)(QueryConfigContainer);
