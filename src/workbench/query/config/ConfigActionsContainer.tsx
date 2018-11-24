import React, { SFC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  closeConfig,
  goToStep,
  ICloseConfig,
  IGoToStep
} from "workbench/configElements/actions";

import ConfigActions from "workbench/query/config/ConfigActions";

interface IOwnProps {
  currentStep: number;
  completedSteps: boolean[];
}

type Props = IOwnProps & ReturnType<typeof mapDispatchToProps>;

const ConfigActionsContainer: SFC<Props> = ({
  currentStep,
  completedSteps,
  dispatchCloseQueryConfig,
  dispatchCompleteQueryConfig,
  dispatchGoToStep
}) => (
  <ConfigActions
    currentStep={currentStep}
    completedSteps={completedSteps}
    dispatchCloseConfig={dispatchCloseQueryConfig}
    dispatchCompleteQueryConfig={dispatchCompleteQueryConfig}
    dispatchGoToStep={dispatchGoToStep}
  />
);

const mapDispatchToProps = (dispatch: Dispatch<ICloseConfig | IGoToStep>) => ({
  dispatchGoToStep: (step: number) => dispatch(goToStep(step)),
  dispatchCloseQueryConfig: () => dispatch(closeConfig()),
  dispatchCompleteQueryConfig: () => dispatch(closeConfig())
});

export default connect(
  undefined,
  mapDispatchToProps
)(ConfigActionsContainer);
