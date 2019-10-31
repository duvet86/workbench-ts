import React, { ChangeEvent, FC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import { drawerBodyWidth } from "sidebar/SideBar";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

interface IProps extends WithStyles<typeof styles> {
  selectedTab: number;
  visibleTabs: Array<{
    id: number;
    label: string;
  }>;
  handleChange: (event: ChangeEvent<{}>, value: number) => void;
}

const styles = ({ breakpoints, spacing }: Theme) =>
  createStyles({
    tabs: {
      width: drawerBodyWidth
    },
    tabRoot: {
      minWidth: 0,
      maxWidth: "100%"
    },
    // labelContainer: {
    //   [breakpoints.up("md")]: {
    //     paddingLeft: spacing() * 2,
    //     paddingRight: spacing() * 2
    //   }
    // },
    textColorPrimary: {
      color: "black"
    }
  });

const NavigationTabs: FC<IProps> = ({
  classes,
  selectedTab,
  visibleTabs,
  handleChange
}) => (
  <Tabs
    className={classes.tabs}
    value={selectedTab}
    onChange={handleChange}
    indicatorColor="primary"
    textColor="primary"
  >
    {visibleTabs.map(({ id, label }) => (
      <Tab
        key={id}
        label={label}
        classes={{
          root: classes.tabRoot,
          // labelContainer: classes.labelContainer,
          textColorPrimary: classes.textColorPrimary
        }}
      />
    ))}
    />
  </Tabs>
);

export default withStyles(styles)(NavigationTabs);
