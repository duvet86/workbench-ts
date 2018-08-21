import React, { ChangeEvent, SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import tabButtons from "sideBar/navigationTabs/tabsData";

interface IProps extends WithStyles<typeof styles> {
  selectedTab: number;
  tabsEnabled: [boolean, boolean, boolean];
  handleChange: (event: ChangeEvent<{}>, value: number) => void;
}

const styles = ({ breakpoints, spacing: { unit } }: Theme) =>
  createStyles({
    tabRoot: {
      minWidth: 0,
      maxWidth: "100%"
    },
    labelContainer: {
      [breakpoints.up("md")]: {
        paddingLeft: unit * 2,
        paddingRight: unit * 2
      }
    },
    textColorPrimary: {
      color: "black"
    }
  });

const NavigationTabs: SFC<IProps> = ({
  classes,
  selectedTab,
  tabsEnabled,
  handleChange
}) => (
  <Tabs
    fullWidth
    value={selectedTab}
    onChange={handleChange}
    indicatorColor="primary"
    textColor="primary"
  >
    {tabButtons
      .filter((_, index) => !tabsEnabled[index])
      .map(({ id, label }) => (
        <Tab
          key={id}
          label={label}
          classes={{
            root: classes.tabRoot,
            labelContainer: classes.labelContainer,
            textColorPrimary: classes.textColorPrimary
          }}
        />
      ))}
    />
  </Tabs>
);

export default withStyles(styles)(NavigationTabs);
