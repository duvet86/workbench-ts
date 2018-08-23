import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  closeQueryConfig,
  goToStep,
  QueryConfigAction,
  IGoToStep
} from "workbench/query/actions";

import ConfigActions from "workbench/query/ConfigActions";

interface IDispatchProps {
  dispatchGoToStep: (step: number) => void;
  dispatchCloseQueryConfig: () => void;
}

interface IProps {
  currentStep: number;
  completedSteps: boolean[];
}

type Props = IProps & IDispatchProps;

class ConfigActionsContainer extends Component<Props> {
  public render() {
    const {
      currentStep,
      completedSteps,
      dispatchCloseQueryConfig,
      dispatchGoToStep
    } = this.props;

    return (
      <ConfigActions
        currentStep={currentStep}
        completedSteps={completedSteps}
        dispatchCloseConfig={dispatchCloseQueryConfig}
        dispatchGoToStep={dispatchGoToStep}
      />
    );
  }
}

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
