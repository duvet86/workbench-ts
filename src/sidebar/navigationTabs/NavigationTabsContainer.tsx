import { Location } from "history";
import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import {
  showFilters,
  showMyItems,
  showTools,
  TabsAction
} from "sidebar/navigationTabs/actions";
import { getVisibleTabs } from "sidebar/selector";

import NavigationTabs from "sidebar/navigationTabs/NavigationTabs";

type TabsEnabled = [boolean, boolean, boolean];

interface IOwnProps {
  location: Location;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class NavigationTabsContainer extends Component<Props> {
  public render() {
    const { selectedTab, visibleTabs } = this.props;
    if (visibleTabs.length === 1) {
      return null;
    }

    return (
      <NavigationTabs
        selectedTab={selectedTab}
        visibleTabs={visibleTabs}
        handleChange={this.handleChange}
      />
    );
  }

  private handleChange = (_: ChangeEvent<{}>, value: number) => {
    const {
      dispatchShowMyItems,
      dispatchShowFilters,
      dispatchShowMyTools
    } = this.props;

    switch (value) {
      case 1:
        dispatchShowFilters();
        break;
      case 2:
        dispatchShowMyTools();
        break;
      default:
        dispatchShowMyItems();
        break;
    }
  };
}

const mapStateToProps = (state: RootState) => ({
  selectedTab: state.navigationTabs.selectedTab,
  visibleTabs: getVisibleTabs(state)
});

const mapDispatchToProps = (dispatch: Dispatch<TabsAction>) => ({
  dispatchShowMyItems: (tabsEnabled?: TabsEnabled) => {
    dispatch(showMyItems(tabsEnabled));
  },
  dispatchShowFilters: (tabsEnabled?: TabsEnabled) => {
    dispatch(showFilters(tabsEnabled));
  },
  dispatchShowMyTools: (tabsEnabled?: TabsEnabled) => {
    dispatch(showTools(tabsEnabled));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationTabsContainer);
