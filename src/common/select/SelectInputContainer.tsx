import React from "react";

import { getMultiSelectValue } from "common/select/selectors";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { SelectProps } from "@material-ui/core/Select";
import SelectInput from "common/select/SelectInput";
import MultiSelectValue from "common/select/MultiSelectValue";

type onChangeSingle<T> = (option?: IOption<T>) => void;
type onChangeMulti<T> = (option?: Array<IOption<T>>) => void;

export const enum SelectEnum {
  AllLabel = "All...",
  SelectAll = "SelectAll",
  SelectNone = "SelectNone"
}

export interface IOption<T = any> {
  label: string;
  value: T;
}

export interface IProps<T> {
  options: Array<IOption<T>>;
  onChange: onChangeSingle<T> | onChangeMulti<T>;
  initValue?: T | T[];
  isMulti?: boolean;
  OptionsIcon?: React.ComponentType<SvgIconProps>;
  inputLabel?: string;
  helperText?: string;
  noClear?: boolean;
  reset?: boolean;
  required?: boolean;
}

export interface IState<T> {
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

    if (props.isMulti && Array.isArray(props.initValue)) {
      const initSelectedOptions = props.initValue || [];

      let selectedOptions: Array<IOption<T>>;
      // All the  options have been selected, skip options existence for performcance reasons.
      if (initSelectedOptions.length === this.props.options.length) {
        selectedOptions = [...this.props.options];
      } else {
        selectedOptions = this.props.options.filter(opt =>
          initSelectedOptions.includes(opt.value)
        );
      }

      this.state = {
        open: false,
        selectedOption: selectedOptions,
        options: [...this.props.options]
      };
    } else {
      const selectedOption =
        props.initValue &&
        this.props.options.find(({ value }) => value === props.initValue);

      this.state = {
        open: false,
        selectedOption,
        options: [...this.props.options]
      };
    }
  }

  public render() {
    const {
      OptionsIcon,
      inputLabel,
      helperText,
      noClear,
      isMulti,
      required
    } = this.props;
    const { selectedOption, options, open } = this.state;

    let value: string | string[];
    if (!isMulti && !Array.isArray(selectedOption)) {
      value = (selectedOption && selectedOption.label) || "";
    } else {
      const selectedOptions =
        (selectedOption && (selectedOption as Array<IOption<T>>)) || [];
      if (selectedOptions.length === options.length) {
        value = [SelectEnum.AllLabel];
      } else {
        // Use a memoized function for performance reasons.
        value = getMultiSelectValue(this.state);
      }
    }

    return (
      <SelectInput
        open={open}
        value={value}
        options={options}
        required={required}
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
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    _: React.ReactNode
  ) => {
    if ((event.target.value as string).includes(SelectEnum.SelectAll)) {
      this.setState({
        open: false,
        selectedOption: this.props.options
      });
      (this.props.onChange as onChangeMulti<T>)(this.props.options);
    } else if ((event.target.value as string).includes(SelectEnum.SelectNone)) {
      this.setState({
        open: false,
        selectedOption: []
      });
      (this.props.onChange as onChangeMulti<T>)(undefined);
    }
  };

  private handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  private handleClickClearSelected = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    this.setState({
      options: [...this.props.options],
      selectedOption: undefined
    });
    (this.props.onChange as onChangeSingle<T>)(undefined);
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

        // Careful here: setState is async.
        (this.props.onChange as onChangeMulti<T>)(newSelectedOptions);

        return {
          selectedOption: newSelectedOptions
        };
      });
    } else {
      this.setState({
        open: false,
        selectedOption: (!this.props.reset && option) || undefined
      });
      (this.props.onChange as onChangeSingle<T>)(option);
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
      return optionLabel.map((label, i) => (
        <MultiSelectValue
          key={i}
          label={label as string}
          handleDeleteChip={this.handleDeleteChip}
        />
      ));
    }
    return <div>{optionLabel as string}</div>;
  };

  private handleDeleteChip = (optionLabel: string) => () => {
    if (optionLabel === SelectEnum.AllLabel) {
      this.setState({
        open: false,
        selectedOption: []
      });

      (this.props.onChange as onChangeMulti<T>)(undefined);
    } else {
      this.setState((prevState: IState<T>) => {
        const prevOptions =
          (prevState.selectedOption &&
            (prevState.selectedOption as Array<IOption<T>>)) ||
          [];

        const newOptions = prevOptions.filter(
          ({ label }) => label !== optionLabel
        );

        // Careful here: setState is async.
        (this.props.onChange as onChangeMulti<T>)(newOptions);

        return {
          selectedOption: newOptions
        };
      });
    }
  };
}
