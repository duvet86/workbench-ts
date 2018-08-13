import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ElementType } from "sideBar/operators/operatorsData";
import { isDrawerOpen } from "workbench/configSwitch/selectors";

import ConfigSwitch from "workbench/configSwitch/ConfigSwitch";

interface IStateProps {
  elementType: ElementType;
  isDrawerOpen: boolean;
}

class ConfigSwitchContainer extends Component<IStateProps> {
  public static propTypes = {
    elementType: PropTypes.string.isRequired,
    isDrawerOpen: PropTypes.bool.isRequired
  };

  public render() {
    return <ConfigSwitch {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  elementType: state.configSwitchReducer.elementType,
  isDrawerOpen: isDrawerOpen(state)
});

export default connect(mapStateToProps)(ConfigSwitchContainer);
