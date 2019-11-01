import React from "react";

import { styled } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";

interface IProps {
  label: string;
  handleDeleteChip: (optionLabel: string) => () => void;
}

const StyledChip = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing() / 2
}));

const MultiSelectValue: React.FC<IProps> = ({ label, handleDeleteChip }) => (
  <StyledChip label={label} onDelete={handleDeleteChip(label)} />
);

export default MultiSelectValue;
