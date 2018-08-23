import React, { Component } from "react";
import { connect } from "react-redux";

import { ElementType } from "sideBar/operators/types";
import { isDrawerOpen } from "workbench/configSwitch/selectors";

import ConfigSwitch from "workbench/configSwitch/ConfigSwitch";

interface IStateProps {
  elementType: ElementType;
  isDrawerOpen: boolean;
}

interface IStoreState {
  configSwitchReducer: {
    elementType: ElementType;
  };
}

class ConfigSwitchContainer extends Component<IStateProps> {
  public render() {
    return <ConfigSwitch {...this.props} />;
  }
}

const mapStateToProps = (state: IStoreState) => ({
  elementType: state.configSwitchReducer.elementType,
  isDrawerOpen: isDrawerOpen(state)
});

export default connect(mapStateToProps)(ConfigSwitchContainer);
