import React, { SFC } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";
import { isDrawerOpen } from "workbench/configElements/selectors";

import ConfigSwitch from "workbench/configElements/ConfigSwitch";

type Props = ReturnType<typeof mapStateToProps>;

const ConfigSwitchContainer: SFC<Props> = props => <ConfigSwitch {...props} />;

const mapStateToProps = (state: RootState) => ({
  operatorServiceId: state.configElements.operatorServiceId,
  isDrawerOpen: isDrawerOpen(state)
});

export default connect(mapStateToProps)(ConfigSwitchContainer);
