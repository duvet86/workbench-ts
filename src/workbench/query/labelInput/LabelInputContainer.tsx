import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IUpdateQueryLabel, updateQueryLabel } from "workbench/actions";

import LabelInput from "workbench/query/labelInput/LabelInput";

interface IOwnProps {
  elementId: number;
  initLabel: string;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

class LabelInputContainer extends Component<Props> {
  public render() {
    const { initLabel } = this.props;

    return (
      <LabelInput
        initLabel={initLabel}
        handleChangeLabel={this.handleChangeLabel}
      />
    );
  }

  private handleChangeLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { elementId, dispatcLabelUpdate } = this.props;

    dispatcLabelUpdate(elementId, event.target.value);
  };
}

const mapDispatchToProps = (dispatch: Dispatch<IUpdateQueryLabel>) => ({
  dispatcLabelUpdate: (elementId: number, label: string) => {
    dispatch(updateQueryLabel(elementId, label));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(LabelInputContainer);
