import React from "react";
import {
  FixedSizeList as VirtualizedList,
  ListChildComponentProps
} from "react-window";

import { IOption } from "common/select/SelectInputContainer";

import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { SelectProps } from "@material-ui/core/Select";

import Option from "common/select/Option";
import NoOption from "common/select/NoOption";
import MenuItemSelectAll from "common/select/MenuItemSelectAll";

import ClearIcon from "@material-ui/icons/Clear";

interface IProps {
  open: boolean;
  value: string | string[];
  options: IOption[];
  isMulti?: boolean;
  OptionsIcon?: JSX.Element;
  inputLabel?: string;
  helperText?: string;
  noClear?: boolean;
  required?: boolean;
  handleOptionClick: (option: IOption) => (event: React.MouseEvent) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickClearSelected: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleOpen: () => void;
  handleClose: () => void;
  renderValue: (value: SelectProps["value"]) => React.ReactNode;
  handleSelectAllNone: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => void;
}

const rowRenderer = (
  value: string | string[],
  options: IOption[],
  handleOptionClick: (option: IOption) => (event: React.MouseEvent) => void,
  isMulti?: boolean,
  OptionsIcon?: JSX.Element
) => ({ index, style }: ListChildComponentProps) => {
  const option = options[index];
  const handleClick = handleOptionClick(option);

  return (
    <Option
      selectedValue={value}
      style={style}
      option={option}
      handleClick={handleClick}
      isMulti={isMulti}
      // OptionsIcon={OptionsIcon}
    />
  );
};

const handleSearchClick = (e: React.MouseEvent<HTMLInputElement>) => {
  e.stopPropagation();
};

const SelectInput: React.SFC<IProps> = ({
  inputLabel,
  helperText,
  value,
  options,
  handleSearchChange,
  noClear,
  handleClickClearSelected,
  handleMouseDownPassword,
  handleOptionClick,
  OptionsIcon,
  handleOpen,
  handleClose,
  open,
  renderValue,
  handleSelectAllNone,
  isMulti,
  required
}) => (
  <TextField
    select
    fullWidth
    required={required}
    label={inputLabel}
    helperText={helperText}
    value={value}
    SelectProps={{
      MenuProps: {
        disableAutoFocusItem: true
        // MenuListProps: {
        //   component: "div" as "ul"
        // }
      },
      open,
      onOpen: handleOpen,
      onClose: handleClose,
      onChange: handleSelectAllNone,
      renderValue,
      multiple: isMulti
    }}
    InputProps={{
      endAdornment: !noClear && value !== "" && (
        <InputAdornment position="end">
          <IconButton
            aria-label="Clear Selected"
            onClick={handleClickClearSelected}
            onMouseDown={handleMouseDownPassword}
          >
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      )
    }}
  >
    <MenuItem component="div" disableRipple>
      <Input
        fullWidth
        autoFocus
        onClick={handleSearchClick}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
    </MenuItem>
    {isMulti && <MenuItemSelectAll value={value[0]} />}
    {options.length === 0 && <NoOption />}
    <VirtualizedList
      style={{ overflowX: "hidden" }}
      width="100%"
      height={Math.min(options.length * 40, 300)}
      itemCount={options.length}
      itemSize={40}
    >
      {rowRenderer(value, options, handleOptionClick, isMulti, OptionsIcon)}
    </VirtualizedList>
  </TextField>
);

export default SelectInput;
