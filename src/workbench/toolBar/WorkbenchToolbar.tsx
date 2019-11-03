import React, { FC, forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

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

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const newWorkbenchLink = forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "innerRef" | "to">
>(function NewWorkbenchLink(props, ref) {
  return <Link to="/workbench/new" innerRef={ref} {...props} />;
});

const WorkbenchToolbar: FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.toolBar} disableGutters>
        {toolbarData.map(({ label, IconComponent }, i) => (
          <Button key={i} size="small" component={newWorkbenchLink}>
            <IconComponent className={classes.leftIcon} />
            {label}
          </Button>
        ))}
      </Toolbar>
    </Paper>
  );
};

export default WorkbenchToolbar;
