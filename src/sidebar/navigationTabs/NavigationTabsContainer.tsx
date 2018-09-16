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

import NavigationTabs from "sidebar/navigationTabs/NavigationTabs";

type TabsEnabled = [boolean, boolean, boolean];

interface IOwnProps {
  location: Location;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class NavigationTabsContainer extends Component<Props> {
  public componentDidMount() {
    const {
      location: { pathname }
    } = this.props;

    this.updateActivetab(pathname);
  }

  public componentDidUpdate(prevProps: Props) {
    const {
      location: { pathname }
    } = this.props;
    const {
      location: { pathname: prevPathname }
    } = prevProps;

    if (pathname !== prevPathname) {
      this.updateActivetab(pathname);
    }
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

  private updateActivetab(pathname: string) {
    const { dispatchShowFilters, dispatchShowMyTools } = this.props;

    if (pathname === "/pagebuilder/new") {
      return dispatchShowFilters([false, false, true]);
    }
    if (pathname === "/workbench/new") {
      return dispatchShowMyTools([false, false, false]);
    }
    // By default it sets the tab to myItems with the others disabled.
    // See reducer inital state.
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

const mapStateToProps = ({
  navigationTabsReducer: { selectedTab, tabsEnabled }
}: RootState) => ({
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
