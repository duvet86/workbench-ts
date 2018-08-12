import { Location } from "history";
import PropTypes from "prop-types";
import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  showFilters,
  showMyItems,
  showTools,
  TabsAction
} from "sideBar/navigationTabs/actions";
import NavigationTabs from "sideBar/navigationTabs/NavigationTabs";

type TabsState = [boolean, boolean, boolean];

interface IDispatchProps {
  dispatchShowMyItems: (tabsState?: TabsState) => void;
  dispatchShowFilters: (tabsState?: TabsState) => void;
  dispatchShowMyTools: (tabsState?: TabsState) => void;
}

interface IStateProps {
  location: Location;
  selectedTab: number;
  tabsState: TabsState;
}

type Props = IStateProps & IDispatchProps;

interface IStoreState {
  navigationTabsReducer: IStateProps;
}

class NavigationTabsContainer extends Component<Props> {
  public static propTypes = {
    location: PropTypes.object.isRequired,
    selectedTab: PropTypes.number.isRequired,
    tabsState: PropTypes.array.isRequired,
    dispatchShowMyItems: PropTypes.func.isRequired,
    dispatchShowFilters: PropTypes.func.isRequired,
    dispatchShowMyTools: PropTypes.func.isRequired
  };

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
    const { selectedTab, tabsState } = this.props;

    return (
      <NavigationTabs
        selectedTab={selectedTab}
        tabsState={tabsState}
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

const mapStateToProps = ({
  navigationTabsReducer: { selectedTab, tabsState }
}: IStoreState) => ({
  selectedTab,
  tabsState
});

const mapDispatchToProps = (dispatch: Dispatch<TabsAction>) => ({
  dispatchShowMyItems: (tabsState?: TabsState) => {
    dispatch(showMyItems(tabsState));
  },
  dispatchShowFilters: (tabsState?: TabsState) => {
    dispatch(showFilters(tabsState));
  },
  dispatchShowMyTools: (tabsState?: TabsState) => {
    dispatch(showTools(tabsState));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationTabsContainer);
