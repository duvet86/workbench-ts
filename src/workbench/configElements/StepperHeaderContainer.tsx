import React, { SFC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IHelperText } from "workbench/configElements/types";

import { goToStep, IGoToStep } from "workbench/configElements/actions";
import StepperHeader from "workbench/configElements/StepperHeader";
import HelperText from "workbench/configElements/HelperText";

interface IOwnProps {
  title: string;
  stepLabels: string[];
  currentStep: number;
  completedSteps: boolean[];
  stepsHelpText?: Array<IHelperText | undefined>;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

const StepperHeaderContainer: SFC<Props> = ({
  stepsHelpText,
  currentStep,
  ...rest
}) => (
  <>
    <StepperHeader currentStep={currentStep} {...rest} />
    {stepsHelpText && (
      <HelperText stepsHelpText={stepsHelpText} currentStep={currentStep} />
    )}
  </>
);

const mapDispatchToProps = (dispatch: Dispatch<IGoToStep>) => ({
  dispatchGoToStep: (step: number) => dispatch(goToStep(step))
});

export default connect(
  undefined,
  mapDispatchToProps
)(StepperHeaderContainer);
