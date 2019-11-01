import React, { FC } from "react";
import { Link } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Button, { ButtonProps } from "@material-ui/core/Button";

import { toolbarData } from "workbench/utils";

const useStyles = makeStyles(({ spacing }: Theme) => ({
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
    marginRight: spacing()
  }
}));

const newWorkbenchLink = ({ className, children }: ButtonProps) => (
  <Link className={className} to="/workbench/new">
    {children}
  </Link>
);

const WorkbenchToolbar: FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.toolBar} disableGutters>
        {toolbarData.map(({ id, label, IconComponent }) => (
          <Button key={id} size="small" component={newWorkbenchLink}>
            <IconComponent className={classes.leftIcon} />
            {label}
          </Button>
        ))}
      </Toolbar>
    </Paper>
  );
};

export default WorkbenchToolbar;
