import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { goToStep, IGoToStep } from "workbench/query/actions";

import StepperHeader from "workbench/query/config/StepperHeader";

const stepLabels = ["Source", "Columns", "Constraints", "Summary"];

interface IOwnProps {
  currentStep: number;
  completedSteps: boolean[];
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

class StepperHeaderContainer extends Component<Props> {
  public render() {
    const { currentStep, completedSteps, dispatchGoToStep } = this.props;

    return (
      <StepperHeader
        title="Configure Query"
        stepLabels={stepLabels}
        currentStep={currentStep}
        completedSteps={completedSteps}
        dispatchGoToStep={dispatchGoToStep}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IGoToStep>) => ({
  dispatchGoToStep: (step: number) => dispatch(goToStep(step))
});

export default connect(
  null,
  mapDispatchToProps
)(StepperHeaderContainer);
