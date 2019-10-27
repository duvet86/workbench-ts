import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";

interface IProps extends WithStyles<typeof styles> {
  selectedValues: string[];
  allowedValueOptions: IOption[];
  handledUpdateQueryConstraintValues: (selectedOptions?: IOption[]) => void;
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    valueInput: {
      flexGrow: 1,
      margin: spacing()
    }
  });

const AllowedValues: SFC<IProps> = ({
  classes,
  selectedValues,
  allowedValueOptions,
  handledUpdateQueryConstraintValues
}) => (
  <FormControl className={classes.valueInput}>
    <SelectInputContainer
      isMulti
      initValue={selectedValues}
      options={allowedValueOptions}
      onChange={handledUpdateQueryConstraintValues}
    />
  </FormControl>
);

export default withStyles(styles)(AllowedValues);
