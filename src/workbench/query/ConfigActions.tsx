import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

interface IProps extends WithStyles<typeof styles> {
  currentStep: number;
  completedSteps: boolean[];
  dispatchCloseConfig: () => void;
  dispatchGoToStep: (stepIndex: number) => void;
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    actionButtons: {
      display: "flex",
      justifyContent: "flex-end",
      position: "fixed",
      bottom: spacing.unit * 6,
      right: 0
    },
    button: {
      margin: spacing.unit
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

  return (
    <Grid item xs={12} className={classes.actionButtons}>
      <Button
        onClick={dispatchCloseConfig}
        variant="raised"
        className={classes.button}
      >
        Close
      </Button>
      <Button
        disabled={currentStep === 0}
        onClick={handleStep(currentStep - 1)}
        variant="raised"
        color="secondary"
        className={classes.button}
      >
        Back
      </Button>
      <Button
        disabled={!completedSteps[currentStep]}
        onClick={handleStep(currentStep + 1)}
        variant="raised"
        color="secondary"
        className={classes.button}
      >
        Next
      </Button>
    </Grid>
  );
};

export default withStyles(styles)(ConfigActions);
