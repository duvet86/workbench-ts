import React, { FC } from "react";

import ConfigBody from "workbench/configElements/ConfigBody";

import { steps } from "workbench/filter/config/steps";

interface IProps {
  currentStep: number;
  completedSteps: boolean[];
}

const QueryConfig: FC<IProps> = ({ currentStep, completedSteps }) => (
  <ConfigBody
    title="Configure Filter"
    steps={steps}
    currentStep={currentStep}
    completedSteps={completedSteps}
  >
    {steps[currentStep].renderComponent(1)}
  </ConfigBody>
);

export default QueryConfig;
