import React from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { SelectEnum } from "common/select/SelectInputContainer";

interface IProps extends WithStyles<typeof styles> {
  value: string;
}

const styles = createStyles({
  menuItem: {
    paddingLeft: 10
  }
});

const MenuItemSelectAll: React.SFC<IProps> = ({ classes, value }) => (
  <MenuItem
    divider
    component="div"
    className={classes.menuItem}
    value={
      value === SelectEnum.AllLabel
        ? SelectEnum.SelectNone
        : SelectEnum.SelectAll
    }
  >
    <Checkbox checked={value === SelectEnum.AllLabel} />
    <ListItemText primary={"Select all"} />
  </MenuItem>
);

export default withStyles(styles)(MenuItemSelectAll);
