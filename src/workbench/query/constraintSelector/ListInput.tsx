import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select, { SelectProps } from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { IOption } from "common/select/SelectInputContainer";

interface IProps extends WithStyles<typeof styles> {
  displayValue: string[];
  allowedValueOptions: IOption[];
  handledUpdateQueryConstraintValues: (
    event: React.ChangeEvent<HTMLSelectElement>,
    child: React.ReactNode
  ) => void;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    valueInput: {
      flexGrow: 1,
      margin: unit
    }
  });

const renderValue = (selected: SelectProps["value"]) => (
  <div>
    {(selected as string[]).map(value => (
      <Chip key={value} label={value} />
    ))}
  </div>
);

const ListInput: SFC<IProps> = ({
  classes,
  displayValue,
  allowedValueOptions,
  handledUpdateQueryConstraintValues
}) => (
  <FormControl className={classes.valueInput}>
    <Select
      multiple
      value={displayValue}
      input={<Input id="select-multiple-chip" />}
      renderValue={renderValue}
      onChange={handledUpdateQueryConstraintValues}
    >
      <MenuItem disableRipple>
        <Input fullWidth placeholder="Search" />
      </MenuItem>
      <MenuItem value="SelectAll">
        <em>Select All</em>
      </MenuItem>
      {allowedValueOptions.map(({ label, value }, i) => (
        <MenuItem key={i} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default withStyles(styles)(ListInput);
