import React, { ChangeEvent, FC } from "react";

import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles({
  tabs: {
    width: 312
  },
  tabRoot: {
    minWidth: 0,
    maxWidth: "100%",
    flexGrow: 1
  },
  textColorPrimary: {
    color: "black"
  }
});

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
            textColorPrimary: classes.textColorPrimary
          }}
        />
      ))}
      />
    </Tabs>
  );
};

export default NavigationTabs;
