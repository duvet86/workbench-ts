import React, { ChangeEvent, FC } from "react";

import { styled } from "@material-ui/core/styles";

import { IIntervalTypesDtc } from "common/interval/types";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

interface IProps {
  options: IIntervalTypesDtc[];
  value: string;
  onChange: (event: ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing()
}));

const IntervalTypeSelector: FC<IProps> = ({ options, value, onChange }) => (
  <StyledFormControl>
    <InputLabel htmlFor="interval">Interval</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      inputProps={{
        name: "interval"
      }}
    >
      {options.map(({ IntervalType, Label }) => (
        <MenuItem key={IntervalType} value={IntervalType}>
          {Label}
        </MenuItem>
      ))}
    </Select>
  </StyledFormControl>
);

export default IntervalTypeSelector;
