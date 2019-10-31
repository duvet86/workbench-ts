import React, { FC } from "react";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

interface IProps {
  onClick: (offset: number) => () => void;
}

const PreviousIntervalButton: FC<IProps> = ({ onClick }) => (
  <InputAdornment position="start">
    <IconButton onClick={onClick(-1)} aria-label="Left">
      {<ArrowLeftIcon />}
    </IconButton>
  </InputAdornment>
);

export default PreviousIntervalButton;
