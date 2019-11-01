import React, { FC } from "react";

import { styled } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

interface IProps {
  initLabel: string;
  handleChangeLabel: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  paper: {
    padding: theme.spacing() * 3
  }
}));

const LabelInput: FC<IProps> = ({ initLabel, handleChangeLabel }) => (
  <StyledPaper>
    <TextField
      fullWidth
      required
      label="Query Label"
      value={initLabel}
      onChange={handleChangeLabel}
    />
  </StyledPaper>
);

export default LabelInput;
