import React from "react";

import { IOption } from "common/select/SelectInputContainer";

import {
  List as VirtualizedList,
  ListRowProps,
  AutoSizer
} from "react-virtualized";

import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

import Option from "common/select/Option";
import NoOption from "common/select/NoOption";

import ClearIcon from "@material-ui/icons/Clear";

interface IProps {
  open: boolean;
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
  handleOpen: () => void;
  handleClose: () => void;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const rowRenderer = (
  label: string,
  options: IOption[],
  handleOptionClick: (option: IOption) => (event: React.MouseEvent) => void,
  OptionsIcon?: React.ComponentType<SvgIconProps>
) => ({ index, key, style }: ListRowProps) => {
  const option = options[index];
  const handleClick = handleOptionClick(option);

  return (
    <Option
      key={key}
      label={label}
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
  OptionsIcon,
  handleChange,
  handleOpen,
  handleClose,
  open
}) => (
  <>
    --
    {label}
    <TextField
      select
      fullWidth
      value={label}
      onChange={handleChange}
      SelectProps={{
        MenuProps: {
          MenuListProps: {
            component: "div"
          }
        },
        open,
        onOpen: handleOpen,
        onClose: handleClose
      }}
      InputProps={{
        endAdornment: !noClear &&
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
      }}
      // MenuProps={{
      //   MenuListProps: {
      //     component: "div"
      //   }
      // }}
      // input={
      //   <Input
      //     endAdornment={
      //       !noClear &&
      //       label !== "" && (
      //         <InputAdornment position="end">
      //           <IconButton
      //             aria-label="Clear Selected"
      //             onClick={handleClickClearSelected}
      //             onMouseDown={handleMouseDownPassword}
      //           >
      //             <ClearIcon />
      //           </IconButton>
      //         </InputAdornment>
      //       )
      //     }
      //   />
      // }
    >
      <div>
        <MenuItem component="div" disableRipple>
          <Input
            fullWidth
            onClick={handleSearchClick}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </MenuItem>
        <MenuItem component="div" value="test">
          asd
        </MenuItem>
      </div>
      <AutoSizer disableHeight>
        {({ width }) => (
          <VirtualizedList
            width={width}
            height={
              options.length === 0 ? 45 : Math.min(options.length * 40, 300)
            }
            rowCount={options.length}
            rowHeight={40}
            rowRenderer={rowRenderer(
              label,
              options,
              handleOptionClick,
              OptionsIcon
            )}
            noRowsRenderer={noRowsRenderer}
          />
        )}
      </AutoSizer>
    </TextField>
  </>
);

export default SelectInput;
