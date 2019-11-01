import React, { FC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "rootReducer";

import { QesDataType, QesFilterType } from "workbench/types";
import {
  updateQueryConstraintType,
  QueryConstraintAction
} from "workbench/query/constraints/actions";

import FilterTypeSelector from "workbench/query/constraints/FilterTypeSelector";

interface IOwnProps {
  elementId: number;
  constraintId: number;
  filterType: string;
  dataType: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

const FilterTypeSelectorContainer: FC<Props> = ({
  elementId,
  dataType,
  filterCapabilities,
  constraintId,
  filterType,
  dispatchUpdateQueryConstraintType
}) => {
  if (dataType === QesDataType.Interval) {
    return null;
  }

  const handledUpdateQueryConstraintType = (constraintId: number) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatchUpdateQueryConstraintType(elementId, constraintId, event.target
      .value as QesFilterType);
  };

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
      handledUpdateQueryConstraintType={handledUpdateQueryConstraintType}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  filterCapabilities: state.queryConfig.filterCapabilities
});

const mapDispatchToProps = (dispatch: Dispatch<QueryConstraintAction>) => ({
  dispatchUpdateQueryConstraintType: (
    elementId: number,
    constraintId: number,
    constraintType: QesFilterType
  ) =>
    dispatch(updateQueryConstraintType(elementId, constraintId, constraintType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterTypeSelectorContainer);
