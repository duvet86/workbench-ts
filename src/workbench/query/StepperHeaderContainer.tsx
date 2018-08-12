import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { goToStep, IGoToStep } from "workbench/query/actions";

import StepperHeader from "workbench/query/StepperHeader";

const stepLabels = ["Source", "Columns", "Constraints", "Summary"];

interface IDispatchProps {
  dispatchGoToStep: (step: number) => void;
}

interface IProps {
  currentStep: number;
  completedSteps: boolean[];
}

type Props = IProps & IDispatchProps;

class StepperHeaderContainer extends Component<Props> {
  public static propTypes = {
    currentStep: PropTypes.number.isRequired,
    completedSteps: PropTypes.array.isRequired,
    dispatchGoToStep: PropTypes.func.isRequired
  };

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
