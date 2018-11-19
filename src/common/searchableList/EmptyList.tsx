import React, { SFC } from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { LIST_HEIGHT } from "common/searchableList/SearchableList";

interface IProps extends WithStyles<typeof styles> {
  emptyListLabel?: string;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    labelContainer: {
      padding: unit * 2,
      height: LIST_HEIGHT
    }
  });

const EmptyList: SFC<IProps> = ({ classes, emptyListLabel }) => (
  <Typography color="textSecondary" className={classes.labelContainer}>
    {emptyListLabel != null ? emptyListLabel : "No items found"}
  </Typography>
);

export default withStyles(styles)(EmptyList);
