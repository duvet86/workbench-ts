import React from "react";
import VirtualList from "react-tiny-virtual-list";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

import ClearIcon from "@material-ui/icons/Clear";

interface IOption {
  label: string;
}

interface IProps<T extends IOption> extends WithStyles<typeof styles> {
  value: string;
  options: T[];
  handleChange: (option: T) => void;
  OptionsIcon?: React.ComponentType<SvgIconProps>;
  inputLabel?: string;
  helperText?: string;
  noClear?: boolean;
}

interface IState<T extends IOption> {
  anchorEl?: HTMLElement;
  label: string;
  selectdIndex?: number;
  options: T[];
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    menuItem: {
      padding: 0
    },
    labelContainer: {
      padding: unit * 2
    }
  });

function renderer<T extends IOption>({
  classes,
  options,
  handleClick,
  OptionsIcon
}: {
  classes: {
    menuItem: string;
    labelContainer: string;
  };
  options: T[];
  handleClick: (
    index: number,
    options: T
  ) => React.MouseEventHandler<HTMLButtonElement>;
  OptionsIcon?: React.ComponentType<SvgIconProps>;
}) {
  return ({ index, style }: { index: number; style: any }) => (
    <MenuItem
      key={index}
      component="div"
      style={style}
      className={classes.menuItem}
      onClick={handleClick(index, options[index])}
    >
      {OptionsIcon && (
        <ListItemIcon>
          <OptionsIcon />
        </ListItemIcon>
      )}
      <div className={classes.labelContainer}>{options[index].label}</div>
    </MenuItem>
  );
}

class SelectInput<T extends IOption> extends React.Component<
  IProps<T>,
  IState<T>
> {
  private textInput: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.textInput = React.createRef();

    this.state = {
      anchorEl: undefined,
      selectdIndex: undefined,
      label: this.props.value,
      options: [...this.props.options]
    };
  }

  public render() {
    const { anchorEl } = this.state;
    const {
      inputLabel,
      helperText,
      OptionsIcon,
      noClear,
      classes
    } = this.props;

    return (
      <div ref={this.textInput}>
        <FormControl fullWidth>
          {inputLabel && (
            <InputLabel htmlFor="select-input">{inputLabel}</InputLabel>
          )}
          <Input
            fullWidth
            value={this.state.label}
            onClick={this.handleInputClick}
            onChange={this.handleInputChange}
            endAdornment={
              !noClear && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear Selected"
                    onClick={this.handleClickClearSelected}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
          {this.textInput.current && (
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
              onClose={this.handleClose}
            >
              <VirtualList
                width={this.textInput.current.offsetWidth}
                height={Math.min(this.state.options.length * 40, 300)}
                itemCount={this.state.options.length}
                itemSize={40}
                renderItem={renderer<T>({
                  classes: this.props.classes,
                  options: this.state.options,
                  handleClick: this.handleOptionClick,
                  OptionsIcon
                })}
              />
              {this.state.options.length === 0 ? (
                <Typography
                  color="textSecondary"
                  className={this.props.classes.labelContainer}
                >
                  No items found
                </Typography>
              ) : null}
            </Menu>
          )}
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </div>
    );
  }

  private handleMouseDownPassword = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
  };

  private handleClickClearSelected = () => {
    this.setState({
      options: [...this.props.options],
      label: "",
      anchorEl: undefined
    });
  };

  private handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      options: [...this.props.options],
      anchorEl: event.currentTarget
    });
  };

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      options: this.props.options.filter(({ label }) =>
        label.includes(event.target.value)
      ),
      label: event.target.value
    });
  };

  private handleOptionClick = (index: number, option: T) => () => {
    this.setState({
      selectdIndex: index,
      label: option.label,
      anchorEl: undefined
    });
    this.props.handleChange(option);
  };

  private handleClose = () => {
    this.setState({
      anchorEl: undefined
    });
  };
}

export default withStyles(styles)(SelectInput);
