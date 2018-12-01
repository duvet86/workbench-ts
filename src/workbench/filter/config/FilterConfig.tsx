import React, { SFC } from "react";

import ConfigBody from "workbench/configElements/ConfigBody";

import { stepLabels } from "workbench/filter/config/steps";

interface IProps {
  currentStep: number;
  completedSteps: boolean[];
}

const QueryConfig: SFC<IProps> = ({ currentStep, completedSteps }) => (
  <ConfigBody
    title="Configure Filter"
    stepLabels={stepLabels}
    currentStep={currentStep}
    completedSteps={completedSteps}
  >
    Filter
  </ConfigBody>
);

export default QueryConfig;
