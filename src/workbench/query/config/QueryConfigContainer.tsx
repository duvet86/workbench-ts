import React, { Component } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";
import { getQuery, getCompletedSteps } from "workbench/query/selectors";

import { LoadingContainer } from "common/loading";
import QueryConfig from "workbench/query/config/QueryConfig";

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
      <LoadingContainer background isLoading={isLoading}>
        <QueryConfig
          selectedQuery={selectedQuery}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </LoadingContainer>
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
