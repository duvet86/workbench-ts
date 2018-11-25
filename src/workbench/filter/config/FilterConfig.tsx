import React, { SFC } from "react";

import Grid from "@material-ui/core/Grid";

import StepperHeaderContainer from "workbench/configElements/StepperHeaderContainer";
import ConfigButtonsContainer from "workbench/configElements/ConfigButtonsContainer";

import { totalNumberSteps, stepLabels } from "workbench/filter/config/steps";

interface IProps {
  currentStep: number;
  completedSteps: boolean[];
}

const QueryConfig: SFC<IProps> = ({ currentStep, completedSteps }) => (
  <>
    <StepperHeaderContainer
      title="Configure Filter"
      stepLabels={stepLabels}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
    <Grid item xs={12}>
      Filter
    </Grid>
    <ConfigButtonsContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
      totalNumberSteps={totalNumberSteps}
    />
  </>
);

export default QueryConfig;
