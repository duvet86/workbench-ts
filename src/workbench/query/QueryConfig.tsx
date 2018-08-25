import React, { SFC } from "react";

import { IQuery } from "workbench/types";

import Grid from "@material-ui/core/Grid";

import { BackgroundLoadingContainer } from "common/loading";
import HelperText from "workbench/query/HelperText";
import StepperHeaderContainer from "workbench/query/StepperHeaderContainer";
import SourceSelectorContainer from "workbench/query/sourceSelector/SourceSelectorContainer";
import ColumnsSelectorContainer from "workbench/query/columnSelector/ColumnsSelectorContainer";
import ConstraintSelectorContainer from "workbench/query/constraintSelector/ConstraintSelectorContainer";
import ConfigActionsContainer from "workbench/query/ConfigActionsContainer";

function getStepContent(currentStep: number, selectedQuery: IQuery) {
  if (selectedQuery.TargetDataViewId == null) {
    throw new Error("TargetDataViewId cannot be null.");
  }

  switch (currentStep) {
    case 0:
      return (
        <SourceSelectorContainer
          elementId={selectedQuery.ElementId}
          targetDataViewId={selectedQuery.TargetDataViewId}
        />
      );

    case 1:
      return <ColumnsSelectorContainer elementId={selectedQuery.ElementId} />;

    case 2:
      return (
        <ConstraintSelectorContainer elementId={selectedQuery.ElementId} />
      );

    default:
      return "Unknown step";
  }
}

interface IProps {
  isLoading: boolean;
  selectedQuery: IQuery;
  currentStep: number;
  completedSteps: boolean[];
}

const QueryConfig: SFC<IProps> = ({
  isLoading,
  selectedQuery,
  currentStep,
  completedSteps
}) => (
  <BackgroundLoadingContainer isLoading={isLoading}>
    <StepperHeaderContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
    <HelperText currentStep={currentStep} />
    <Grid item xs={12}>
      {getStepContent(currentStep, selectedQuery)}
    </Grid>
    <ConfigActionsContainer
      currentStep={currentStep}
      completedSteps={completedSteps}
    />
  </BackgroundLoadingContainer>
);

export default QueryConfig;
