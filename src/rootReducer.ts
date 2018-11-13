import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";

import app from "app/reducer";
import error from "common/errorBoundary/reducer";
import profile from "profile/reducer";
import myItems from "sidebar/userItems/reducer";
import navigationTabs from "sidebar/navigationTabs/reducer";
import operators from "sidebar/operators/reducer";
import configSwitch from "workbench/configSwitch/reducer";
import queryConfig from "workbench/query/reducer";
import session from "workbench/reducer";

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    error,
    app,
    profile,
    myItems,
    navigationTabs,
    operators,
    session,
    configSwitch,
    queryConfig
  });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
