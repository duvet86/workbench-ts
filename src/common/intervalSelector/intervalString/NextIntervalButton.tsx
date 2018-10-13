import React, { SFC } from "react";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

interface IProps {
  onClick: (offset: number) => () => void;
}

const PreviousIntervalButton: SFC<IProps> = ({ onClick }) => (
  <InputAdornment position="end">
    <IconButton onClick={onClick(1)} aria-label="Right">
      {<ArrowRightIcon />}
    </IconButton>
  </InputAdornment>
);

export default PreviousIntervalButton;
