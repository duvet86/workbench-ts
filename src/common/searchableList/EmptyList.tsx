import React, { FC } from "react";

import { styled } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { LIST_HEIGHT } from "common/searchableList/SearchableList";

interface IProps {
  emptyListLabel?: string;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing() * 2,
  height: LIST_HEIGHT
}));

const EmptyList: FC<IProps> = ({ emptyListLabel }) => (
  <StyledTypography color="textSecondary">
    {emptyListLabel != null ? emptyListLabel : "No items found"}
  </StyledTypography>
);

export default EmptyList;
