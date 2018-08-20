import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

const styles = createStyles({
  container: {
    padding: 25
  }
});

const Pagebuilder: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <Grid container className={classes.container}>
    <Grid item xs={12}>
      Workbench
    </Grid>
  </Grid>
);

export default withStyles(styles)(Pagebuilder);
