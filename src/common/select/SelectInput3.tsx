import React from "react";
import VirtualList from "react-tiny-virtual-list";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Input from "@material-ui/core/Input";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

interface IOption {
  label: string;
}

interface IProps<T extends IOption> extends WithStyles<typeof styles> {
  options: T[];
  onOptionSelect: (option: T) => void;
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
  handleClick
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
}) {
  return ({ index, style }: { index: number; style: any }) => (
    <MenuItem
      key={index}
      component="div"
      style={style}
      className={classes.menuItem}
      onClick={handleClick(index, options[index])}
    >
      <div className={classes.labelContainer}>{options[index].label}</div>
    </MenuItem>
  );
}

class SelectInput<T extends IOption> extends React.Component<
  IProps<T>,
  IState<T>
> {
  public readonly state = {
    anchorEl: undefined,
    selectdIndex: undefined,
    label: "",
    options: [...this.props.options]
  };

  private textInput: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.textInput = React.createRef();
  }

  public render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Input
          fullWidth
          inputRef={this.textInput}
          value={this.state.label}
          onClick={this.handleInputClick}
          onChange={this.handleInputChange}
        />
        {this.textInput.current && (
          <Menu
            disableAutoFocus
            disableAutoFocusItem
            MenuListProps={{
              component: "div",
              disablePadding: true
            }}
            getContentAnchorEl={undefined}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
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
                handleClick: this.handleOptionClick
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
      </div>
    );
  }

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
    this.props.onOptionSelect(option);
  };

  private handleClose = () => {
    this.setState({
      anchorEl: undefined
    });
  };
}

export default withStyles(styles)(SelectInput);
