import React, { SFC } from "react";

import { IConstraint } from "workbench/types";
import { IUdsFilterDescriptionDtc } from "workbench/query/types";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import ConstraintIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";

import FilterTypeSelectorContainer from "workbench/query/constraints/FilterTypeSelectorContainer";
import ValueSwitchContainer from "workbench/query/constraints/ValueSwitchContainer";

interface IProps extends WithStyles<typeof styles> {
  elementId: number;
  label: string;
  constraint: IConstraint;
  availableFilter?: IUdsFilterDescriptionDtc;
  handledRemoveQueryConstraint: (
    constraintId: number
  ) => React.MouseEventHandler;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      alignItems: "center"
    },
    targetLabel: {
      flexShrink: 0,
      flexBasis: `${unit * 2}%`,
      margin: unit
    },
    constraintIcon: {
      margin: unit,
      fill: "#2c5367"
    }
  });

const FilterConstraint: SFC<IProps> = ({
  classes,
  elementId,
  label,
  constraint: { ConstraintId, FilterType, DataType, Values },
  handledRemoveQueryConstraint,
  availableFilter
}) => (
  <Paper className={classes.paper}>
    <ConstraintIcon className={classes.constraintIcon} />
    <Typography variant="subtitle1" className={classes.targetLabel}>
      {label}
    </Typography>
    <FilterTypeSelectorContainer
      elementId={elementId}
      constraintId={ConstraintId}
      filterType={FilterType}
      dataType={DataType}
    />
    <ValueSwitchContainer
      availableFilter={availableFilter}
      elementId={elementId}
      constraintId={ConstraintId}
      filterType={FilterType}
      dataType={DataType}
      values={Values}
    />
    <IconButton
      aria-label="Delete"
      onClick={handledRemoveQueryConstraint(ConstraintId)}
    >
      <DeleteIcon />
    </IconButton>
  </Paper>
);

export default withStyles(styles)(FilterConstraint);
