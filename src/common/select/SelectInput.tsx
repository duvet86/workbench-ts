import PropTypes from "prop-types";
import React, { ComponentType, SFC } from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ClearIcon from "@material-ui/icons/Clear";

import VirtualizedSelect, {
  VirtualizedOptionRenderOptions
} from "react-virtualized-select";

import { ValueComponentType } from "react-select";

interface IArrowRendererProps {
  isOpen: boolean;
}

interface ISelectInput {
  classes: any;
  options: IOptionRenderer[];
  OptionsIcon: ComponentType<SvgIconProps>;
  iconClassName?: string;
  value: string;
  inputLabel: string;
  helperText?: string;
  handleChange: any;
  noClear?: boolean;
}

interface IOptionRenderer {
  label: string;
  secondaryLabel: string;
}

const ITEM_HEIGHT = 48;
const HEIGHT_MULTIPLIER = 8;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: "0 0 0 10px"
    },
    "@global": {
      ".Select-control": {
        display: "flex",
        alignItems: "center",
        border: 0,
        height: "auto",
        background: "transparent",
        "&:hover": {
          boxShadow: "none"
        }
      },
      ".Select-multi-value-wrapper": {
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap"
      },
      ".Select--multi .Select-input": {
        margin: 0
      },
      ".Select.has-value.is-clearable.Select--single > .Select-control .Select-value": {
        padding: 0
      },
      ".Select-noresults": {
        padding: theme.spacing.unit * 2
      },
      ".Select-input": {
        display: "inline-flex !important",
        padding: 0,
        height: "auto"
      },
      ".Select-input input": {
        background: "transparent",
        border: 0,
        padding: 0,
        cursor: "default",
        display: "inline-block",
        fontFamily: "inherit",
        fontSize: "inherit",
        margin: 0,
        outline: 0
      },
      ".Select-placeholder, .Select--single .Select-value": {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(16),
        padding: 0
      },
      ".Select-placeholder": {
        opacity: 0.42,
        color: theme.palette.common.black
      },
      ".Select-menu-outer": {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        position: "absolute",
        left: 0,
        top: `calc(100% + ${theme.spacing.unit}px)`,
        width: "100%",
        zIndex: 2,
        maxHeight: ITEM_HEIGHT * HEIGHT_MULTIPLIER
      },
      ".Select.is-focused:not(.is-open) > .Select-control": {
        boxShadow: "none"
      },
      ".Select-menu": {
        maxHeight: ITEM_HEIGHT * HEIGHT_MULTIPLIER,
        overflowY: "auto"
      },
      ".Select-menu div": {
        boxSizing: "content-box"
      },
      ".Select-arrow-zone, .Select-clear-zone": {
        color: theme.palette.action.active,
        cursor: "pointer",
        height: 21,
        width: 21,
        zIndex: 1
      },
      // Only for screen readers. We can't use display none.
      ".Select-aria-only": {
        position: "absolute",
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        height: 1,
        width: 1,
        margin: -1
      }
    }
  });

const OptionRenderer = (
  classes: { root: string },
  OptionsIcon: ComponentType<SvgIconProps>,
  iconClassName: string
) => ({
  focusOption,
  key,
  option,
  selectValue,
  style,
  valueArray
}: VirtualizedOptionRenderOptions<IOptionRenderer>) => {
  const handleClick = () => {
    selectValue(option);
  };
  const handleFocus = () => focusOption(option);
  const isSelected = valueArray.indexOf(option) >= 0;

  return (
    <MenuItem
      key={key}
      onFocus={handleFocus}
      selected={isSelected}
      onClick={handleClick}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
        ...style
      }}
      className={classes.root}
    >
      {OptionsIcon && (
        <ListItemIcon>
          <OptionsIcon className={iconClassName} />
        </ListItemIcon>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <div style={{ marginRight: 15 }}>{option.label}</div>
        <Typography variant="caption">{option.secondaryLabel}</Typography>
      </div>
    </MenuItem>
  );
};

const ArrowRenderer: SFC<IArrowRendererProps> = ({ isOpen }) =>
  isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;

ArrowRenderer.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

const NoClearRenderer = () => <span />;
const ClearRenderer = () => <ClearIcon />;

const SelectedValueComponent: (
  OptionsIcon: ComponentType<SvgIconProps>,
  iconClassName: string
) => ValueComponentType = (OptionsIcon, iconClassName) => ({ children }) => (
  <div className="Select-value">
    {OptionsIcon && (
      <ListItemIcon>
        <OptionsIcon className={iconClassName} />
      </ListItemIcon>
    )}
    {children}
  </div>
);

// TODO: fix me.
const SelectWrapped: SFC<any> = ({
  classes,
  noClear,
  OptionsIcon,
  iconClassName,
  ...rest
}) => (
  <VirtualizedSelect
    maxHeight={ITEM_HEIGHT * HEIGHT_MULTIPLIER}
    optionRenderer={OptionRenderer(classes, OptionsIcon, iconClassName)}
    noResultsText={<Typography>{"No results found"}</Typography>}
    arrowRenderer={ArrowRenderer}
    clearRenderer={noClear ? NoClearRenderer : ClearRenderer}
    valueComponent={SelectedValueComponent(OptionsIcon, iconClassName)}
    {...rest}
  />
);

SelectWrapped.propTypes = {
  classes: PropTypes.object.isRequired
};

const SelectInput: SFC<ISelectInput> = ({
  value,
  inputLabel,
  helperText,
  handleChange,
  ...props
}) => (
  <FormControl fullWidth>
    {inputLabel && <InputLabel htmlFor="select-input">{inputLabel}</InputLabel>}
    <Input
      fullWidth
      inputComponent={SelectWrapped}
      value={value}
      onChange={handleChange}
      id="select-input"
      name="select-input"
      placeholder=""
      inputProps={{
        simpleValue: true,
        ...props
      }}
    />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

SelectInput.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  OptionsIcon: PropTypes.func,
  iconClassName: PropTypes.string
};

export default withStyles(styles)(SelectInput);
