import React, { SFC } from "react";

import { IQuery } from "workbench/types";

import Grid from "@material-ui/core/Grid";

import HelperText from "workbench/query/HelperText";
import StepperHeaderContainer from "workbench/query/config/StepperHeaderContainer";
import SourceSelectorContainer from "workbench/query/sourceSelector/SourceSelectorContainer";
import ColumnsSelectorContainer from "workbench/query/columnSelector/ColumnsSelectorContainer";
import ConstraintSelectorContainer from "workbench/query/constraintSelector/ConstraintSelectorContainer";
import ConfigActionsContainer from "workbench/query/config/ConfigActionsContainer";

function getStepContent(currentStep: number, selectedQuery: IQuery) {
  switch (currentStep) {
    case 0:
      return (
        <SourceSelectorContainer
          elementId={selectedQuery.ElementId}
          targetDataViewId={
            selectedQuery.TargetDataViewId != null
              ? selectedQuery.TargetDataViewId
              : ""
          }
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
  selectedQuery: IQuery;
  currentStep: number;
  completedSteps: boolean[];
}

const QueryConfig: SFC<IProps> = ({
  selectedQuery,
  currentStep,
  completedSteps
}) => (
  <>
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
  </>
);

export default QueryConfig;
