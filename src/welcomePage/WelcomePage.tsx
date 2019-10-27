import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import HelpPageCard from "welcomePage/HelpPageCard";

import linksList from "common/linksList";

const styles = createStyles({
  container: {
    padding: 25
  }
});

const WelcomePage: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <Grid container className={classes.container} spacing={6}>
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
  </Grid>
);

export default withStyles(styles)(WelcomePage);
