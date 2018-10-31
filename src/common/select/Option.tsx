import React from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { IOption } from "common/select/SelectInputContainer";

import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

interface IProps extends WithStyles<typeof styles> {
  style: React.CSSProperties;
  OptionsIcon?: React.ComponentType<SvgIconProps>;
  option: IOption;
  handleClick: (event: React.MouseEvent) => void;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    menuItem: {
      padding: "0 0 0 10px"
    },
    labelContainer: {
      padding: unit * 2
    }
  });

const Option: React.SFC<IProps> = ({
  classes,
  style,
  OptionsIcon,
  option,
  handleClick
}) => (
  <MenuItem
    component="div"
    style={style}
    className={classes.menuItem}
    onClick={handleClick}
    value={option.label}
  >
    {OptionsIcon && (
      <ListItemIcon>
        <OptionsIcon />
      </ListItemIcon>
    )}
    <div className={classes.labelContainer}>{option.label}</div>
  </MenuItem>
);

export default withStyles(styles)(Option);
