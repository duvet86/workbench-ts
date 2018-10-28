import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "rootReducer";

import {
  removeQueryConstraint,
  QueryConstraintAction
} from "workbench/actions";

import {
  getAvailableFilterDic,
  getAvailableColumnsDic
} from "workbench/query/selectors";
import { IConstraint } from "workbench/types";

import Constraint from "workbench/query/constraintSelector/Constraint";

interface IOwnProps {
  elementId: number;
  constraint: IConstraint;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class ConstraintContainer extends Component<Props> {
  public render() {
    const {
      elementId,
      availableFiltersDic,
      availableColumnsDic,
      constraint: { FilterType, FilterName, ColumnName }
    } = this.props;

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
        constraint={this.props.constraint}
        handledRemoveQueryConstraint={this.handledRemoveQueryConstraint}
      />
    );
  }

  private handledRemoveQueryConstraint = (constraintId: number) => () => {
    const { elementId, dispatchRemoveQueryConstraint } = this.props;

    dispatchRemoveQueryConstraint(elementId, constraintId);
  };
}

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
