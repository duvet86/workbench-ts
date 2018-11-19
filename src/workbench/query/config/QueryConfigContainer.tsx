import React, { Component } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";
import { IQuery } from "workbench/types";
import { getQuery, getCompletedSteps } from "workbench/query/selectors";

import SourceSelectorContainer from "workbench/query/source/SourceSelectorContainer";
import LabelInputContainer from "workbench/query/label/LabelInputContainer";
import ColumnsSelectorContainer from "workbench/query/columns/ColumnsSelectorContainer";
import ConstraintSelectorContainer from "workbench/query/constraints/ConstraintSelectorContainer";
import DataPreviewContainer from "workbench/query/dataPreview/DataPreviewContainer";

import LoadingContainer from "common/loading/LoadingContainer";
import QueryConfig from "workbench/query/config/QueryConfig";

function getStepContent(currentStep: number, selectedQuery: IQuery) {
  switch (currentStep) {
    case 0:
      const initTargetDataViewId =
        selectedQuery.TargetDataViewId != null
          ? selectedQuery.TargetDataViewId
          : "";
      return (
        <>
          <SourceSelectorContainer
            elementId={selectedQuery.ElementId}
            initTargetDataViewId={initTargetDataViewId}
          />
          <LabelInputContainer
            elementId={selectedQuery.ElementId}
            initLabel={selectedQuery.Label}
          />
        </>
      );

    case 1:
      return <ColumnsSelectorContainer elementId={selectedQuery.ElementId} />;

    case 2:
      return (
        <ConstraintSelectorContainer elementId={selectedQuery.ElementId} />
      );

    case 3:
      return <DataPreviewContainer columns={selectedQuery.Columns} />;

    default:
      return <div>Unknown step</div>;
  }
}

class QueryConfigContainer extends Component<
  ReturnType<typeof mapStateToProps>
> {
  public render() {
    const {
      isLoading,
      selectedQuery,
      currentStep,
      completedSteps
    } = this.props;
    const currentComponent = () => getStepContent(currentStep, selectedQuery);

    return (
      <LoadingContainer background isLoading={isLoading}>
        <QueryConfig
          render={currentComponent}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </LoadingContainer>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.queryConfig.isLoading,
  selectedQuery: getQuery(state),
  currentStep: state.queryConfig.currentStep,
  completedSteps: getCompletedSteps(state)
});

export default connect(mapStateToProps)(QueryConfigContainer);
