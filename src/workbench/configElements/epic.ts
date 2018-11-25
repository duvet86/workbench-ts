import { Action } from "redux";
import { ActionsObservable, ofType } from "redux-observable";
import { map } from "rxjs/operators";

import {
  IGraphAddQuery,
  IGraphAddFilter,
  GraphActionTypes
} from "workbench/graphActions";
import { openConfig } from "workbench/configElements/actions";

export const openQueryConfigEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType<Action, IGraphAddQuery | IGraphAddFilter>(
      GraphActionTypes.GRAPH_QUERY_ADD,
      GraphActionTypes.GRAPH_FILTER_ADD
    ),
    map(({ operatorServiceId, elementId }) =>
      openConfig(operatorServiceId, elementId)
    )
  );
