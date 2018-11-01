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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { Responsive, WidthProvider } from "react-grid-layout";

interface IProps extends WithStyles<typeof styles> {
  handleChange: (_: ChangeEvent<{}>, value: number) => void;
  value: number;
}

const styles = (theme: Theme) =>
  createStyles({
    mainContainer: {
      height: "100%"
    },
    canvasContainer: {
      overflow: "auto",
      marginBottom: 56
    },
    actionRoot: {
      "&$selected": {
        color: theme.palette.secondary.main
      }
    },
    selected: {},
    bottomNavContainer: {
      position: "fixed",
      bottom: 0
    }
  });

const layout = [
  { i: "a", x: 0, y: 0, w: 1, h: 2 },
  { i: "b", x: 1, y: 0, w: 3, h: 2 },
  { i: "c", x: 4, y: 0, w: 1, h: 2 }
];

const ResponsiveGridLayout = WidthProvider(Responsive);

const Pagebuilder: SFC<IProps> = ({ classes, handleChange, value }) => (
  <>
    <Tabs centered value={value} onChange={handleChange}>
      <Tab label="Edit" />
      <Tab label="Workbench" />
      <Tab label="Preview" />
    </Tabs>
    <Grid container className={classes.mainContainer}>
      <Grid item xs={12} className={classes.canvasContainer}>
        {value === 0 && (
          <ResponsiveGridLayout
            measureBeforeMount={true}
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          >
            <div key="a" style={{ border: "1px solid" }}>
              1
            </div>
            <div key="b" style={{ border: "1px solid" }}>
              2
            </div>
            <div key="c" style={{ border: "1px solid" }}>
              3
            </div>
          </ResponsiveGridLayout>
        )}
        {value === 1 && "Dataview Placeholder"}
      </Grid>
    </Grid>
  </>
);

export default withStyles(styles)(Pagebuilder);
