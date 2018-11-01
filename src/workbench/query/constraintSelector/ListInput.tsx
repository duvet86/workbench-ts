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
  selectedOptions: IOption[];
  allowedValueOptions: IOption[];
  handledUpdateQueryConstraintValues: (selectedOptions?: IOption[]) => void;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    valueInput: {
      flexGrow: 1,
      margin: unit
    }
  });

const ListInput: SFC<IProps> = ({
  classes,
  selectedOptions,
  allowedValueOptions,
  handledUpdateQueryConstraintValues
}) => (
  <FormControl className={classes.valueInput}>
    <SelectInputContainer
      isMulti
      initValue={selectedOptions}
      options={allowedValueOptions}
      onChange={handledUpdateQueryConstraintValues}
    />
  </FormControl>
);

export default withStyles(styles)(ListInput);
