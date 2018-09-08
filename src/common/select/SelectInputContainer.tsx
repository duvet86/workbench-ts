import React from "react";

import { Overwrite, StyledComponentProps } from "@material-ui/core";

import SelectInput from "common/select/SelectInput";

export interface IOption {
  label: string;
  value: string;
}

interface IProps {
  value: string;
  options: IOption[];
  handleChange: (option: IOption) => void;
  OptionsIcon?: React.ComponentType<
    Overwrite<Pick<{}, never>, StyledComponentProps<string>>
  >;
  inputLabel?: string;
  helperText?: string;
  noClear?: boolean;
}

interface IState {
  anchorEl?: HTMLElement;
  label: string;
  options: IOption[];
}

export default class SelectInputContainer extends React.Component<
  IProps,
  IState
> {
  private containerRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: IProps) {
    super(props);

    const selectedOption = this.props.options.find(
      ({ value }) => value === props.value
    );

    this.state = {
      anchorEl: undefined,
      label: (selectedOption && selectedOption.label) || "",
      options: [...this.props.options]
    };
  }

  public render() {
    const { OptionsIcon, inputLabel, helperText, noClear } = this.props;
    const { anchorEl, label, options } = this.state;

    return (
      <SelectInput
        label={label}
        containerRef={this.containerRef}
        anchorEl={anchorEl}
        options={options}
        handleOptionClick={this.handleOptionClick}
        handleInputClick={this.handleInputClick}
        handleInputChange={this.handleInputChange}
        handleClickClearSelected={this.handleClickClearSelected}
        handleMouseDownPassword={this.handleMouseDownPassword}
        handleClose={this.handleClose}
        OptionsIcon={OptionsIcon}
        inputLabel={inputLabel}
        helperText={helperText}
        noClear={noClear}
      />
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
        label.toUpperCase().includes(event.target.value.toUpperCase())
      ),
      label: event.target.value
    });
  };

  private handleOptionClick = (option: IOption) => (_: React.MouseEvent) => {
    this.setState({
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
