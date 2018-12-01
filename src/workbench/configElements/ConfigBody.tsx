import React, { ReactNode } from "react";

import { IConfigSteps } from "workbench/configElements/types";

import Grid from "@material-ui/core/Grid";

import StepperHeaderContainer from "workbench/configElements/StepperHeaderContainer";
import ConfigButtonsContainer from "workbench/configElements/ConfigButtonsContainer";

interface IProps<T> {
  title: string;
  steps: Array<IConfigSteps<T>>;
  currentStep: number;
  completedSteps: boolean[];
}

const ConfigBody = <T extends {}>({
  title,
  steps,
  currentStep,
  completedSteps,
  children
}: IProps<T> & { children?: ReactNode }) => (
  <>
    <StepperHeaderContainer
      title={title}
      steps={steps}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
    <Grid item xs={12}>
      {children}
    </Grid>
    <ConfigButtonsContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
      totalNumberSteps={steps.length}
    />
  </>
);

export default ConfigBody;
