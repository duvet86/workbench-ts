import React, { SFC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { goToStep, IGoToStep } from "workbench/configElements/actions";
import StepperHeader from "workbench/query/config/StepperHeader";

interface IOwnProps {
  currentStep: number;
  completedSteps: boolean[];
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

const StepperHeaderContainer: SFC<Props> = ({
  currentStep,
  completedSteps,
  dispatchGoToStep
}) => (
  <StepperHeader
    title="Configure Query"
    currentStep={currentStep}
    completedSteps={completedSteps}
    dispatchGoToStep={dispatchGoToStep}
  />
);

const mapDispatchToProps = (dispatch: Dispatch<IGoToStep>) => ({
  dispatchGoToStep: (step: number) => dispatch(goToStep(step))
});

export default connect(
  undefined,
  mapDispatchToProps
)(StepperHeaderContainer);
