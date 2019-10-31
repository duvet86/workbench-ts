import React, { FC } from "react";

import { IQuery } from "workbench/types";

import ConfigBody from "workbench/configElements/ConfigBody";
import { steps } from "workbench/query/config/steps";

interface IProps {
  currentStep: number;
  completedSteps: boolean[];
  query: IQuery;
}

const QueryConfig: FC<IProps> = ({ currentStep, completedSteps, query }) => (
  <ConfigBody
    title="Configure Query"
    steps={steps}
    currentStep={currentStep}
    completedSteps={completedSteps}
  >
    {steps[currentStep].renderComponent(query)}
  </ConfigBody>
);

export default QueryConfig;
