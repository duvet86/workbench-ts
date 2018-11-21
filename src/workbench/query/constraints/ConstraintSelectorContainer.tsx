import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "rootReducer";

import {
  getQueryConstraints,
  getAvailableConstraint,
  getAvailableFilterDic,
  getAvailableColumnsDic
} from "workbench/query/selectors";
import {
  addQueryConstraint,
  QueryConstraintAction,
  filterCapabilitiesRequest,
  FilterCapabilitiesAction
} from "workbench/query/constraints/actions";
import { IConstraint, QesFilterType } from "workbench/types";

import ConstraintSelector from "workbench/query/constraints/ConstraintSelector";
import { IOption } from "common/select/SelectInputContainer";

interface IOwnProps {
  elementId: number;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class ConstraintSelectorContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchFilterCapabilitiesRequest();
  }

  public render() {
    const {
      elementId,
      queryConstraints,
      filterCapabilities,
      availableConstraints
    } = this.props;

    return (
      <ConstraintSelector
        elementId={elementId}
        queryConstraints={queryConstraints}
        filterCapabilities={filterCapabilities}
        availableConstraints={availableConstraints}
        handledAddQueryConstraint={this.handledAddQueryConstraint}
      />
    );
  }

  private handledAddQueryConstraint = (selectedOption?: IOption<string>) => {
    const {
      elementId,
      queryConstraints,
      dispatchAddQueryConstraint,
      filterCapabilities,
      availableFiltersDic,
      availableColumnsDic
    } = this.props;
    if (selectedOption == null) {
      return;
    }

    // A constraint can be either a filter or a column.
    const constraintColumn = availableColumnsDic[selectedOption.value];
    const constraintFilter = availableFiltersDic[selectedOption.value];

    const dataType =
      (constraintColumn && constraintColumn.DataType) ||
      (constraintFilter && constraintFilter.DataType);

    const columnName =
      (constraintColumn && constraintColumn.ColumnName) ||
      (constraintFilter && constraintFilter.ToColumnName);

    // For a new constraint default the filterType to the first value
    // of the filter capabilities unless the filter has allowed values.
    const filterType =
      (constraintFilter &&
        constraintFilter.HasAllowedValues &&
        QesFilterType.InList) ||
      filterCapabilities[dataType][0].Type;

    const constraint: IConstraint = {
      ConstraintIndex: queryConstraints.length,
      ConstraintName: constraintColumn && constraintColumn.ColumnName,
      FilterName: constraintFilter && constraintFilter.FilterName,
      DataType: dataType,
      ColumnName: columnName,
      FilterType: filterType
    };

    dispatchAddQueryConstraint(elementId, constraint);
  };
}

const mapStateToProps = (state: RootState) => ({
  queryConstraints: getQueryConstraints(state),
  filterCapabilities: state.queryConfig.filterCapabilities,
  availableConstraints: getAvailableConstraint(state),
  availableFiltersDic: getAvailableFilterDic(state),
  availableColumnsDic: getAvailableColumnsDic(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<FilterCapabilitiesAction | QueryConstraintAction>
) => ({
  dispatchFilterCapabilitiesRequest: () =>
    dispatch(filterCapabilitiesRequest()),
  dispatchAddQueryConstraint: (elementId: number, constraint: IConstraint) =>
    dispatch(addQueryConstraint(elementId, constraint))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConstraintSelectorContainer);
