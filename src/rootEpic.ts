import { combineEpics } from "redux-observable";

import { appEpic } from "app/epic";
import { loadingEpic } from "common/loading";
import { loginEpic } from "login/epic";
import { fetchProfileEpic } from "profile/epic";
import { myItemsEpic } from "sidebar/myItems/epic";
import { navigationTabsEpic } from "sidebar/navigationTabs/epic";
import { operatorsEpic } from "sidebar/operators/epic";
import {
  addQueryEpic,
  pushGraphChangesEpic,
  saveGraphEpic,
  sessionEpic,
  updateQueryDataServiceEpic
} from "workbench/epic";
import {
  dataServicesEpic,
  filterCapabilitiesEpic,
  serviceDescriptionEpic
} from "workbench/query/epic";
import {
  requestAllowedValuesEpic,
  getAllowedValuesEpic
} from "workbench/query/constraintSelector/epic";

const epics = [
  loadingEpic,
  loginEpic,
  appEpic,
  fetchProfileEpic,
  myItemsEpic,
  navigationTabsEpic,
  operatorsEpic,
  sessionEpic,
  saveGraphEpic,
  pushGraphChangesEpic,
  addQueryEpic,
  dataServicesEpic,
  filterCapabilitiesEpic,
  updateQueryDataServiceEpic,
  serviceDescriptionEpic,
  requestAllowedValuesEpic,
  getAllowedValuesEpic
];

export default combineEpics(...epics);
