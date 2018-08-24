import React, { SFC } from "react";
import { connect } from "react-redux";
import { Location } from "history";

import MyItemsListContainer from "sidebar/myItems/MyItemsListContainer";
import OperatorsListContainer from "sidebar/operators/OperatorsListContainer";
import SideBarBody from "sidebar/SideBarBody";

interface IStateProps {
  selectedTab: 1 | 2 | 3;
  location: Location;
}

interface IStoreState {
  navigationTabsReducer: IStateProps;
}

const SideBarBodyContainer: SFC<IStateProps> = ({ selectedTab, ...props }) => {
  let component: JSX.Element;
  switch (selectedTab) {
    case 1:
      component = <div>Filters</div>;
      break;
    case 2:
      component = <OperatorsListContainer {...props} />;
      break;
    default:
      component = <MyItemsListContainer {...props} />;
      break;
  }
  const renderer = () => component;

  return <SideBarBody tabRenderer={renderer} />;
};

const mapStateToProps = ({
  navigationTabsReducer: { selectedTab }
}: IStoreState) => ({
  selectedTab
});

export default connect(mapStateToProps)(SideBarBodyContainer);
