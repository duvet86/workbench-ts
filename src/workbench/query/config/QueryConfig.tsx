import React, { SFC } from "react";

import Grid from "@material-ui/core/Grid";

import HelperText from "workbench/query/config/HelperText";
import StepperHeaderContainer from "workbench/query/config/StepperHeaderContainer";
import ConfigActionsContainer from "workbench/query/config/ConfigActionsContainer";

interface IProps {
  currentStep: number;
  completedSteps: boolean[];
}

const QueryConfig: SFC<IProps> = ({
  currentStep,
  completedSteps,
  children
}) => (
  <>
    <StepperHeaderContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
    <HelperText currentStep={currentStep} />
    <Grid item xs={12}>
      {children}
    </Grid>
    <ConfigActionsContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
  </>
);

export default QueryConfig;
