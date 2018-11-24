import React, { SFC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { goToStep, IGoToStep } from "workbench/configElements/actions";
import StepperHeader from "workbench/configElements/StepperHeader";

interface IOwnProps {
  title: string;
  currentStep: number;
  completedSteps: boolean[];
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

const StepperHeaderContainer: SFC<Props> = props => (
  <StepperHeader {...props} />
);

const mapDispatchToProps = (dispatch: Dispatch<IGoToStep>) => ({
  dispatchGoToStep: (step: number) => dispatch(goToStep(step))
});

export default connect(
  undefined,
  mapDispatchToProps
)(StepperHeaderContainer);
