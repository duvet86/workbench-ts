import React, { FC } from "react";

import { styled } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import HelpPageCard from "welcomePage/HelpPageCard";

import linksList from "common/linksList";

const StyledGrid = styled(Grid)({
  padding: 25
});

const WelcomePage: FC = () => (
  <StyledGrid container spacing={6}>
    <Grid item xs={12}>
      <Typography variant="h5" gutterBottom>
        Welcome
      </Typography>
    </Grid>
    {linksList.map(({ id, ...rest }) => (
      <Grid item md={4} xs={12} key={id}>
        <HelpPageCard {...rest} />
      </Grid>
    ))}
  </StyledGrid>
);

export default WelcomePage;
