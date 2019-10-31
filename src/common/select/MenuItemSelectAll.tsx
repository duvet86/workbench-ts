import React from "react";

import { styled } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { SelectEnum } from "common/select/SelectInputContainer";

interface IProps {
  value: string;
}

const StyledMenuItem = styled(MenuItem)({
  paddingLeft: 10
});

const MenuItemSelectAll: React.FC<IProps> = ({ value }) => (
  <StyledMenuItem
    divider
    button
    value={
      value === SelectEnum.AllLabel
        ? SelectEnum.SelectNone
        : SelectEnum.SelectAll
    }
  >
    <Checkbox checked={value === SelectEnum.AllLabel} />
    <ListItemText primary="Select all" />
  </StyledMenuItem>
);

export default MenuItemSelectAll;
