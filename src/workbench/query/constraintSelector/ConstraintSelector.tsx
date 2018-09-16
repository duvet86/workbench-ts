import React, { Fragment, SFC } from "react";

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
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";

import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";

import ConstraintIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";

type QueryContraint = IOption & IConstraint;

const constraintIconColour = "#2c5367";

interface IProps extends WithStyles<typeof styles> {
  contraintTargets: IOption[];
  queryConstraints: QueryContraint[];
  filterCapabilities: IFilterCapabilitiesDic;
  handledAddQueryConstraint: (
    target: IOption
  ) => (event: React.MouseEvent) => void;
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
    constraintTargetSelect: {
      marginBottom: 30
    },
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

const ConstraintSelector: SFC<IProps> = ({
  classes,
  contraintTargets,
  queryConstraints,
  filterCapabilities,
  handledAddQueryConstraint,
  handledUpdateQueryConstraintType,
  handledUpdateQueryConstraintValues,
  handledRemoveQueryConstraint
}) => (
  <Fragment>
    <div className={classes.constraintTargetSelect}>
      <SelectInputContainer
        OptionsIcon={ConstraintIcon}
        inputLabel="Contraint on..."
        options={contraintTargets}
        value={""}
        handleChange={handledAddQueryConstraint}
      />
    </div>
    {queryConstraints.length > 0 &&
      queryConstraints.map(
        ({ ConstraintId, DataType, FilterType, value, label }) => (
          <Paper key={ConstraintId} className={classes.paper}>
            <ConstraintIcon className={classes.constraintIcon} />
            <Typography variant="subheading" className={classes.targetLabel}>
              {label}
            </Typography>
            <FormControl className={classes.typeSelect}>
              <Select
                value={FilterType}
                onChange={handledUpdateQueryConstraintType(ConstraintId)}
                autoWidth
              >
                {filterCapabilities[DataType].map(({ Type, Label }, n) => (
                  <MenuItem key={n} value={Type}>
                    {Label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.valueInput}>
              <Input
                autoFocus
                value={value}
                onChange={handledUpdateQueryConstraintValues(
                  ConstraintId,
                  DataType
                )}
              />
            </FormControl>
            <IconButton
              aria-label="Delete"
              onClick={handledRemoveQueryConstraint(ConstraintId)}
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        )
      )}
  </Fragment>
);

export default withStyles(styles)(ConstraintSelector);
