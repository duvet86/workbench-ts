import React from "react";

import { styled } from "@material-ui/core/styles";

import { IOption } from "common/select/SelectInputContainer";

import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

interface IProps {
  style: React.CSSProperties;
  option: IOption;
  selectedValue: string | string[];
  OptionsIcon?: React.ComponentType<SvgIconProps>;
  isMulti?: boolean;
  handleClick: (event: React.MouseEvent) => void;
}

const StyledMenuItem = styled(MenuItem)({
  padding: "0 0 0 10px"
});

const Option: React.FC<IProps> = ({
  style,
  option,
  selectedValue,
  OptionsIcon,
  isMulti,
  handleClick
}) => (
  <StyledMenuItem button style={style} onClick={handleClick}>
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
  </StyledMenuItem>
);

export default Option;
