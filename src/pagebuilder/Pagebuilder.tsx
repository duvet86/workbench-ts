import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

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

import GridLayout from "react-grid-layout";

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
      padding: 25,
      height: "100%"
    },
    actionRoot: {
      "&$selected": {
        color: theme.palette.secondary.main
      }
    },
    selected: {}
  });

const layout = [
  { i: "a", x: 0, y: 0, w: 1, h: 2 },
  { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  { i: "c", x: 4, y: 0, w: 1, h: 2 }
];

const Pagebuilder: SFC<IProps> = ({ classes, handleChange, value }) => (
  <>
    <Grid container className={classes.bodyContainer}>
      <Grid item xs={12}>
        {value === 0 && (
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
          >
            <div key="a" style={{ border: "1px solid" }}>
              a
            </div>
            <div key="b" style={{ border: "1px solid" }}>
              b
            </div>
            <div key="c" style={{ border: "1px solid" }}>
              c
            </div>
          </GridLayout>
        )}
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
