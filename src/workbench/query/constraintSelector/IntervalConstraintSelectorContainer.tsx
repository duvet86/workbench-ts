import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IIntervalDtc } from "common/intervalSelector/types";
import {
  updateQueryConstraintValues,
  IUpdateQueryConstraintValues
} from "workbench/actions";

import IntervalSelectorContainer from "common/intervalSelector/IntervalSelectorContainer";

interface IOwnProps {
  elementId: number;
  constraintId: number;
  initDisplayValue: IIntervalDtc | undefined;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

interface IState {
  displayValue: IIntervalDtc | undefined;
}

class TextInputContainer extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      displayValue: this.props.initDisplayValue
    };
  }

  public render() {
    return <IntervalSelectorContainer onChange={this.applyConstraintValue} />;
  }

  private applyConstraintValue = (interval: IIntervalDtc) => {
    const {
      elementId,
      constraintId,
      dispatchUpdateQueryConstraintValues
    } = this.props;

    const vectorValues = [
      [interval.IntervalType, interval.IntervalString, interval.Label]
    ];
    dispatchUpdateQueryConstraintValues(elementId, constraintId, vectorValues);
  };
}

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
