import React, { Fragment, SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

interface IProps extends WithStyles<typeof styles> {
  title: string;
  stepLabels: string[];
  currentStep: number;
  completedSteps: boolean[];
  dispatchGoToStep: (stepIndex: number) => void;
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    gridTitle: {
      position: "fixed",
      width: "99%",
      backgroundColor: "white",
      zIndex: 2,
      borderBottom: "1px solid #eee"
    },
    titleContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: spacing.unit * 2
    },
    title: {
      marginRight: spacing.unit * 2
    },
    stepper: {
      padding: 0,
      width: "100%"
    },
    stepTitle: {
      marginTop: 85
    }
  });

const StepperHeader: SFC<IProps> = ({
  classes,
  title,
  stepLabels,
  currentStep,
  completedSteps,
  dispatchGoToStep
}) => {
  const handleStep = (stepIndex: number) => () => {
    return dispatchGoToStep(stepIndex);
  };

  return (
    <Fragment>
      <Grid item xs={12} className={classes.gridTitle}>
        <div className={classes.titleContainer}>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </div>
        <Stepper
          classes={{ root: classes.stepper }}
          nonLinear
          activeStep={currentStep}
        >
          {stepLabels.map((label, index) => (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
                disabled={completedSteps[index] == null}
                completed={completedSteps[index]}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12} className={classes.stepTitle}>
        <Typography variant="h5">
          {`Step ${currentStep + 1}: ${stepLabels[currentStep]}`}
        </Typography>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(StepperHeader);