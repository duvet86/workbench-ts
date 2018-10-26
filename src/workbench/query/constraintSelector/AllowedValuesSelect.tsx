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
  allowedValueOptions: IOption[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

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

const FilterConstraint: SFC<IProps> = ({
  classes,
  allowedValueOptions,
  onChange
}) => (
  <FormControl className={classes.valueInput}>
    <Select
      multiple
      value={[]}
      input={<Input id="select-multiple-chip" />}
      renderValue={renderValue}
      // onChange={onChange}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
          }
        }
      }}
    >
      {allowedValueOptions.map(({ label, value }, i) => (
        <MenuItem key={i} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default withStyles(styles)(FilterConstraint);
