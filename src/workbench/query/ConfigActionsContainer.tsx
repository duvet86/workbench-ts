import React, { Component } from "react";
import PropTypes from "prop-types";
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
  public static propTypes = {
    currentStep: PropTypes.number.isRequired,
    completedSteps: PropTypes.array.isRequired,
    dispatchCloseQueryConfig: PropTypes.func.isRequired,
    dispatchGoToStep: PropTypes.func.isRequired
  };

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
