import React from "react";

import { IQuery } from "workbench/types";
import { IConfigSteps } from "workbench/configElements/types";

import SourceSelectorContainer from "workbench/query/source/SourceSelectorContainer";
import LabelInputContainer from "workbench/query/label/LabelInputContainer";
import ColumnsSelectorContainer from "workbench/query/columns/ColumnsSelectorContainer";
import ConstraintSelectorContainer from "workbench/query/constraints/ConstraintSelectorContainer";
import DataPreviewContainer from "workbench/query/dataPreview/DataPreviewContainer";
import SummaryContainer from "workbench/query/summary/SummaryContainer";

export const steps: Array<IConfigSteps<IQuery>> = [
  {
    label: "Source*",
    helper: {
      title: "Query source",
      text: `Select from the drop down the source of your query.
        It can be a data source or an existing query.
        Once you are done go to the next step clicking on the next button.`
    },
    renderComponent: function querySource(query: IQuery) {
      const initTargetDataViewId =
        query.TargetDataViewId != null ? query.TargetDataViewId : "";
      return (
        <>
          <SourceSelectorContainer
            elementId={query.ElementId}
            initTargetDataViewId={initTargetDataViewId}
          />
          <LabelInputContainer
            elementId={query.ElementId}
            initLabel={query.Label}
          />
        </>
      );
    }
  },
  {
    label: "Columns*",
    helper: {
      title: "Query columns",
      text: `Each source presents a list of available columns.
          You can search for a particular column using the search input.
          Click on a column on the available list to move it to the selected list.
          To remove a column from the selected list click on it again.`
    },
    renderComponent: function columnsSelector(query: IQuery) {
      return <ColumnsSelectorContainer elementId={query.ElementId} />;
    }
  },
  {
    label: "Constraints",
    helper: {
      title: "(Optional) Query Constraints",
      text: `Narrow down your data with constraints.
        Constraints are part of the query you are creating and are not visible outside of it.`
    },
    renderComponent: function constraintSelector(query: IQuery) {
      return <ConstraintSelectorContainer elementId={query.ElementId} />;
    }
  },
  {
    label: "Summary",
    renderComponent: function summary(query: IQuery) {
      return (
        <>
          <SummaryContainer query={query} />
          <DataPreviewContainer columns={query.Columns} />
        </>
      );
    }
  }
];
