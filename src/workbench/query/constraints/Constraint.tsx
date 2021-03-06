import React, { FC } from "react";

import { IConstraint } from "workbench/types";
import { IUdsFilterDescriptionDtc } from "workbench/query/types";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import ConstraintIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";

import FilterTypeSelectorContainer from "workbench/query/constraints/FilterTypeSelectorContainer";
import ValueSwitchContainer from "workbench/query/constraints/ValueSwitchContainer";

interface IProps {
  elementId: number;
  label: string;
  constraint: IConstraint;
  availableFilter?: IUdsFilterDescriptionDtc;
  handledRemoveQueryConstraint: (
    constraintId: number
  ) => React.MouseEventHandler;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  paper: {
    display: "flex",
    alignItems: "center"
  },
  targetLabel: {
    flexShrink: 0,
    flexBasis: `${spacing() * 2}%`,
    margin: spacing()
  },
  constraintIcon: {
    margin: spacing(),
    fill: "#2c5367"
  }
}));

const FilterConstraint: FC<IProps> = ({
  elementId,
  label,
  constraint: { ConstraintIndex, FilterType, DataType, Values },
  handledRemoveQueryConstraint,
  availableFilter
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <ConstraintIcon className={classes.constraintIcon} />
      <Typography variant="subtitle1" className={classes.targetLabel}>
        {label}
      </Typography>
      <FilterTypeSelectorContainer
        elementId={elementId}
        constraintId={ConstraintIndex}
        filterType={FilterType}
        dataType={DataType}
      />
      <ValueSwitchContainer
        availableFilter={availableFilter}
        elementId={elementId}
        constraintId={ConstraintIndex}
        filterType={FilterType}
        dataType={DataType}
        values={Values}
      />
      <IconButton
        aria-label="Delete"
        onClick={handledRemoveQueryConstraint(ConstraintIndex)}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default FilterConstraint;
