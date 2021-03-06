import React, { FC } from "react";

import { QesDataType, QesFilterType } from "workbench/types";
import { IUdsFilterDescriptionDtc } from "workbench/query/types";
import { IIntervalDtc } from "common/interval/types";

import IntervalConstraintSelectorContainer from "workbench/query/constraints/IntervalConstraintSelectorContainer";
import TextInputContainer from "workbench/query/constraints/TextInputContainer";
import AllowedValuesContainer from "workbench/query/constraints/AllowedValuesContainer";

interface IProps {
  availableFilter?: IUdsFilterDescriptionDtc;
  elementId: number;
  constraintId: number;
  dataType: string;
  filterType?: string;
  values?: any[][];
}

const ValueSwitchContainer: FC<IProps> = ({
  dataType,
  values,
  elementId,
  constraintId,
  filterType,
  availableFilter
}) => {
  if (dataType === QesDataType.Interval) {
    let initInterval: IIntervalDtc | undefined;
    if (values != null) {
      initInterval = {
        IntervalType: values[0][0],
        IntervalString: values[0][1]
      };
    }
    return (
      <IntervalConstraintSelectorContainer
        elementId={elementId}
        constraintId={constraintId}
        displayValue={initInterval}
      />
    );
  }

  const inputType =
    dataType === QesDataType.IntValue || dataType === QesDataType.DoubleValue
      ? "number"
      : "text";

  switch (filterType) {
    case QesFilterType.IsNull:
    case QesFilterType.IsNotNull:
      return null;
    case QesFilterType.BetweenExclusive:
    case QesFilterType.BetweenInclusive:
      return <div>TODO: Between</div>;
    case QesFilterType.InList:
    case QesFilterType.NotInList: {
      if (availableFilter == null) {
        throw new Error("availableFilter cannot be null.");
      }
      const listDisplayValue =
        values && values.length > 0
          ? ([] as string[]).concat(...values) // Flatten the list.
          : undefined;

      return (
        <AllowedValuesContainer
          availableFilter={availableFilter}
          elementId={elementId}
          constraintId={constraintId}
          displayValue={listDisplayValue}
        />
      );
    }
    default: {
      const inputDisplayValue =
        values && values.length > 0 ? (values[0][0] as string) : "";
      return (
        <TextInputContainer
          elementId={elementId}
          constraintId={constraintId}
          inputType={inputType}
          displayValue={inputDisplayValue}
        />
      );
    }
  }
};

export default ValueSwitchContainer;
