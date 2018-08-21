import { ActionsObservable, ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";

import {
  LOCATION_CHANGE,
  RouterAction,
  RouterState
} from "connected-react-router";
import {
  showFilters,
  showMyItems,
  showTools,
  TabsAction
} from "sideBar/navigationTabs/actions";

interface IRouterAction {
  payload: RouterState;
}

export const navigationTabsEpic = (
  action$: ActionsObservable<RouterAction | TabsAction>
): Observable<TabsAction> =>
  action$.pipe(
    ofType(LOCATION_CHANGE),
    filter(
      ({
        payload: {
          location: { pathname }
        }
      }: IRouterAction) =>
        pathname === "/" ||
        pathname === "/workbench/new" ||
        pathname === "/workbench/new" ||
        pathname === "/pagebuilder/new"
    ),
    switchMap(({ payload: { location: { pathname } } }: IRouterAction) => {
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
