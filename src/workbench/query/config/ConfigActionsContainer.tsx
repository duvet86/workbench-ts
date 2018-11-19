import React, { SFC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  closeQueryConfig,
  goToStep,
  QueryConfigAction,
  IGoToStep
} from "workbench/query/config/actions";

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
  dispatchGoToStep
}) => (
  <ConfigActions
    currentStep={currentStep}
    completedSteps={completedSteps}
    dispatchCloseConfig={dispatchCloseQueryConfig}
    dispatchGoToStep={dispatchGoToStep}
  />
);

const mapDispatchToProps = (
  dispatch: Dispatch<QueryConfigAction | IGoToStep>
) => ({
  dispatchGoToStep: (step: number) => dispatch(goToStep(step)),
  dispatchCloseQueryConfig: () => dispatch(closeQueryConfig())
});

export default connect(
  null,
  mapDispatchToProps
)(ConfigActionsContainer);
