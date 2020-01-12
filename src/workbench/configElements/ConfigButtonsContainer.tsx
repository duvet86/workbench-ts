import React, { FC } from "react";
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
  totalNumberSteps: number;
}

type Props = IOwnProps & ReturnType<typeof mapDispatchToProps>;

const ConfigButtonsContainer: FC<Props> = ({
  currentStep,
  completedSteps,
  totalNumberSteps,
  dispatchCloseQueryConfig,
  dispatchCompleteQueryConfig,
  dispatchGoToStep
}) => (
  <ConfigButtons
    currentStep={currentStep}
    completedSteps={completedSteps}
    totalNumberSteps={totalNumberSteps}
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

export default connect(undefined, mapDispatchToProps)(ConfigButtonsContainer);
