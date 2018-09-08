import React from "react";

import { IOption } from "common/select/SelectInputContainer";

import { List as VirtualizedList, ListRowProps } from "react-virtualized";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Menu from "@material-ui/core/Menu";
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
  containerRef: React.RefObject<HTMLDivElement>;
  anchorEl?: HTMLElement;
  OptionsIcon?: React.ComponentType<SvgIconProps>;
  inputLabel?: string;
  helperText?: string;
  noClear?: boolean;
  handleOptionClick: (option: IOption) => (event: React.MouseEvent) => void;
  handleInputClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickClearSelected: () => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleClose: () => void;
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

const SelectInput: React.SFC<IProps> = ({
  containerRef,
  inputLabel,
  helperText,
  label,
  options,
  handleInputClick,
  handleInputChange,
  noClear,
  handleClickClearSelected,
  handleMouseDownPassword,
  anchorEl,
  handleClose,
  handleOptionClick,
  OptionsIcon
}) => (
  <div ref={containerRef}>
    <FormControl fullWidth>
      {inputLabel && (
        <InputLabel htmlFor="select-input">{inputLabel}</InputLabel>
      )}
      <Input
        fullWidth
        value={label}
        onClick={handleInputClick}
        onChange={handleInputChange}
        endAdornment={
          !noClear && (
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
      <Menu
        disableAutoFocus
        disableAutoFocusItem
        disableRestoreFocus
        MenuListProps={{
          component: "div",
          disablePadding: true
        }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        {containerRef.current && (
          <VirtualizedList
            width={containerRef.current.offsetWidth}
            height={
              options.length === 0 ? 45 : Math.min(options.length * 40, 300)
            }
            rowCount={options.length}
            rowHeight={40}
            rowRenderer={rowRenderer(options, handleOptionClick, OptionsIcon)}
            noRowsRenderer={noRowsRenderer}
          />
        )}
      </Menu>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  </div>
);

export default SelectInput;
