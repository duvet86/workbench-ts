import React, { Component } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";
import { isDrawerOpen } from "workbench/configOperators/selectors";

import ConfigSwitch from "workbench/configOperators/ConfigSwitch";

class ConfigSwitchContainer extends Component<
  ReturnType<typeof mapStateToProps>
> {
  public render() {
    return <ConfigSwitch {...this.props} />;
  }
}

const mapStateToProps = (state: RootState) => ({
  elementType: state.configSwitch.elementType,
  isDrawerOpen: isDrawerOpen(state)
});

export default connect(mapStateToProps)(ConfigSwitchContainer);
