import React, { FC } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";

import FolderTreeContainer from "sidebar/userItems/FolderTreeContainer";
import OperatorsListContainer from "sidebar/operators/OperatorsListContainer";
import Filters from "sidebar/filters/Filters";
import SideBarBody from "sidebar/SideBarBody";

type Props = ReturnType<typeof mapStateToProps>;

const SideBarBodyContainer: FC<Props> = ({ selectedTab, ...rest }) => {
  let component: JSX.Element;
  switch (selectedTab) {
    case 1:
      component = <Filters />;
      break;
    case 2:
      component = <OperatorsListContainer />;
      break;
    default:
      component = <FolderTreeContainer {...rest} />;
      break;
  }

  return <SideBarBody>{component}</SideBarBody>;
};

const mapStateToProps = ({ navigationTabs: { selectedTab } }: RootState) => ({
  selectedTab
});

export default connect(mapStateToProps)(SideBarBodyContainer);
