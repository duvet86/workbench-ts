import React, { SFC } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";
import { getQuery, getCompletedSteps } from "workbench/query/selectors";

import LoadingContainer from "common/loading/LoadingContainer";
import QueryConfig from "workbench/query/config/QueryConfig";

type Props = ReturnType<typeof mapStateToProps>;

const QueryConfigContainer: SFC<Props> = ({
  isLoading,
  selectedQuery,
  currentStep,
  completedSteps
}) => (
  <LoadingContainer background isLoading={isLoading}>
    <QueryConfig
      query={selectedQuery}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
  </LoadingContainer>
);

const mapStateToProps = (state: RootState) => ({
  isLoading: state.queryConfig.isLoading,
  selectedQuery: getQuery(state),
  currentStep: state.queryConfig.currentStep,
  completedSteps: getCompletedSteps(state)
});

export default connect(mapStateToProps)(QueryConfigContainer);
