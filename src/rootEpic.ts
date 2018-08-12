import { combineEpics } from "redux-observable";

import { appEpic } from "app/epic";
import { intervalTypeEpic } from "common/intervalSelector/epic";
import { loadingEpic } from "common/loading";
import { loginEpic } from "login/epic";
import { fetchProfileEpic } from "profile/epic";
import { myItemsEpic } from "sideBar/myItems/epic";
import { navigationTabsEpic } from "sideBar/navigationTabs/epic";
import { operatorsEpic } from "sideBar/operators/epic";
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
  intervalTypeEpic
];

export default combineEpics(...epics);
