import React, { SFC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IConfigSteps } from "workbench/configElements/types";

import { goToStep, IGoToStep } from "workbench/configElements/actions";
import StepperHeader from "workbench/configElements/StepperHeader";
import HelperText from "workbench/configElements/HelperText";

interface IOwnProps {
  title: string;
  steps: Array<IConfigSteps<any>>;
  currentStep: number;
  completedSteps: boolean[];
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

const StepperHeaderContainer: SFC<Props> = ({
  title,
  steps,
  currentStep,
  completedSteps,
  dispatchGoToStep
}) => (
  <>
    <StepperHeader
      title={title}
      steps={steps}
      currentStep={currentStep}
      completedSteps={completedSteps}
      dispatchGoToStep={dispatchGoToStep}
    />
    <HelperText stepHelpText={steps[currentStep].helper} />
  </>
);

const mapDispatchToProps = (dispatch: Dispatch<IGoToStep>) => ({
  dispatchGoToStep: (step: number) => dispatch(goToStep(step))
});

export default connect(
  undefined,
  mapDispatchToProps
)(StepperHeaderContainer);
