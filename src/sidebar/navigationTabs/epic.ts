import { ActionsObservable, ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";

import { LOCATION_CHANGE, LocationChangeAction } from "react-router-redux";
import {
  showFilters,
  showMyItems,
  showTools,
  TabsAction
} from "sideBar/navigationTabs/actions";

export const navigationTabsEpic = (
  action$: ActionsObservable<LocationChangeAction | TabsAction>
): Observable<TabsAction> =>
  action$.pipe(
    ofType(LOCATION_CHANGE),
    filter(
      ({ payload: { pathname } }: LocationChangeAction) =>
        pathname === "/" ||
        pathname === "/workbench/new" ||
        pathname === "/pagebuilder/new"
    ),
    switchMap(({ payload: { pathname } }: LocationChangeAction) => {
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
