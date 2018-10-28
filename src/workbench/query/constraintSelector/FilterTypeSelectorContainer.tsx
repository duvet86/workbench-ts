import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "rootReducer";

import { QesDataType, QesFilterType } from "workbench/query/types";
import {
  updateQueryConstraintType,
  QueryConstraintAction
} from "workbench/actions";

import FilterTypeSelector from "workbench/query/constraintSelector/FilterTypeSelector";

interface IOwnProps {
  elementId: number;
  constraintId: number;
  filterType: string;
  dataType: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class FilterTypeSelectorContainer extends Component<Props> {
  public render() {
    if (this.props.dataType === QesDataType.Interval) {
      return null;
    }

    const {
      filterCapabilities,
      constraintId,
      filterType,
      dataType
    } = this.props;

    const isFullWidth =
      filterType === QesFilterType.IsNull ||
      filterType === QesFilterType.IsNotNull;

    return (
      <FilterTypeSelector
        filterCapabilities={filterCapabilities}
        constraintId={constraintId}
        filterType={filterType}
        dataType={dataType}
        isFullWidth={isFullWidth}
        handledUpdateQueryConstraintType={this.handledUpdateQueryConstraintType}
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
}

const mapStateToProps = (state: RootState) => ({
  filterCapabilities: state.queryConfigReducer.filterCapabilities
});

const mapDispatchToProps = (dispatch: Dispatch<QueryConstraintAction>) => ({
  dispatchUpdateQueryConstraintType: (
    elementId: number,
    constraintId: number,
    constraintType: string
  ) =>
    dispatch(updateQueryConstraintType(elementId, constraintId, constraintType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterTypeSelectorContainer);
