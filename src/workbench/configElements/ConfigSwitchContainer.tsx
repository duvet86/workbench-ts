import React, { Component } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";
import { isDrawerOpen } from "workbench/configElements/selectors";

import ConfigSwitch from "workbench/configElements/ConfigSwitch";

class ConfigSwitchContainer extends Component<
  ReturnType<typeof mapStateToProps>
> {
  public render() {
    return <ConfigSwitch {...this.props} />;
  }
}

const mapStateToProps = (state: RootState) => ({
  operatorServiceId: state.configElements.operatorServiceId,
  isDrawerOpen: isDrawerOpen(state)
});

export default connect(mapStateToProps)(ConfigSwitchContainer);
