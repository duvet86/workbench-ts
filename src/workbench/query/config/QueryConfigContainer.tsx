import React, { FC } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";
import { getQuery, getQueryCompletedSteps } from "workbench/query/selectors";

import LoadingContainer from "common/loading/LoadingContainer";
import QueryConfig from "workbench/query/config/QueryConfig";

type Props = ReturnType<typeof mapStateToProps>;

const QueryConfigContainer: FC<Props> = ({
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
  currentStep: state.configElements.currentStep,
  selectedQuery: getQuery(state),
  completedSteps: getQueryCompletedSteps(state)
});

export default connect(mapStateToProps)(QueryConfigContainer);
