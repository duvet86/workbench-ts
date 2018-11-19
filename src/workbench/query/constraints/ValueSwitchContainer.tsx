import React, { Component } from "react";
import {
  QesDataType,
  QesFilterType,
  IUdsFilterDescriptionDtc
} from "workbench/query/types";
import { IIntervalDtc } from "common/intervalSelector/types";

// tslint:disable-next-line:max-line-length
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

class ValueSwitchContainer extends Component<IProps> {
  public render() {
    const {
      availableFilter,
      elementId,
      constraintId,
      filterType,
      dataType,
      values
    } = this.props;

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
          initDisplayValue={initInterval}
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
      case QesFilterType.NotInList:
        if (availableFilter == null) {
          throw new Error("availableFilter cannot be null.");
        }
        const listDisplayValue =
          values && values.length > 0
            ? ([].concat.apply([], values[0]) as string[]) // Flatten the list.
            : undefined;
        return (
          <AllowedValuesContainer
            availableFilter={availableFilter}
            elementId={elementId}
            constraintId={constraintId}
            initDisplayValue={listDisplayValue}
          />
        );
      default:
        const inputDisplayValue =
          values && values.length > 0 ? (values[0][0] as string) : "";
        return (
          <TextInputContainer
            elementId={elementId}
            constraintId={constraintId}
            inputType={inputType}
            initDisplayValue={inputDisplayValue}
          />
        );
    }
  }
}

export default ValueSwitchContainer;
