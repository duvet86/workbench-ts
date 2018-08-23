import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

import { DATA_TYPES } from "workbench/utils";

interface IProps extends WithStyles<typeof styles> {
  displayValue: string;
  constraintId: number;
  dataType: DATA_TYPES;
  handledUpdateQueryConstraintValues: (
    constraintId: number,
    dataType: DATA_TYPES
  ) => React.ChangeEventHandler<HTMLInputElement>;
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    valueInput: {
      flexGrow: 1,
      margin: spacing.unit
    }
  });

const ConstraintSelector: SFC<IProps> = ({
  classes,
  displayValue,
  constraintId,
  dataType,
  handledUpdateQueryConstraintValues
}) => (
  <FormControl className={classes.valueInput}>
    <Input
      autoFocus
      value={displayValue}
      onChange={handledUpdateQueryConstraintValues(constraintId, dataType)}
    />
  </FormControl>
);

export default withStyles(styles)(ConstraintSelector);
