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

import ConstraintIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";

import SelectInput from "common/select/SelectInput";

const constraintIconColour = "#2c5367";

interface IContraintTarget extends IConstraint {
  displayValue: string;
  label: string;
}

interface IProps extends WithStyles<typeof styles> {
  contraintTargets: IContraintTarget[];
  queryConstraints: IContraintTarget[];
  filterCapabilities: IFilterCapabilitiesDic;
  handledAddQueryConstraint: (target: IContraintTarget) => void;
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
      <SelectInput
        OptionsIcon={ConstraintIcon}
        iconClassName={classes.constraintIconColour}
        inputLabel="Contraint on..."
        options={contraintTargets}
        value={""}
        handleChange={handledAddQueryConstraint}
      />
    </div>
    {queryConstraints.length > 0 &&
      queryConstraints.map(
        ({ ConstraintId, DataType, FilterType, displayValue, label }) => (
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
                value={displayValue}
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
