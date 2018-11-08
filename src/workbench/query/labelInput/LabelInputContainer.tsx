import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { QueryAction } from "workbench/actions";
import { DataServicesAction } from "workbench/query/actions";
import { getDataServices } from "workbench/query/selectors";

import LabelInput from "workbench/query/labelInput/LabelInput";

interface IOwnProps {
  elementId: number;
  initLabel: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

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

  private handleChangeLabel = () => {
    // tslint:disable-next-line:no-console
    console.log("asd");
  };
}

const mapStateToProps = (state: RootState) => ({
  dataServices: getDataServices(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<DataServicesAction | QueryAction>
) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelInputContainer);
