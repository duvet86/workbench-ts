import React, { ChangeEvent, FC } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { drawerBodyWidth } from "sidebar/SideBar";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

interface IProps {
  selectedTab: number;
  visibleTabs: Array<{
    id: number;
    label: string;
  }>;
  handleChange: (event: ChangeEvent<{}>, value: number) => void;
}

const useStyles = makeStyles(({ breakpoints, spacing }: Theme) => ({
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
}));

const NavigationTabs: FC<IProps> = ({
  selectedTab,
  visibleTabs,
  handleChange
}) => {
  const classes = useStyles();

  return (
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
};

export default NavigationTabs;
