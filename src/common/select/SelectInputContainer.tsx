import React from "react";

import { Overwrite, StyledComponentProps } from "@material-ui/core";

import Chip from "@material-ui/core/Chip";
import { SelectProps } from "@material-ui/core/Select";
import SelectInput from "common/select/SelectInput";

import CancelIcon from "@material-ui/icons/Cancel";

export interface IOption<T = any> {
  label: string;
  value: T;
}

interface IProps<T> {
  options: Array<IOption<T>>;
  onChange: (option?: IOption<T>) => void;
  initValue?: T | T[];
  isMulti?: boolean;
  OptionsIcon?: React.ComponentType<
    Overwrite<Pick<{}, never>, StyledComponentProps<string>>
  >;
  inputLabel?: string;
  helperText?: string;
  noClear?: boolean;
}

interface IState<T> {
  open: boolean;
  selectedOption: IOption<T> | Array<IOption<T>> | undefined;
  options: Array<IOption<T>>;
}

export default class SelectInputContainer<T> extends React.Component<
  IProps<T>,
  IState<T>
> {
  constructor(props: IProps<T>) {
    super(props);

    if (props.isMulti && props.initValue && !Array.isArray(props.initValue)) {
      throw new Error("Multi select mode accept only arrays as initvalue.");
    }

    const selectedOption =
      props.initValue &&
      this.props.options.find(({ value }) => value === props.initValue);

    this.state = {
      open: false,
      selectedOption,
      options: [...this.props.options]
    };
  }

  public render() {
    const {
      OptionsIcon,
      inputLabel,
      helperText,
      noClear,
      isMulti
    } = this.props;
    const { selectedOption, options, open } = this.state;

    let value: string | string[];
    if (!isMulti && !Array.isArray(selectedOption)) {
      value = (selectedOption && selectedOption.label) || "";
    } else {
      value =
        (selectedOption &&
          (selectedOption as Array<IOption<T>>).map(({ label }) => label)) ||
        [];
    }

    return (
      <SelectInput
        open={open}
        value={value}
        options={options}
        isMulti={isMulti}
        handleOptionClick={this.handleOptionClick}
        handleSearchChange={this.handleSearchChange}
        handleClickClearSelected={this.handleClickClearSelected}
        handleMouseDownPassword={this.handleMouseDownPassword}
        OptionsIcon={OptionsIcon}
        inputLabel={inputLabel}
        helperText={helperText}
        noClear={noClear}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
        renderValue={this.renderValue}
      />
    );
  }

  private handleMouseDownPassword = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
  };

  private handleClickClearSelected = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    this.setState({
      options: [...this.props.options],
      selectedOption: undefined
    });
    this.props.onChange(undefined);
  };

  private handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      options: this.props.options.filter(({ label }) =>
        label.toUpperCase().includes(event.target.value.toUpperCase())
      )
    });
  };

  private handleOptionClick = (option: IOption<T>) => (_: React.MouseEvent) => {
    if (this.props.isMulti) {
      this.setState((prevState: IState<T>) => ({
        selectedOption: (prevState.selectedOption &&
          (prevState.selectedOption as Array<IOption<T>>).concat([option])) || [
          option
        ]
      }));
    } else {
      this.setState({
        open: false,
        selectedOption: option
      });
      this.props.onChange(option);
    }
  };

  private handleOpen = () => {
    this.setState({
      open: true,
      options: [...this.props.options]
    });
  };

  private handleClose = () => {
    this.setState({
      open: false
    });
  };

  private renderValue = (value: SelectProps["value"]) => {
    if (value == null) {
      return null;
    }
    if (this.props.isMulti && Array.isArray(value)) {
      return value.map(v => (
        <Chip key={v as string} label={v} onDelete={this.asd} />
      ));
    }
    return <div>{value}</div>;
  };

  private asd = (event: React.EventHandler<any>) => {
    console.log("asd");
  };
}
