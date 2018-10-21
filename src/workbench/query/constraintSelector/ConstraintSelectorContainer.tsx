import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";

import {
  getQueryConstraints,
  getAvailableConstraintsObj
} from "workbench/query/selectors";
import { getConstraintVectorValue } from "workbench/utils";
import {
  addQueryConstraint,
  updateQueryConstraintType,
  updateQueryConstraintValues,
  removeQueryConstraint,
  QueryConstraintAction
} from "workbench/actions";
import {
  filterCapabilitiesRequest,
  FilterCapabilitiesAction
} from "workbench/query/actions";
import { IConstraint } from "workbench/types";

import ConstraintSelector from "workbench/query/constraintSelector/ConstraintSelector";
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
      queryConstraints,
      filterCapabilities,
      availableConstraintsObj
    } = this.props;

    return (
      <ConstraintSelector
        queryConstraints={queryConstraints}
        filterCapabilities={filterCapabilities}
        availableConstraintsObj={availableConstraintsObj}
        handledAddQueryConstraint={this.handledAddQueryConstraint}
        handledUpdateQueryConstraintType={this.handledUpdateQueryConstraintType}
        handledUpdateQueryConstraintValues={
          this.handledUpdateQueryConstraintValues
        }
        handledRemoveQueryConstraint={this.handledRemoveQueryConstraint}
      />
    );
  }

  private handledAddQueryConstraint = (selectedOption?: IOption<string>) => {
    const {
      elementId,
      queryConstraints,
      dispatchAddQueryConstraint,
      filterCapabilities,
      availableConstraintsObj: { columnsDic, filtersDic }
    } = this.props;
    if (selectedOption == null) {
      throw new Error("SelectedOption should never be null.");
    }

    const constraintColumn = columnsDic[selectedOption.value];
    const constraintFilter = filtersDic[selectedOption.value];

    const dataType =
      (constraintColumn && constraintColumn.DataType) ||
      (constraintFilter && constraintFilter.DataType);

    const columnName =
      (constraintColumn && constraintColumn.ColumnName) ||
      (constraintFilter && constraintFilter.ToColumnName);

    // For a new constraint default the filterType to the first value
    // of the filter capabilities for the selected dataType.
    const constraint: IConstraint = {
      ConstraintId: queryConstraints.length,
      ConstraintName: constraintColumn && constraintColumn.ColumnName,
      FilterName: constraintFilter && constraintFilter.FilterName,
      DataType: dataType,
      ColumnName: columnName,
      FilterType: filterCapabilities[dataType][0].Type
    };

    dispatchAddQueryConstraint(elementId, constraint);
  };

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

  private handledUpdateQueryConstraintValues = (
    constraintId: number,
    dataType: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { elementId, dispatchUpdateQueryConstraintValues } = this.props;
    const valuesObj = getConstraintVectorValue(dataType, event.target.value);
    dispatchUpdateQueryConstraintValues(
      elementId,
      constraintId,
      valuesObj.vectorValues
    );
  };

  private handledRemoveQueryConstraint = (constraintId: number) => () => {
    const { elementId, dispatchRemoveQueryConstraint } = this.props;

    dispatchRemoveQueryConstraint(elementId, constraintId);
  };
}

const mapStateToProps = (state: RootState) => ({
  queryConstraints: getQueryConstraints(state),
  filterCapabilities: state.queryConfigReducer.filterCapabilities,
  availableConstraintsObj: getAvailableConstraintsObj(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<FilterCapabilitiesAction | QueryConstraintAction>
) => ({
  dispatchFilterCapabilitiesRequest: () =>
    dispatch(filterCapabilitiesRequest()),
  dispatchAddQueryConstraint: (elementId: number, constraint: IConstraint) =>
    dispatch(addQueryConstraint(elementId, constraint)),
  dispatchUpdateQueryConstraintType: (
    elementId: number,
    constraintId: number,
    constraintType: string
  ) =>
    dispatch(
      updateQueryConstraintType(elementId, constraintId, constraintType)
    ),
  dispatchUpdateQueryConstraintValues: (
    elementId: number,
    constraintId: number,
    constraintValues: any[]
  ) =>
    dispatch(
      updateQueryConstraintValues(elementId, constraintId, constraintValues)
    ),
  dispatchRemoveQueryConstraint: (elementId: number, constraintId: number) =>
    dispatch(removeQueryConstraint(elementId, constraintId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConstraintSelectorContainer);
