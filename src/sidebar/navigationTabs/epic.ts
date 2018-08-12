import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { filter, switchMap } from "rxjs/operators";

import { LOCATION_CHANGE, LocationChangeAction } from "react-router-redux";
import {
  showFilters,
  showMyItems,
  showTools
} from "sideBar/navigationTabs/actions";

export const navigationTabsEpic: Epic<LocationChangeAction, any> = action$ =>
  action$.pipe(
    ofType(LOCATION_CHANGE),
    filter(
      ({ payload: { pathname } }) =>
        pathname === "/" ||
        pathname === "/workbench/new" ||
        pathname === "/pagebuilder/new"
    ),
    switchMap(({ payload: { pathname } }) => {
      switch (pathname) {
        case "/workbench/new":
          return of(showTools([false, false, false]));
        case "/pagebuilder/new":
          return of(showFilters([false, false, true]));
        default:
          return of(showMyItems([false, true, true]));
      }
    })
  );
