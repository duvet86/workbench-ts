import React, { FC } from "react";

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

const styles = ({ spacing }: Theme) =>
  createStyles({
    labelContainer: {
      padding: spacing() * 2,
      height: LIST_HEIGHT
    }
  });

const EmptyList: FC<IProps> = ({ classes, emptyListLabel }) => (
  <Typography color="textSecondary" className={classes.labelContainer}>
    {emptyListLabel != null ? emptyListLabel : "No items found"}
  </Typography>
);

export default withStyles(styles)(EmptyList);
