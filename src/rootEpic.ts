import { combineEpics } from "redux-observable";

import { qesEnabledEpic } from "app/epic";
import { fetchProfileEpic } from "profile/epic";
import { userItemsEpic } from "sidebar/userItems/epic";
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
  serviceDescriptionEpic,
  getDataTableEpic
} from "workbench/query/epic";

const epics = [
  qesEnabledEpic,
  fetchProfileEpic,
  userItemsEpic,
  operatorsEpic,
  sessionEpic,
  saveGraphEpic,
  pushGraphChangesEpic,
  addQueryEpic,
  dataServicesEpic,
  filterCapabilitiesEpic,
  updateQueryDataServiceEpic,
  serviceDescriptionEpic,
  getDataTableEpic
];

export default combineEpics(...epics);
