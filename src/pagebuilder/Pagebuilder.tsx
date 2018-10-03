import React, { SFC, ChangeEvent } from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import { DashboardIcon, DataViewIcon } from "common/icons";

interface IProps extends WithStyles<typeof styles> {
  handleChange: (_: ChangeEvent<{}>, value: number) => void;
  value: number;
}

const styles = (theme: Theme) =>
  createStyles({
    bottomNavContainer: {
      position: "fixed",
      bottom: 0
    },
    bodyContainer: {
      padding: 25
    },
    actionRoot: {
      "&$selected": {
        color: theme.palette.secondary.main
      }
    },
    selected: {}
  });

const Pagebuilder: SFC<IProps> = ({ classes, handleChange, value }) => (
  <>
    <Grid container className={classes.bodyContainer}>
      <Grid item xs={12}>
        {value === 0 && "Pagebuilder Placeholder"}
        {value === 1 && "Dataview Placeholder"}
      </Grid>
    </Grid>
    <div className={classes.bottomNavContainer}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction
          classes={{
            root: classes.actionRoot,
            selected: classes.selected
          }}
          label="Dataview"
          icon={<DashboardIcon />}
        />
        <BottomNavigationAction
          classes={{
            root: classes.actionRoot,
            selected: classes.selected
          }}
          label="Workbench"
          icon={<DataViewIcon />}
        />
      </BottomNavigation>
    </div>
  </>
);

export default withStyles(styles)(Pagebuilder);
