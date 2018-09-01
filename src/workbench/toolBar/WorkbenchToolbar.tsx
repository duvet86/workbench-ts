import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { toolbarData } from "workbench/utils";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      right: 0,
      marginRight: 10,
      marginTop: 10,
      zIndex: 1
    },
    toolBar: {
      minHeight: 0
    },
    leftIcon: {
      fill: "#bdbdbd",
      marginRight: spacing.unit
    }
  });

const WorkbenchToolbar: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <Paper className={classes.root}>
    <Toolbar className={classes.toolBar} disableGutters>
      {toolbarData.map(({ id, label, IconComponent }) => (
        <Button key={id} size="small">
          <IconComponent className={classes.leftIcon} />
          {label}
        </Button>
      ))}
    </Toolbar>
  </Paper>
);

export default withStyles(styles)(WorkbenchToolbar);
