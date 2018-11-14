import { Location } from "history";
import React, { ChangeEvent, Component } from "react";
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

interface IOwnProps {
  location: Location;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class NavigationTabsContainer extends Component<Props> {
  public componentDidMount() {
    this.setTabsFromLocation(this.props.location);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      this.setTabsFromLocation(this.props.location);
    }
  }

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
      dispatchShowUserItems,
      dispatchShowFilters,
      dispatchShowTools
    } = this.props;

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

  private setTabsFromLocation({ pathname }: Location) {
    switch (pathname) {
      case "/workbench/new":
        this.props.dispatchShowTools([false, false, false]);
        break;
      case "/pagebuilder/new":
        this.props.dispatchShowFilters([false, false, true]);
        break;
      default:
        this.props.dispatchShowUserItems([false, true, true]);
        break;
    }
  }
}

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
