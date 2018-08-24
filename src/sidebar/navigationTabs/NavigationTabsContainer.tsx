import { Location } from "history";
import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  showFilters,
  showMyItems,
  showTools,
  TabsAction
} from "sidebar/navigationTabs/actions";
import NavigationTabs from "sidebar/navigationTabs/NavigationTabs";

type TabsEnabled = [boolean, boolean, boolean];

interface IDispatchProps {
  dispatchShowMyItems: (tabsEnabled?: TabsEnabled) => void;
  dispatchShowFilters: (tabsEnabled?: TabsEnabled) => void;
  dispatchShowMyTools: (tabsEnabled?: TabsEnabled) => void;
}

interface IStateProps {
  location: Location;
  selectedTab: number;
  tabsEnabled: TabsEnabled;
}

type Props = IStateProps & IDispatchProps;

interface IStoreState {
  navigationTabsReducer: IStateProps;
}

class NavigationTabsContainer extends Component<Props> {
  public componentDidMount() {
    const {
      location: { pathname },
      dispatchShowFilters,
      dispatchShowMyTools
    } = this.props;

    if (pathname.includes("/pagebuilder/")) {
      return dispatchShowFilters([false, false, true]);
    }
    if (pathname.includes("/workbench/")) {
      return dispatchShowMyTools([false, false, false]);
    }
    // By default it sets the tab to myItems with the others disabled.
    // See reducer inital state.
  }

  public render() {
    const { selectedTab, tabsEnabled } = this.props;

    return (
      <NavigationTabs
        selectedTab={selectedTab}
        tabsEnabled={tabsEnabled}
        handleChange={this.handleChange}
      />
    );
  }

  private handleChange = (_: ChangeEvent, value: number) => {
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

const mapStateToProps = ({
  navigationTabsReducer: { selectedTab, tabsEnabled }
}: IStoreState) => ({
  selectedTab,
  tabsEnabled
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
