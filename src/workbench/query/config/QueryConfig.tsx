import React, { SFC } from "react";

import Grid from "@material-ui/core/Grid";

import HelperText from "workbench/query/config/HelperText";
import StepperHeaderContainer from "workbench/query/config/StepperHeaderContainer";
import ConfigActionsContainer from "workbench/query/config/ConfigActionsContainer";

interface IProps {
  currentStep: number;
  render: () => JSX.Element;
  completedSteps: boolean[];
}

const QueryConfig: SFC<IProps> = ({ currentStep, render, completedSteps }) => (
  <>
    <StepperHeaderContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
    <HelperText currentStep={currentStep} />
    <Grid item xs={12}>
      {render()}
    </Grid>
    <ConfigActionsContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
  </>
);

export default QueryConfig;
