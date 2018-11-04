import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";

import appReducer from "app/reducer";
import errorReducer from "errorPage/reducer";
import profileReducer from "profile/reducer";
import myItemsReducer from "sidebar/myItems/reducer";
import navigationTabsReducer from "sidebar/navigationTabs/reducer";
import operatorsReducer from "sidebar/operators/reducer"; // TODO: remove.
import configSwitchReducer from "workbench/configSwitch/reducer";
import queryConfigReducer from "workbench/query/reducer";
import sessionReducer from "workbench/reducer";

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    errorReducer,
    appReducer,
    profileReducer,
    myItemsReducer,
    navigationTabsReducer,
    operatorsReducer,
    sessionReducer,
    configSwitchReducer,
    queryConfigReducer
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
