import { combineReducers } from "redux";

import appReducer from "app/reducer";
import intervalReducer from "common/intervalSelector/reducer";
import { loadingReducer } from "common/loading";
import errorReducer from "errorPage/reducer";
import loginReducer from "login/reducer";
import profileReducer from "profile/reducer";
import myItemsReducer from "sideBar/myItems/reducer";
import navigationTabsReducer from "sideBar/navigationTabs/reducer";
import operatorsReducer from "sideBar/operators/reducer";
import configSwitchReducer from "workbench/configSwitch/reducer";
import queryConfigReducer from "workbench/query/reducer";
import sessionReducer from "workbench/reducer";

export default combineReducers({
  loadingReducer,
  errorReducer,
  loginReducer,
  appReducer,
  profileReducer,
  myItemsReducer,
  navigationTabsReducer,
  operatorsReducer,
  sessionReducer,
  configSwitchReducer,
  queryConfigReducer,
  intervalReducer
});
