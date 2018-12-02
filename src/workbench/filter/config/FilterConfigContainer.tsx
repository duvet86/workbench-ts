import React, { SFC } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";
import { getFilter } from "workbench/filter/selectors";

import FilterConfig from "workbench/filter/config/FilterConfig";

type Props = ReturnType<typeof mapStateToProps>;

const QueryConfigContainer: SFC<Props> = ({ currentStep, completedSteps }) => (
  <FilterConfig currentStep={currentStep} completedSteps={completedSteps} />
);

const mapStateToProps = (state: RootState) => ({
  currentStep: state.configElements.currentStep,
  selectedFilter: getFilter(state),
  completedSteps: []
});

export default connect(mapStateToProps)(QueryConfigContainer);
