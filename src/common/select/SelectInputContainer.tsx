import React from "react";

import { Overwrite, StyledComponentProps } from "@material-ui/core";

import SelectInput from "common/select/SelectInput";

export interface IOption<T = any> {
  label: string;
  value: T;
}

interface IProps<T> {
  initValue?: T;
  options: Array<IOption<T>>;
  onChange: (option?: IOption<T>) => void;
  OptionsIcon?: React.ComponentType<
    Overwrite<Pick<{}, never>, StyledComponentProps<string>>
  >;
  inputLabel?: string;
  helperText?: string;
  noClear?: boolean;
}

interface IState<T> {
  open: boolean;
  selectedValue: string;
  options: Array<IOption<T>>;
}

export default class SelectInputContainer<T> extends React.Component<
  IProps<T>,
  IState<T>
> {
  constructor(props: IProps<T>) {
    super(props);

    const selectedOption =
      props.initValue &&
      this.props.options.find(({ value }) => value === props.initValue);

    this.state = {
      open: false,
      selectedValue: (selectedOption && selectedOption.label) || "",
      options: [...this.props.options]
    };
  }

  public render() {
    const { OptionsIcon, inputLabel, helperText, noClear } = this.props;
    const { selectedValue, options, open } = this.state;

    return (
      <SelectInput
        open={open}
        selectedValue={selectedValue}
        options={options}
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
      selectedValue: ""
    });
    this.props.onChange(undefined);
  };

  private handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      options: this.props.options.filter(({ label }) =>
        label.toUpperCase().includes(event.target.value.toUpperCase())
      ),
      selectedValue: event.target.value
    });
  };

  private handleOptionClick = (option: IOption<T>) => (_: React.MouseEvent) => {
    this.setState({
      open: false,
      selectedValue: option.label
    });
    this.props.onChange(option);
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

  private renderValue = (value: string) => {
    if (value == null) {
      return null;
    }
    return <div>{value}</div>;
  };
}
