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

import DashboardIcon from "@material-ui/icons/Dashboard";
import DataViewIcon from "@material-ui/icons/VerticalSplit";

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
    }
  });

const Pagebuilder: SFC<IProps> = ({ classes, handleChange, value }) => (
  <>
    <Grid container className={classes.bodyContainer}>
      <Grid item xs={12}>
        {value === 0 && "Item One"}
        {value === 1 && "Item Two"}
      </Grid>
    </Grid>
    <div className={classes.bottomNavContainer}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Dataview" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Favorites" icon={<DataViewIcon />} />
      </BottomNavigation>
    </div>
  </>
);

export default withStyles(styles)(Pagebuilder);
