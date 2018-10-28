import React, { SFC } from "react";

import { IConstraint } from "workbench/types";
import { IFilterCapabilitiesDic } from "workbench/query/types";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";

import ConstraintIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";

import ConstraintValueSwitchContainer from "workbench/query/constraintSelector/ConstraintValueSwitchContainer";

const constraintIconColour = "#2c5367";

interface IProps extends WithStyles<typeof styles> {
  elementId: number;
  constraint: IConstraint;
  label: string;
  filterCapabilities: IFilterCapabilitiesDic;
  handledUpdateQueryConstraintType: (
    constraintId: number
  ) => React.ChangeEventHandler<HTMLSelectElement>;
  handledRemoveQueryConstraint: (
    constraintId: number
  ) => React.MouseEventHandler;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    constraintIconColour: {
      fill: constraintIconColour
    },
    paper: {
      display: "flex",
      alignItems: "center"
    },
    targetLabel: {
      flexBasis: `${unit * 2}%`,
      margin: unit
    },
    filterTypeSelect: {
      flexBasis: `${unit * 2}%`,
      margin: unit
    },
    constraintIcon: {
      margin: unit,
      fill: constraintIconColour
    }
  });

const FilterConstraint: SFC<IProps> = ({
  classes,
  filterCapabilities,
  elementId,
  label,
  constraint: { ConstraintId, FilterType, DataType, Values },
  handledUpdateQueryConstraintType,
  handledRemoveQueryConstraint
}) => (
  <Paper className={classes.paper}>
    <ConstraintIcon className={classes.constraintIcon} />
    <Typography variant="subtitle1" className={classes.targetLabel}>
      {label}
    </Typography>
    <FormControl className={classes.filterTypeSelect}>
      <Select
        value={FilterType}
        onChange={handledUpdateQueryConstraintType(ConstraintId)}
        autoWidth
      >
        {filterCapabilities[DataType].map(({ Label, Type }, i) => (
          <MenuItem key={i} value={Type}>
            {Label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <ConstraintValueSwitchContainer
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
