import React, { SFC } from "react";

import { IQuery } from "workbench/types";
import Grid from "@material-ui/core/Grid";

import HelperText from "workbench/query/config/HelperText";
import StepperHeaderContainer from "workbench/query/config/StepperHeaderContainer";
import ConfigButtonsContainer from "workbench/query/config/ConfigButtonsContainer";

import { stepRenderComponents } from "workbench/query/config/steps";

interface IProps {
  currentStep: number;
  completedSteps: boolean[];
  query: IQuery;
}

const QueryConfig: SFC<IProps> = ({ currentStep, completedSteps, query }) => (
  <>
    <StepperHeaderContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
    <HelperText currentStep={currentStep} />
    <Grid item xs={12}>
      {stepRenderComponents[currentStep](query)}
    </Grid>
    <ConfigButtonsContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
  </>
);

export default QueryConfig;
