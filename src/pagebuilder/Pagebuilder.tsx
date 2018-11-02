import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Banner from "content/PitBanner.jpg";

import React, { SFC, ChangeEvent } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import GraphExample from "pagebuilder/LineExample";
import BarExample from "pagebuilder/BarExample";

import AddIcon from "@material-ui/icons/Add";

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
    addButton: {
      position: "fixed",
      bottom: theme.spacing.unit * 3,
      right: theme.spacing.unit * 4
    }
  });

const layout = [
  { i: "a", x: 0, y: 0, w: 3, h: 4 },
  { i: "b", x: 3, y: 0, w: 5, h: 2 },
  { i: "c", x: 8, y: 0, w: 4, h: 1 }
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
            <Paper key="a" elevation={4}>
              <BarExample />
            </Paper>
            <Paper key="b" elevation={4}>
              <GraphExample />
            </Paper>
            <Paper key="c" elevation={4}>
              <img
                draggable={false}
                style={{
                  height: "100%",
                  width: "100%"
                }}
                src={Banner}
              />
            </Paper>
          </ResponsiveGridLayout>
        )}
        {value === 1 && "Dataview Placeholder"}
      </Grid>
    </Grid>
    <Button className={classes.addButton} variant="fab" color="primary">
      <AddIcon />
    </Button>
  </>
);

export default withStyles(styles)(Pagebuilder);
