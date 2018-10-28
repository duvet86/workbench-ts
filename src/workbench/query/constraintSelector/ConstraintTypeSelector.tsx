import React, { SFC } from "react";

import { IFilterCapabilitiesDic } from "workbench/query/types";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

interface IProps extends WithStyles<typeof styles> {
  constraintId: number;
  filterType: string;
  dataType: string;
  filterCapabilities: IFilterCapabilitiesDic;
  isFullWidth: boolean;
  handledUpdateQueryConstraintType: (
    constraintId: number
  ) => React.ChangeEventHandler<HTMLSelectElement>;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    root: {
      flexBasis: `${unit * 2}%`,
      margin: unit
    },
    rootFullWidth: {
      flex: 1,
      margin: unit
    }
  });

const ConstraintTypeSelector: SFC<IProps> = ({
  classes,
  filterCapabilities,
  constraintId,
  filterType,
  dataType,
  isFullWidth,
  handledUpdateQueryConstraintType
}) => (
  <FormControl className={isFullWidth ? classes.rootFullWidth : classes.root}>
    <Select
      autoWidth
      value={filterType}
      onChange={handledUpdateQueryConstraintType(constraintId)}
    >
      {filterCapabilities[dataType].map(({ Label, Type }, i) => (
        <MenuItem key={i} value={Type}>
          {Label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default withStyles(styles)(ConstraintTypeSelector);
