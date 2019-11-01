import React, { FC } from "react";

import { styled } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing() * 2
}));

const NoOption: FC = () => (
  <StyledTypography color="textSecondary">No items found</StyledTypography>
);

export default NoOption;
