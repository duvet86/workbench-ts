import React from "react";

import { Overwrite, StyledComponentProps } from "@material-ui/core";

import SelectInput from "common/select/SelectInput";

export interface IOption<T = any> {
  label: string;
  value: T;
}

interface IProps<T> {
  value?: T;
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
  label: string;
  options: Array<IOption<T>>;
}

export default class SelectInputContainer<T> extends React.Component<
  IProps<T>,
  IState<T>
> {
  constructor(props: IProps<T>) {
    super(props);

    const selectedOption =
      props.value &&
      this.props.options.find(({ value }) => value === props.value);

    this.state = {
      open: false,
      label: (selectedOption && selectedOption.label) || "",
      options: [...this.props.options]
    };
  }

  public render() {
    const { OptionsIcon, inputLabel, helperText, noClear } = this.props;
    const { label, options, open } = this.state;

    return (
      <SelectInput
        open={open}
        label={label}
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
        handleChange={this.handleSelectChange}
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
      label: ""
    });
    this.props.onChange(undefined);
  };

  private handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      options: this.props.options.filter(({ label }) =>
        label.toUpperCase().includes(event.target.value.toUpperCase())
      ),
      label: event.target.value
    });
  };

  private handleOptionClick = (option: IOption<T>) => (_: React.MouseEvent) => {
    this.setState({
      label: option.label,
      open: false
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

  private handleSelectChange = (event: any) => {
    this.setState({
      label: event.target.value
    });
  };
}
