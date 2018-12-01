import React, { SFC } from "react";

import { IQuery } from "workbench/types";

import ConfigBody from "workbench/configElements/ConfigBody";

import {
  stepRenderComponents,
  stepLabels,
  helperText
} from "workbench/query/config/steps";

interface IProps {
  currentStep: number;
  completedSteps: boolean[];
  query: IQuery;
}

const QueryConfig: SFC<IProps> = ({ currentStep, completedSteps, query }) => (
  <ConfigBody
    title="Configure Query"
    stepLabels={stepLabels}
    currentStep={currentStep}
    completedSteps={completedSteps}
    stepsHelpText={helperText}
  >
    {stepRenderComponents[currentStep](query)}
  </ConfigBody>
);

export default QueryConfig;
