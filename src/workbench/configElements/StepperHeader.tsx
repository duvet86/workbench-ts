import React, { FC } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { IConfigSteps } from "workbench/configElements/types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

interface IProps {
  title: string;
  steps: Array<IConfigSteps<any>>;
  currentStep: number;
  completedSteps: boolean[];
  dispatchGoToStep: (stepIndex: number) => void;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  gridTitle: {
    borderBottom: "1px solid #eee"
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: spacing() * 2
  },
  title: {
    marginRight: spacing() * 2
  },
  stepper: {
    padding: 0,
    width: "100%"
  }
}));

const StepperHeader: FC<IProps> = ({
  title,
  steps,
  currentStep,
  completedSteps,
  dispatchGoToStep
}) => {
  const classes = useStyles();

  const handleStep = (stepIndex: number) => () => {
    return dispatchGoToStep(stepIndex);
  };

  return (
    <>
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
          {steps.map(({ label }, index) => (
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
      <Grid item xs={12}>
        <Typography variant="h5">
          {`Step ${currentStep + 1}: ${steps[currentStep].label}`}
        </Typography>
      </Grid>
    </>
  );
};

export default StepperHeader;
