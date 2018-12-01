import React, { SFC } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";

import LoadingContainer from "common/loading/LoadingContainer";
import FilterConfig from "workbench/filter/config/FilterConfig";

type Props = ReturnType<typeof mapStateToProps>;

const QueryConfigContainer: SFC<Props> = ({
  isLoading,
  currentStep,
  completedSteps
}) => (
  <LoadingContainer background isLoading={isLoading}>
    <FilterConfig currentStep={currentStep} completedSteps={completedSteps} />
  </LoadingContainer>
);

const mapStateToProps = (state: RootState) => ({
  isLoading: state.queryConfig.isLoading,
  currentStep: state.configElements.currentStep,
  completedSteps: []
});

export default connect(mapStateToProps)(QueryConfigContainer);
