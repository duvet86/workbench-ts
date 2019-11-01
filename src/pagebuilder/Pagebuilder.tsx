import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Banner from "pagebuilder/PitBanner.jpg";

import React, { FC, ChangeEvent } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";

import GraphExample from "pagebuilder/LineExample";
import BarExample from "pagebuilder/BarExample";
import AddComponentButtonContainer from "pagebuilder/AddComponentButtonContainer";
import MenuEntry from "pagebuilder/MenuEntry";

import { DashboardIcon } from "common/icons";

interface IProps {
  handleChange: (_: ChangeEvent<{}>, value: number) => void;
  value: number;
}

const useStyles = makeStyles({
  mainContainer: {
    height: "100%",
    backgroundColor: "#eee",
    position: "relative"
  },
  canvasContainer: {
    overflow: "auto",
    marginTop: 69
  },
  tabsContainer: {
    position: "absolute",
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  icon: {
    margin: 10
  },
  tabsRoot: {
    minHeight: 32
  }
});

const layout = [
  { i: "a", x: 0, y: 0, w: 3, h: 4 },
  { i: "b", x: 3, y: 0, w: 5, h: 2 },
  { i: "c", x: 8, y: 0, w: 4, h: 1 }
];

const ResponsiveGridLayout = WidthProvider(Responsive);

const Pagebuilder: FC<IProps> = ({ handleChange, value }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.mainContainer}>
      <Paper square={true} className={classes.tabsContainer}>
        <DashboardIcon
          className={classes.icon}
          fontSize="large"
          color="secondary"
        />
        <div style={{ width: "100%" }}>
          <TextField value="Untitled Page" />
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Toolbar disableGutters className={classes.tabsRoot}>
              <MenuEntry label="File" />
              <MenuEntry label="Edit" />
              <MenuEntry label="Tools" />
            </Toolbar>
            <Tabs
              value={value}
              onChange={handleChange}
              classes={{ root: classes.tabsRoot }}
            >
              <Tab classes={{ root: classes.tabsRoot }} label="Edit" />
              <Tab classes={{ root: classes.tabsRoot }} label="Workbench" />
              <Tab classes={{ root: classes.tabsRoot }} label="Preview" />
            </Tabs>
          </div>
        </div>
      </Paper>
      <Grid item xs={12} className={classes.canvasContainer}>
        {value === 0 && (
          <ResponsiveGridLayout
            measureBeforeMount
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
                alt=""
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
      <AddComponentButtonContainer />
    </Grid>
  );
};

export default Pagebuilder;
