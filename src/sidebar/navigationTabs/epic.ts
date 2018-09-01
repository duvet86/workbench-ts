import { Action } from "redux";
import { ActionsObservable } from "redux-observable";
import { of, Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";

import { LOCATION_CHANGE, RouterState } from "connected-react-router";
import {
  showFilters,
  showMyItems,
  showTools,
  TabsAction
} from "sidebar/navigationTabs/actions";

interface ILocationChangeAction extends Action {
  type: typeof LOCATION_CHANGE;
  payload: RouterState;
}

export const navigationTabsEpic = (
  action$: ActionsObservable<ILocationChangeAction | TabsAction>
): Observable<TabsAction> =>
  action$.pipe(
    // ofType<ILocationChangeAction>(LOCATION_CHANGE),
    filter(
      (action): action is ILocationChangeAction =>
        action.type === LOCATION_CHANGE
    ),
    filter(
      ({
        payload: {
          location: { pathname }
        }
      }) =>
        pathname === "/" ||
        pathname === "/workbench/new" ||
        pathname === "/workbench/new" ||
        pathname === "/pagebuilder/new"
    ),
    switchMap<ILocationChangeAction, TabsAction>(
      ({
        payload: {
          location: { pathname }
        }
      }) => {
        switch (pathname) {
          case "/workbench/new":
            return of(showTools([false, false, false]));
          case "/pagebuilder/new":
            return of(showFilters([false, false, true]));
          default:
            return of(showMyItems([false, true, true]));
        }
      }
    )
  );
