import React from "react";
import classNames from "classnames";
import Select from "react-select";

import { NoticeProps, MenuProps } from "react-select/lib/components/Menu";
import { OptionProps } from "react-select/lib/components/Option";
import { PlaceholderProps } from "react-select/lib/components/Placeholder";
import { SingleValueProps } from "react-select/lib/components/SingleValue";
import { ControlProps } from "react-select/lib/components/Control";
import { ValueContainerProps } from "react-select/lib/components/containers";
import { MultiValueProps } from "react-select/lib/components/MultiValue";
import { StylesConfig } from "react-select/lib/styles";

import { InputBaseComponentProps } from "@material-ui/core/InputBase";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

type customClasses = Record<keyof ReturnType<typeof styles>, string>;

interface IProps extends WithStyles<typeof styles, true> {}

const suggestions = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 250
    },
    input: {
      display: "flex",
      padding: 0
    },
    valueContainer: {
      display: "flex",
      flexWrap: "wrap",
      flex: 1,
      alignItems: "center"
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === "light"
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08
      )
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
      fontSize: 16
    },
    placeholder: {
      position: "absolute",
      left: 2,
      fontSize: 16
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0
    }
  });

const getNoOptionsMessage = (classes: customClasses) => (
  props: NoticeProps<any>
) => (
  <Typography
    color="textSecondary"
    className={classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const inputComponent = ({
  inputRef,
  defaultValue,
  onChange,
  onKeyDown,
  onKeyUp,
  ...props
}: InputBaseComponentProps) => <div ref={inputRef} {...props} />;

const getControl = (classes: customClasses, textFieldProps: TextFieldProps) => (
  props: ControlProps<any>
) => (
  <TextField
    fullWidth
    InputProps={{
      inputComponent,
      inputProps: {
        className: classes.input,
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps
      }
    }}
    {...textFieldProps}
  />
);

const Option = (props: OptionProps<any>) => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400
    }}
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
);

const getPlaceholder = (classes: customClasses) => (
  props: PlaceholderProps<any>
) => (
  <Typography
    color="textSecondary"
    className={classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const getSingleValue = (classes: customClasses) => (
  props: SingleValueProps<any>
) => (
  <Typography className={classes.singleValue} {...props.innerProps}>
    {props.children}
  </Typography>
);

const getValueContainer = (classes: customClasses) => (
  props: ValueContainerProps<any>
) => <div className={classes.valueContainer}>{props.children}</div>;

const getMultiValue = (classes: customClasses) => (
  props: MultiValueProps<any>
) => (
  <Chip
    tabIndex={-1}
    label={props.children}
    className={classNames(classes.chip, {
      [classes.chipFocused]: props.isFocused
    })}
    onDelete={props.removeProps.onClick}
    deleteIcon={<CancelIcon {...props.removeProps} />}
  />
);

const getMenu = (classes: customClasses) => (props: MenuProps<any>) => (
  <Paper square className={classes.paper} {...props.innerProps}>
    {props.children}
  </Paper>
);

const components = (classes: customClasses) => ({
  Control: getControl(classes, {
    label: "Label",
    InputLabelProps: {
      shrink: true
    }
  }),
  Menu: getMenu(classes),
  MultiValue: getMultiValue(classes),
  NoOptionsMessage: getNoOptionsMessage(classes),
  Option,
  Placeholder: getPlaceholder(classes),
  SingleValue: getSingleValue(classes),
  ValueContainer: getValueContainer(classes)
});

class IntegrationReactSelect extends React.Component<IProps> {
  public state = {
    multi: null
  };

  public render() {
    const { classes, theme } = this.props;

    const selectStyles: StylesConfig = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <div className={classes.root}>
        <Select
          styles={selectStyles}
          options={suggestions}
          components={components(classes)}
          value={this.state.multi}
          onChange={this.handleChange}
          placeholder="Select multiple countries"
          isMulti
        />
      </div>
    );
  }

  private handleChange = (value: string) => {
    this.setState({
      multi: value
    });
  };
}

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
