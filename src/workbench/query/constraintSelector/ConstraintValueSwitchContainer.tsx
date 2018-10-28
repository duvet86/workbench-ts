import React, { Component } from "react";
import { QesDataType, QesFilterType } from "workbench/query/types";

import ConstraintInputValueContainer from "workbench/query/constraintSelector/ConstraintInputValueContainer";

interface IProps {
  elementId: number;
  constraintId: number;
  dataType: string;
  filterType?: string;
  values?: any[][];
}

class ConstraintValueSwitchContainer extends Component<IProps> {
  public render() {
    const {
      elementId,
      constraintId,
      filterType,
      dataType,
      values
    } = this.props;

    if (dataType === QesDataType.Interval) {
      return <div>TODO: Interval</div>;
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
        return <div>TODO: List</div>;
      default:
        const displayValue =
          values && values.length > 0 ? (values[0][0] as string) : "";
        return (
          <ConstraintInputValueContainer
            elementId={elementId}
            constraintId={constraintId}
            inputType={inputType}
            initDisplayValue={displayValue}
          />
        );
    }
  }
}

export default ConstraintValueSwitchContainer;
