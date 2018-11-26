import React, { SFC } from "react";

import { IQuery } from "workbench/types";
import Grid from "@material-ui/core/Grid";

import StepperHeaderContainer from "workbench/configElements/StepperHeaderContainer";
import ConfigButtonsContainer from "workbench/configElements/ConfigButtonsContainer";

import {
  stepRenderComponents,
  totalNumberSteps,
  stepLabels,
  helperText
} from "workbench/query/config/steps";

interface IProps {
  currentStep: number;
  completedSteps: boolean[];
  query: IQuery;
}

const QueryConfig: SFC<IProps> = ({ currentStep, completedSteps, query }) => (
  <>
    <StepperHeaderContainer
      title="Configure Query"
      stepLabels={stepLabels}
      currentStep={currentStep}
      completedSteps={completedSteps}
      stepsHelpText={helperText}
    />
    <Grid item xs={12}>
      {stepRenderComponents[currentStep](query)}
    </Grid>
    <ConfigButtonsContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
      totalNumberSteps={totalNumberSteps}
    />
  </>
);

export default QueryConfig;
