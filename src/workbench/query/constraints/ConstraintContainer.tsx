import React, { FC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "rootReducer";

import {
  removeQueryConstraint,
  QueryConstraintAction
} from "workbench/query/constraints/actions";

import {
  getAvailableFilterDic,
  getAvailableColumnsDic
} from "workbench/query/selectors";
import { IConstraint } from "workbench/types";

import Constraint from "workbench/query/constraints/Constraint";

interface IOwnProps {
  elementId: number;
  constraint: IConstraint;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

const ConstraintContainer: FC<Props> = ({
  elementId,
  constraint,
  constraint: { FilterType, FilterName, ColumnName },
  availableFiltersDic,
  availableColumnsDic,
  dispatchRemoveQueryConstraint
}) => {
  const handledRemoveQueryConstraint = (constraintId: number) => () => {
    dispatchRemoveQueryConstraint(elementId, constraintId);
  };

  let label;
  if (FilterType != null && FilterName != null) {
    label = availableFiltersDic[FilterName].Label;
  } else {
    label = availableColumnsDic[ColumnName].Label;
  }

  return (
    <Constraint
      elementId={elementId}
      label={label}
      constraint={constraint}
      availableFilter={
        (FilterName && availableFiltersDic[FilterName]) || undefined
      }
      handledRemoveQueryConstraint={handledRemoveQueryConstraint}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  availableFiltersDic: getAvailableFilterDic(state),
  availableColumnsDic: getAvailableColumnsDic(state)
});

const mapDispatchToProps = (dispatch: Dispatch<QueryConstraintAction>) => ({
  dispatchRemoveQueryConstraint: (elementId: number, constraintId: number) =>
    dispatch(removeQueryConstraint(elementId, constraintId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConstraintContainer);
