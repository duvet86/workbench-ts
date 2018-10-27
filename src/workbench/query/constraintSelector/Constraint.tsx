import React, { SFC } from "react";

import { IConstraint } from "workbench/types";
import { IOption } from "common/select/SelectInputContainer";

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

const constraintIconColour = "#2c5367";

interface IProps extends WithStyles<typeof styles> {
  label: string;
  constraint: IConstraint;
  constraintFilterCapabilities: Array<IOption<string>>;
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
    typeSelect: {
      flexBasis: `${unit * 2}%`,
      margin: unit
    },
    valueInput: {
      flexGrow: 1,
      margin: unit
    },
    constraintIcon: {
      margin: unit,
      fill: constraintIconColour
    }
  });

const FilterConstraint: SFC<IProps> = ({
  classes,
  constraintFilterCapabilities,
  label,
  constraint: { ConstraintId, FilterType },
  handledUpdateQueryConstraintType,
  handledRemoveQueryConstraint
}) => (
  <Paper className={classes.paper}>
    <ConstraintIcon className={classes.constraintIcon} />
    <Typography variant="subtitle1" className={classes.targetLabel}>
      {label}
    </Typography>
    <FormControl className={classes.typeSelect}>
      <Select
        value={FilterType}
        onChange={handledUpdateQueryConstraintType(ConstraintId)}
        autoWidth
      >
        {constraintFilterCapabilities.map(
          ({ label: filterCapLabel, value }, i) => (
            <MenuItem key={i} value={value}>
              {filterCapLabel}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
    TODO: Value selector
    <IconButton
      aria-label="Delete"
      onClick={handledRemoveQueryConstraint(ConstraintId)}
    >
      <DeleteIcon />
    </IconButton>
  </Paper>
);

export default withStyles(styles)(FilterConstraint);
