import { combineEpics } from "redux-observable";

import { appEpic } from "app/epic";
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

const epics = [
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
  serviceDescriptionEpic
];

export default combineEpics(...epics);
