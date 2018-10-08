import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import HelpPageCard from "welcomePage/HelpPageCard";

import linksList from "welcomePage/cardsData";
import IntervalSelectorContainer from "common/intervalSelector/IntervalSelectorContainer";

const styles = createStyles({
  container: {
    padding: 25
  }
});

const onChange = (val: any) => {
  // tslint:disable-next-line:no-console
  console.log(val);
};

const WelcomePage: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <Grid container className={classes.container} spacing={16}>
    <Grid item xs={12}>
      <IntervalSelectorContainer
        value={{ IntervalType: "DATEOP", offset: 0 }}
        onChange={onChange}
      />
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
