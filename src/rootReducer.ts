import { combineReducers } from "redux";

import app from "app/reducer";
import error from "common/errorBoundary/reducer";
import profile from "profile/reducer";
import userItems from "sidebar/userItems/reducer";
import navigationTabs from "sidebar/navigationTabs/reducer";
import operators from "sidebar/operators/reducer";
import configSwitch from "workbench/configOperators/reducer";
import queryConfig from "workbench/query/configReducer";
import sessionGraph from "workbench/sessionGraphReducer";

const rootReducer = combineReducers({
  error,
  app,
  profile,
  userItems,
  navigationTabs,
  operators,
  sessionGraph,
  configSwitch,
  queryConfig
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
