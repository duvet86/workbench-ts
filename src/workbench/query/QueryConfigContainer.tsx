import React, { Component } from "react";
import { connect } from "react-redux";

import { IQuery } from "workbench/types";
import { getQuery, getCompletedSteps, IState } from "workbench/query/selectors";

import QueryConfig from "workbench/query/QueryConfig";

interface IProps {
  isLoading: boolean;
  selectedQuery: IQuery;
  currentStep: number;
  completedSteps: boolean[];
}

class QueryConfigContainer extends Component<IProps> {
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

const mapStateToProps = (state: IState) => ({
  isLoading: state.queryConfigReducer.isLoading,
  selectedQuery: getQuery(state),
  currentStep: state.queryConfigReducer.currentStep,
  completedSteps: getCompletedSteps(state)
});

export default connect(mapStateToProps)(QueryConfigContainer);
