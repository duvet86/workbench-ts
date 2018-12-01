import React, { SFC } from "react";

import { IHelperText } from "workbench/configElements/types";

import Grid from "@material-ui/core/Grid";

import StepperHeaderContainer from "workbench/configElements/StepperHeaderContainer";
import ConfigButtonsContainer from "workbench/configElements/ConfigButtonsContainer";

interface IProps {
  title: string;
  stepLabels: string[];
  currentStep: number;
  completedSteps: boolean[];
  stepsHelpText?: IHelperText[];
}

const ConfigBody: SFC<IProps> = ({
  title,
  stepLabels,
  stepsHelpText,
  currentStep,
  completedSteps,
  children
}) => (
  <>
    <StepperHeaderContainer
      title={title}
      stepLabels={stepLabels}
      currentStep={currentStep}
      completedSteps={completedSteps}
      stepsHelpText={stepsHelpText}
    />
    <Grid item xs={12}>
      {children}
    </Grid>
    <ConfigButtonsContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
      totalNumberSteps={stepLabels.length}
    />
  </>
);

export default ConfigBody;
