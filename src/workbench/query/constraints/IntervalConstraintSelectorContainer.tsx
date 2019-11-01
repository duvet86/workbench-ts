import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IIntervalDtc } from "common/interval/types";
import {
  updateQueryConstraintValues,
  IUpdateQueryConstraintValues
} from "workbench/query/constraints/actions";

import IntervalSelectorContainer from "common/interval/IntervalSelectorContainer";

interface IOwnProps {
  elementId: number;
  constraintId: number;
  displayValue: IIntervalDtc | undefined;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

interface IState {
  displayValue: IIntervalDtc | undefined;
}

const TextInputContainer: FC<Props> = ({
  displayValue,
  elementId,
  constraintId,
  dispatchUpdateQueryConstraintValues
}) => {
  const applyConstraintValue = (interval: IIntervalDtc) => {
    const vectorValues = [
      [interval.IntervalType, interval.IntervalString, interval.Label]
    ];
    dispatchUpdateQueryConstraintValues(elementId, constraintId, vectorValues);
  };

  return <IntervalSelectorContainer onChange={applyConstraintValue} />;
};

const mapDispatchToProps = (
  dispatch: Dispatch<IUpdateQueryConstraintValues>
) => ({
  dispatchUpdateQueryConstraintValues: (
    elementId: number,
    constraintId: number,
    constraintValues: any[][]
  ) =>
    dispatch(
      updateQueryConstraintValues(elementId, constraintId, constraintValues)
    )
});

export default connect(
  undefined,
  mapDispatchToProps
)(TextInputContainer);
