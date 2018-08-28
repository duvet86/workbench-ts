import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { DATA_TYPES } from "workbench/utils";
import {
  addQueryConstraint,
  updateQueryConstraintType,
  // updateQueryConstraintValues,
  removeQueryConstraint,
  QueryConstraintAction
} from "workbench/actions";
import {
  filterCapabilitiesRequest,
  FilterCapabilitiesAction
} from "workbench/query/actions";
import {
  getQueryConstraints
  // getConstraintTargets
} from "workbench/query/selectors";

import ConstraintSelector from "workbench/query/constraintSelector/ConstraintSelector";

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
      filterCapabilities
      // contraintTargets
    } = this.props;

    return (
      <div>ConstraintSelector</div>
      // <ConstraintSelector
      //   queryConstraints={queryConstraints}
      //   filterCapabilities={filterCapabilities}
      //   // contraintTargets={contraintTargets}
      //   // handledAddQueryConstraint={this.handledAddQueryConstraint}
      //   handledUpdateQueryConstraintType={this.handledUpdateQueryConstraintType}
      //   // handledUpdateQueryConstraintValues={
      //   //   this.handledUpdateQueryConstraintValues
      //   // }
      //   handledRemoveQueryConstraint={this.handledRemoveQueryConstraint}
      // />
    );
  }

  // private handledAddQueryConstraint = (
  //   selectedConstraintTarget: IContraintTarget
  // ) => {
  //   const {
  //     elementId,
  //     queryConstraints,
  //     dispatchAddQueryConstraint,
  //     filterCapabilities
  //   } = this.props;
  //   // For a new constraint default the filterType to the first value
  //   // of filter capabilities for the selected dataType.
  //   const constraintTarget = {
  //     ...selectedConstraintTarget,
  //     FilterType: filterCapabilities[selectedConstraintTarget.DataType][0].Type
  //   };

  //   dispatchAddQueryConstraint(
  //     elementId,
  //     queryConstraints.length,
  //     constraintTarget
  //   );
  // };

  private handledUpdateQueryConstraintType = (constraintId: number) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { elementId, dispatchUpdateQueryConstraintType } = this.props;

    dispatchUpdateQueryConstraintType(elementId, constraintId, event.target
      .value as DATA_TYPES);
  };

  // private handledUpdateQueryConstraintValues = (
  //   constraintId: number,
  //   dataType: DATA_TYPES
  // ) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { elementId, dispatchUpdateQueryConstraintValues } = this.props;

  //   const valuesObj = getConstraintVectorValue(dataType, event.target.value);

  //   dispatchUpdateQueryConstraintValues(
  //     elementId,
  //     constraintId,
  //     valuesObj.vectorValues
  //   );
  // };

  private handledRemoveQueryConstraint = (constraintId: number) => () => {
    const { elementId, dispatchRemoveQueryConstraint } = this.props;

    dispatchRemoveQueryConstraint(elementId, constraintId);
  };
}

const mapStateToProps = (state: RootState) => ({
  queryConstraints: getQueryConstraints(state),
  filterCapabilities: state.queryConfigReducer.filterCapabilities
  // contraintTargets: getConstraintTargets(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<FilterCapabilitiesAction | QueryConstraintAction>
) => ({
  dispatchFilterCapabilitiesRequest: () =>
    dispatch(filterCapabilitiesRequest()),
  dispatchAddQueryConstraint: (
    elementId: number,
    constraintId: number,
    constraintTarget: any
  ) => dispatch(addQueryConstraint(elementId, constraintId, constraintTarget)),
  dispatchUpdateQueryConstraintType: (
    elementId: number,
    constraintId: number,
    constraintType: DATA_TYPES
  ) =>
    dispatch(
      updateQueryConstraintType(elementId, constraintId, constraintType)
    ),
  // dispatchUpdateQueryConstraintValues: (
  //   elementId: number,
  //   constraintId: number,
  //   constraintValues: any[]
  // ) =>
  //   dispatch(
  //     updateQueryConstraintValues(elementId, constraintId, constraintValues)
  //   ),
  dispatchRemoveQueryConstraint: (elementId: number, constraintId: number) =>
    dispatch(removeQueryConstraint(elementId, constraintId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConstraintSelectorContainer);
