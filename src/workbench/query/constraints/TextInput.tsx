import React, { FC } from "react";

import { styled } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

interface IProps {
  displayValue: string;
  inputType: string;
  handledUpdateQueryConstraintValues: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing()
}));

const TextInput: FC<IProps> = ({
  inputType,
  displayValue,
  handledUpdateQueryConstraintValues
}) => (
  <StyledFormControl>
    <Input
      autoFocus
      type={inputType}
      value={displayValue}
      onChange={handledUpdateQueryConstraintValues}
    />
  </StyledFormControl>
);

export default TextInput;
