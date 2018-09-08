import React from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    labelContainer: {
      padding: unit * 2
    }
  });

const NoOption: React.SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <Typography color="textSecondary" className={classes.labelContainer}>
    No items found
  </Typography>
);

export default withStyles(styles)(NoOption);
