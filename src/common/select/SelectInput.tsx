import React from "react";

import { IOption } from "common/select/SelectInputContainer";

import {
  List as VirtualizedList,
  ListRowProps,
  AutoSizer
} from "react-virtualized";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

import Option from "common/select/Option";
import NoOption from "common/select/NoOption";

import ClearIcon from "@material-ui/icons/Clear";

interface IProps {
  label: string;
  options: IOption[];
  OptionsIcon?: React.ComponentType<SvgIconProps>;
  inputLabel?: string;
  helperText?: string;
  noClear?: boolean;
  handleOptionClick: (option: IOption) => (event: React.MouseEvent) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickClearSelected: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const rowRenderer = (
  options: IOption[],
  handleOptionClick: (option: IOption) => (event: React.MouseEvent) => void,
  OptionsIcon?: React.ComponentType<SvgIconProps>
) => ({ index, key, style }: ListRowProps) => {
  const option = options[index];
  const handleClick = handleOptionClick(option);

  return (
    <Option
      key={key}
      style={style}
      option={option}
      handleClick={handleClick}
      OptionsIcon={OptionsIcon}
    />
  );
};

const noRowsRenderer = () => <NoOption />;

const handleSearchClick = (e: React.MouseEvent<HTMLInputElement>) => {
  e.stopPropagation();
};

const SelectInput: React.SFC<IProps> = ({
  inputLabel,
  helperText,
  label,
  options,
  handleSearchChange,
  noClear,
  handleClickClearSelected,
  handleMouseDownPassword,
  handleOptionClick,
  OptionsIcon
}) => (
  <FormControl fullWidth>
    {inputLabel && <InputLabel htmlFor="select-input">{inputLabel}</InputLabel>}
    <Select
      fullWidth
      value={label}
      input={
        <Input
          endAdornment={
            !noClear &&
            label !== "" && (
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
          }
        />
      }
    >
      <MenuItem disableRipple>
        <Input
          fullWidth
          onClick={handleSearchClick}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
      </MenuItem>
      <AutoSizer disableHeight>
        {({ width }) => (
          <VirtualizedList
            width={width}
            height={
              options.length === 0 ? 45 : Math.min(options.length * 40, 300)
            }
            rowCount={options.length}
            rowHeight={40}
            rowRenderer={rowRenderer(options, handleOptionClick, OptionsIcon)}
            noRowsRenderer={noRowsRenderer}
          />
        )}
      </AutoSizer>
    </Select>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default SelectInput;
