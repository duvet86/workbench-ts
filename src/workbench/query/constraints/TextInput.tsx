import React, { FC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

interface IProps extends WithStyles<typeof styles> {
  displayValue: string;
  inputType: string;
  handledUpdateQueryConstraintValues: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    valueInput: {
      flexGrow: 1,
      margin: spacing()
    }
  });

const TextInput: FC<IProps> = ({
  classes,
  inputType,
  displayValue,
  handledUpdateQueryConstraintValues
}) => (
  <FormControl className={classes.valueInput}>
    <Input
      autoFocus
      type={inputType}
      value={displayValue}
      onChange={handledUpdateQueryConstraintValues}
    />
  </FormControl>
);

export default withStyles(styles)(TextInput);
