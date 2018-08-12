import { Location } from "history";
import PropTypes from "prop-types";
import React, { SFC } from "react";
import { connect } from "react-redux";

import MyItemsListContainer from "sideBar/myItems/MyItemsListContainer";
import OperatorsListContainer from "sideBar/operators/OperatorsListContainer";
import SideBarBody from "sideBar/SideBarBody";

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

SideBarBodyContainer.propTypes = {
  selectedTab: PropTypes.number.isRequired
};

const mapStateToProps = ({
  navigationTabsReducer: { selectedTab }
}: IStoreState) => ({
  selectedTab
});

export default connect(mapStateToProps)(SideBarBodyContainer);
