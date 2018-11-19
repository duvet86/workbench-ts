import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { totalNumberSteps } from "workbench/query/config/steps";

interface IProps extends WithStyles<typeof styles> {
  currentStep: number;
  completedSteps: boolean[];
  dispatchCloseConfig: () => void;
  dispatchGoToStep: (stepIndex: number) => void;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    actionButtons: {
      display: "flex",
      justifyContent: "flex-end",
      position: "fixed",
      bottom: unit * 6,
      right: 0
    },
    button: {
      margin: unit
    }
  });

const ConfigActions: SFC<IProps> = ({
  classes,
  currentStep,
  completedSteps,
  dispatchCloseConfig,
  dispatchGoToStep
}) => {
  const handleStep = (stepIndex: number) => () => {
    return dispatchGoToStep(stepIndex);
  };
  const isLastStep = currentStep === totalNumberSteps;
  const disableNext = !completedSteps[currentStep] && !isLastStep;
  const nextLabel = isLastStep ? "Complete" : "Next";

  return (
    <Grid item xs={12} className={classes.actionButtons}>
      <Button
        onClick={dispatchCloseConfig}
        variant="contained"
        className={classes.button}
      >
        Close
      </Button>
      <Button
        disabled={currentStep === 0}
        onClick={handleStep(currentStep - 1)}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Back
      </Button>
      <Button
        disabled={disableNext}
        onClick={handleStep(currentStep + 1)}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        {nextLabel}
      </Button>
    </Grid>
  );
};

export default withStyles(styles)(ConfigActions);
