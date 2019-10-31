import React from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import { IOption } from "common/select/SelectInputContainer";

import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

interface IProps extends WithStyles<typeof styles> {
  style: React.CSSProperties;
  option: IOption;
  selectedValue: string | string[];
  OptionsIcon?: React.ComponentType<SvgIconProps>;
  isMulti?: boolean;
  handleClick: (event: React.MouseEvent) => void;
}

const styles = createStyles({
  menuItem: {
    padding: "0 0 0 10px"
  }
});

const Option: React.FC<IProps> = ({
  classes,
  style,
  option,
  selectedValue,
  OptionsIcon,
  isMulti,
  handleClick
}) => (
  <MenuItem
    component="div"
    style={style}
    className={classes.menuItem}
    onClick={handleClick}
  >
    {OptionsIcon && (
      <ListItemIcon>
        <OptionsIcon />
      </ListItemIcon>
    )}
    {isMulti && (
      <Checkbox
        checked={
          selectedValue.includes(option.label) || selectedValue[0] === "All..."
        }
      />
    )}
    <ListItemText primary={option.label} />
  </MenuItem>
);

export default withStyles(styles)(Option);
