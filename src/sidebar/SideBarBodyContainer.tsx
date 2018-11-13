import React, { SFC } from "react";
import { connect } from "react-redux";
import { Location } from "history";

import { RootState } from "rootReducer";

import FolderTreeContainer from "sidebar/userItems/FolderTreeContainer";
import OperatorsListContainer from "sidebar/operators/OperatorsListContainer";
import Filters from "sidebar/filters/Filters";
import SideBarBody from "sidebar/SideBarBody";

interface IOwnProps {
  location: Location;
}

type Props = ReturnType<typeof mapStateToProps> & IOwnProps;

const SideBarBodyContainer: SFC<Props> = ({ selectedTab, ...props }) => {
  let component: JSX.Element;
  switch (selectedTab) {
    case 1:
      component = <Filters />;
      break;
    case 2:
      component = <OperatorsListContainer {...props} />;
      break;
    default:
      component = <FolderTreeContainer {...props} />;
      break;
  }
  const renderer = () => component;

  return <SideBarBody tabRenderer={renderer} />;
};

const mapStateToProps = ({ navigationTabs: { selectedTab } }: RootState) => ({
  selectedTab
});

export default connect(mapStateToProps)(SideBarBodyContainer);
