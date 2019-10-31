import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import {
  showFilters,
  showUserItems,
  showTools,
  TabsAction
} from "sidebar/navigationTabs/actions";
import { getVisibleTabs } from "sidebar/selector";

import NavigationTabs from "sidebar/navigationTabs/NavigationTabs";

type TabsEnabled = [boolean, boolean, boolean];

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const NavigationTabsContainer: FC<Props> = ({
  dispatchShowTools,
  dispatchShowFilters,
  dispatchShowUserItems,
  selectedTab,
  visibleTabs
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/workbench/new") {
      dispatchShowTools([false, false, false]);
    } else if (pathname === "/pagebuilder/new") {
      dispatchShowFilters([false, false, true]);
    } else if (
      pathname.includes("/pagebuilder") ||
      pathname.includes("/workbench")
    ) {
      dispatchShowUserItems([false, false, false]);
    } else {
      dispatchShowUserItems([false, true, true]);
    }
  }, [pathname, dispatchShowTools, dispatchShowFilters, dispatchShowUserItems]);

  const handleChange = (_: React.ChangeEvent<{}>, value: number) => {
    switch (value) {
      case 1:
        dispatchShowFilters();
        break;
      case 2:
        dispatchShowTools();
        break;
      default:
        dispatchShowUserItems();
        break;
    }
  };

  return (
    <NavigationTabs
      selectedTab={selectedTab}
      visibleTabs={visibleTabs}
      handleChange={handleChange}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  selectedTab: state.navigationTabs.selectedTab,
  visibleTabs: getVisibleTabs(state)
});

const mapDispatchToProps = (dispatch: Dispatch<TabsAction>) => ({
  dispatchShowUserItems: (tabsEnabled?: TabsEnabled) => {
    dispatch(showUserItems(tabsEnabled));
  },
  dispatchShowFilters: (tabsEnabled?: TabsEnabled) => {
    dispatch(showFilters(tabsEnabled));
  },
  dispatchShowTools: (tabsEnabled?: TabsEnabled) => {
    dispatch(showTools(tabsEnabled));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationTabsContainer);
