import React, { SFC } from "react";

import {
  IFilterCapabilitiesDic,
  IAvailableFilters
} from "workbench/query/types";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";

import ConstraintIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";

import AllowedValuesSelectContainer from "workbench/query/constraintSelector/AllowedValuesSelectContainer";

const constraintIconColour = "#2c5367";

interface IProps extends WithStyles<typeof styles> {
  availableFiltersDic: IAvailableFilters;
  filterCapabilities: IFilterCapabilitiesDic;
  constraintId: number;
  dataType: string;
  filterType: string;
  filterName: string;
  handledUpdateQueryConstraintType: (
    constraintId: number
  ) => React.ChangeEventHandler<HTMLSelectElement>;
  handledUpdateQueryConstraintValues: (
    constraintId: number,
    dataType: string
  ) => React.ChangeEventHandler<HTMLInputElement>;
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
  availableFiltersDic,
  filterCapabilities,
  constraintId,
  dataType,
  filterType,
  filterName,
  handledUpdateQueryConstraintType,
  handledUpdateQueryConstraintValues,
  handledRemoveQueryConstraint
}) => (
  <Paper className={classes.paper}>
    <ConstraintIcon className={classes.constraintIcon} />
    <Typography variant="subtitle1" className={classes.targetLabel}>
      {availableFiltersDic[filterName].Label}
    </Typography>
    <FormControl className={classes.typeSelect}>
      <Select
        value={
          availableFiltersDic[filterName].HasAllowedValues
            ? "InList"
            : filterType
        }
        onChange={handledUpdateQueryConstraintType(constraintId)}
        autoWidth
      >
        {filterCapabilities[dataType].map(({ Type, Label }, n) => (
          <MenuItem key={n} value={Type}>
            {Label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <AllowedValuesSelectContainer
      onChange={handledUpdateQueryConstraintValues(constraintId, dataType)}
    />
    {/* <FormControl className={classes.valueInput}>
      <Input
        autoFocus
        value={""}
        onChange={handledUpdateQueryConstraintValues(constraintId, dataType)}
      />
    </FormControl> */}
    <IconButton
      aria-label="Delete"
      onClick={handledRemoveQueryConstraint(constraintId)}
    >
      <DeleteIcon />
    </IconButton>
  </Paper>
);

export default withStyles(styles)(FilterConstraint);
