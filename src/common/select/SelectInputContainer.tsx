import React from "react";

import { Overwrite, StyledComponentProps } from "@material-ui/core";

import Chip from "@material-ui/core/Chip";
import { SelectProps } from "@material-ui/core/Select";
import SelectInput from "common/select/SelectInput";

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
      const selectedOptions =
        (selectedOption && (selectedOption as Array<IOption<T>>)) || [];
      if (selectedOptions.length > 15) {
        value = ["All..."];
      } else {
        value = selectedOptions.map(({ label }) => label);
      }
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
        handleSelectAllNone={this.handleSelectAllNone}
      />
    );
  }

  private handleSelectAllNone = (
    event: React.ChangeEvent<HTMLSelectElement>,
    _: React.ReactNode
  ) => {
    if (event.target.value.includes("SELECT_ALL")) {
      this.setState({
        open: false,
        selectedOption: this.props.options
      });
    } else if (event.target.value.includes("SELECT_NONE")) {
      this.setState({
        open: false,
        selectedOption: []
      });
    }
  };

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
      this.setState((prevState: IState<T>) => {
        const prevSelectedOptions =
          (prevState.selectedOption &&
            (prevState.selectedOption as Array<IOption<T>>)) ||
          [];

        const newSelectedOptions = [...prevSelectedOptions];
        const chipToDelete = newSelectedOptions.indexOf(option);
        if (chipToDelete !== -1) {
          return {
            selectedOption: newSelectedOptions.splice(chipToDelete, 1)
          };
        }

        newSelectedOptions.push(option);
        return {
          selectedOption: newSelectedOptions
        };
      });
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

  private renderValue = (optionLabel: SelectProps["value"]) => {
    if (optionLabel == null) {
      return null;
    }
    if (this.props.isMulti && Array.isArray(optionLabel)) {
      return optionLabel.map(label => (
        <Chip
          key={label as string}
          label={label}
          onDelete={this.handleDeleteChip(label as string)}
          style={{ marginLeft: 4 }}
        />
      ));
    }
    return <div>{optionLabel}</div>;
  };

  private handleDeleteChip = (optionLabel: string) => () => {
    if (optionLabel === "All...") {
      this.setState({
        open: false,
        selectedOption: []
      });
    }

    this.setState((prevState: IState<T>) => {
      const prevOptions =
        (prevState.selectedOption &&
          (prevState.selectedOption as Array<IOption<T>>)) ||
        [];

      return {
        selectedOption: prevOptions.filter(({ label }) => label !== optionLabel)
      };
    });
  };
}
