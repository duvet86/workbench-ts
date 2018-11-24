import React, { SFC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  closeConfig,
  goToStep,
  ICloseConfig,
  IGoToStep
} from "workbench/configElements/actions";

import ConfigButtons from "workbench/configElements/ConfigButtons";

interface IOwnProps {
  currentStep: number;
  completedSteps: boolean[];
}

type Props = IOwnProps & ReturnType<typeof mapDispatchToProps>;

const ConfigButtonsContainer: SFC<Props> = ({
  currentStep,
  completedSteps,
  dispatchCloseQueryConfig,
  dispatchCompleteQueryConfig,
  dispatchGoToStep
}) => (
  <ConfigButtons
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
)(ConfigButtonsContainer);
