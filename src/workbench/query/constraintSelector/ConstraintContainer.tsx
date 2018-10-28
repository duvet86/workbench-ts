import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "rootReducer";

import {
  updateQueryConstraintType,
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
      availableFiltersDic,
      availableColumnsDic,
      filterCapabilities,
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
        constraint={this.props.constraint}
        label={label}
        filterCapabilities={filterCapabilities}
        handledUpdateQueryConstraintType={this.handledUpdateQueryConstraintType}
        handledRemoveQueryConstraint={this.handledRemoveQueryConstraint}
      />
    );
  }

  private handledUpdateQueryConstraintType = (constraintId: number) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { elementId, dispatchUpdateQueryConstraintType } = this.props;

    dispatchUpdateQueryConstraintType(
      elementId,
      constraintId,
      event.target.value
    );
  };

  private handledRemoveQueryConstraint = (constraintId: number) => () => {
    const { elementId, dispatchRemoveQueryConstraint } = this.props;

    dispatchRemoveQueryConstraint(elementId, constraintId);
  };
}

const mapStateToProps = (state: RootState) => ({
  filterCapabilities: state.queryConfigReducer.filterCapabilities,
  availableFiltersDic: getAvailableFilterDic(state),
  availableColumnsDic: getAvailableColumnsDic(state)
});

const mapDispatchToProps = (dispatch: Dispatch<QueryConstraintAction>) => ({
  dispatchUpdateQueryConstraintType: (
    elementId: number,
    constraintId: number,
    constraintType: string
  ) =>
    dispatch(
      updateQueryConstraintType(elementId, constraintId, constraintType)
    ),
  dispatchRemoveQueryConstraint: (elementId: number, constraintId: number) =>
    dispatch(removeQueryConstraint(elementId, constraintId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConstraintContainer);
