import React, { Component } from "react";
import { QesDataType, QesFilterType } from "workbench/query/types";

interface IProps {
  elementId: number;
  constraintId: number;
  filterType: string;
  dataType: string;
}

class ConstraintValueContainer extends Component<IProps> {
  public render() {
    const { filterType, dataType } = this.props;

    if (dataType === QesDataType.Interval) {
      return <div>TODO: Interval</div>;
    }

    switch (filterType) {
      case QesFilterType.BetweenExclusive:
      case QesFilterType.BetweenInclusive:
        return <div>TODO: Between</div>;
      default:
        return <div>TODO</div>;
    }
  }
}

export default ConstraintValueContainer;
